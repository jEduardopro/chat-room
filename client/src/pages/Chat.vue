<template>
	<div class="w-full h-screen flex flex-col overflow-hidden">
		<Header/>
		<main class="flex flex-col md:flex-row h-[90%] items-center gap-x-5 py-3 px-2">
			<div class="h-full rounded shadow py-5 px-2 w-full md:w-1/3 box-border border border-blue-100">
				<SearchUsers/>
				<div class="flex flex-col mt-5 max-h-[660px] overflow-y-auto pb-10">
					<Chats/>
				</div>
			</div>
			<div class="h-full flex flex-col rounded shadow p-5 w-full mt-3 md:w-2/3 md:mt-0 box-border border border-blue-100 overflow-y-hidden">
				<div v-if="chatUser" class="flex flex-shrink min-h-[40px]">
					<div class="flex flex-col items-stretch mr-3">
						<img class="w-8 h-8 rounded-full" :src="chatUser.pic" :alt="chatUser.name">
					</div>
					<div class="flex items-start flex-grow">
						<div class="flex flex-col justify-start items-start w-full">
							<div class="flex justify-between items-start">
								<p class="text-slate-700 leading-none font-bold flex-grow capitalize" v-text="chatUser.name"></p>
							</div>
							<small v-show="isTyping" class="text-slate-400 text-xs">typing...</small>
						</div>
					</div>
				</div>
				<div class="flex flex-col flex-grow box-border gap-y-1 bg-blue-50 p-2 rounded overflow-hidden">
					<div ref="conversation" class="flex flex-col flex-grow overflow-y-auto">
						<div 
							v-for="message in messages" 
							:key="message._id"
							v-html="message.content"
							class="w-auto max-w-[80%] my-2 relative text-white text-sm rounded-md p-2"
							:class="[
								message.sender._id === user?._id
								? 'text-right self-end bg-blue-400' 
								: 'self-start bg-slate-400',
							]"
						>
						</div>
					</div>
					<div class="flex flex-col box-border flex-shrink">
						<input 
							type="text" 
							class="w-full border border-slate-200 rounded p-2 outline-none"
							v-model="content"
							placeholder="Type a message"							
							@keyup.enter="send"
						/>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { StateInterface } from '@/store';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue'
import SearchUsers from '@/components/SearchUsers.vue'
import Chats from '@/components/Chats.vue'
import {sendMessage} from '@/services/MessageService'
import { getMessagesByChat } from '../services/MessageService';
import { Message } from '@/types';

onMounted(() => {
	if (!user.value) {
		return router.replace({name: 'Home'})
	}
	joinToRoom()
	listenEvents()
})

const store = useStore<StateInterface>();
const router = useRouter()
const content = ref('')
const loading = ref(false)
const conversation = ref<HTMLElement|null>(null)
const messages = ref<Message[]>([])
const typingTimeout = ref<any|null>(null)
const isTyping = ref(false)

const user = computed(() => store.state.user.user)
const socket = computed(() => store.state.socket.socket!)
const chatSelected = computed(() => store.state.chat.chatSelected)
const chatUser = computed(() => {
	if (!chatSelected.value) {
		return null
	}
	const chat = chatSelected.value
	return chat.users[0]._id === user.value?._id ? chat.users[1] : chat.users[0]
})

watch(chatSelected, () => {
	fetchMessages()
})

watch(content, () => {
	typingHandler()
})

const joinToRoom = () => {
	socket.value.emit('join', user.value!._id)
	socket.value.on('connected', () => {
		console.log('connected');
	})
}

const listenEvents = () => {
	socket.value.on('messageReceived', (message: Message) => {
		console.log('messageReceived', message);
		
		if (!chatSelected.value || chatSelected.value?._id !== message.chat._id) {
			// give notification
			console.log('received notification');
			
			return
		}
		messages.value = [...messages.value, message]
		moveScrollToBottom()
	})
	socket.value.on('typing', () => isTyping.value = true)
	socket.value.on('stopTyping', () => isTyping.value = false)
}

const typingHandler = () => {
	socket.value.emit('typing', chatSelected.value?._id)

	if (typingTimeout.value) {
		clearTimeout(typingTimeout.value)
	}

	typingTimeout.value = setTimeout(() => {
		socket.value.emit('stopTyping', chatSelected.value?._id)
	}, 500);
}

const moveScrollToBottom = () => {
	if (!conversation.value) {
		return
	}
	setTimeout(() => {
		conversation.value!.scroll({top: conversation.value!.scrollHeight})
	}, 5);
}

const fetchMessages = async () => {
	if (!chatSelected.value) {
		return
	}
	loading.value = true
	try {
		const { data } = await getMessagesByChat(chatSelected.value._id)
		messages.value = data
		socket.value.emit('joinChat', chatSelected.value._id)
		moveScrollToBottom()
	} catch (error) {
		console.log(error);
	}
	loading.value = false
}

const send = async () => {
	if (!content.value || !chatSelected.value) {
		return
	}
	try {
		const payload = {
			user_id: user.value!._id,
			content: content.value,
			chat_id: chatSelected.value._id
		}
		content.value = ''
		const { data } = await sendMessage(payload)
		messages.value = [...messages.value, data]
		socket.value.emit('newMessage', data)
		moveScrollToBottom()		
	} catch (error) {
		console.log(error);
	}
}

</script>

<style>
.flex.flex-col.flex-grow.overflow-y-auto::-webkit-scrollbar {
	display: none;
}
</style>