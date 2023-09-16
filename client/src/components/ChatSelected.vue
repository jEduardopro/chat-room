<template>
	<div class="flex flex-col h-full">
		<div class="flex flex-shrink min-h-[40px]">
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
			<div ref="conversation" class="conversation flex flex-col flex-grow overflow-y-auto">
				<div
					v-for="group in groupedMessagesByDate" 
					:key="group.date"
					class="flex flex-col items-center"
				>
					<p class="text-slate-500 my-2 text-center py-1 px-5 rounded-md bg-blue-100" v-text="group.date"></p>
					<Message
						v-for="message in group.messages"
						:key="message._id"
						:message="message"
					/>
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
</template>

<script setup lang="ts">
import { StateInterface } from '@/store';
import { Chat, Message as MessageType } from '@/types';
import { PropType, computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { DateTime } from 'luxon';
import { getMessagesByChat, sendMessage } from '@/services/MessageService';
import Message from './Message.vue'

const props = defineProps({
	chat: {
		type: Object as PropType<Chat>,
		required: true
	}
})

onMounted(() => {
	fetchMessages()
	listenEvents()
})

const store = useStore<StateInterface>();
const content = ref('')
const loading = ref(false)
const conversation = ref<HTMLElement|null>(null)
const typingTimeout = ref<any|null>(null)
const isTyping = ref(false)

const socket = computed(() => store.state.socket.socket!)
const user = computed(() => store.state.user.user)
const chat = computed(() => props.chat)
const chatUser = computed(() => {
	return chat.value.users[0]._id === user.value?._id ? chat.value.users[1] : chat.value.users[0]
})
const messages = computed(() => store.state.chat.messages)

watch(chat, () => {
	fetchMessages()
})

watch(content, () => {
	typingHandler()
})

watch(messages, () => {
	moveScrollToBottom()
})

const groupedMessagesByDate = computed(() => {
	if (!messages.value.length) {
		return []
	}
	const groups = messages.value.reduce((groups, msg) => {
		const date = DateTime.fromISO(msg.createdAt).toFormat('dd/MM/yyyy')
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(msg)
		return groups
	}, {} as {[k: string]: MessageType[]})

	const groupedMessages = Object.keys(groups).map(date => {
		return {
			date,
			messages: groups[date]
		}
	})

	return groupedMessages
})

const listenEvents = () => {
	socket.value.on('messageReceived', (message: MessageType) => {
		console.log('messageReceived', message);
		store.commit('chat/setMessages', [...messages.value, message])
	})
	socket.value.on('typing', () => isTyping.value = true)
	socket.value.on('stopTyping', () => isTyping.value = false)
}

const typingHandler = () => {
	socket.value.emit('typing', chat.value?._id)

	if (typingTimeout.value) {
		clearTimeout(typingTimeout.value)
	}

	typingTimeout.value = setTimeout(() => {
		socket.value.emit('stopTyping', chat.value?._id)
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
	loading.value = true
	try {
		const { data } = await getMessagesByChat(chat.value._id)
		store.commit('chat/setMessages', data)
		socket.value.emit('joinChat', chat.value._id)
	} catch (error) {
		console.log(error);
	}
	loading.value = false
}

const send = async () => {
	if (!content.value) return
	
	try {
		const payload = {
			user_id: user.value!._id,
			content: content.value,
			chat_id: chat.value._id
		}
		content.value = ''
		const { data } = await sendMessage(payload)
		store.commit('chat/setMessages', [...messages.value, data])
		socket.value.emit('newMessage', data)
	} catch (error) {
		console.log(error);
	}
}
</script>

<style>
.conversation::-webkit-scrollbar {
	display: none;
}
</style>