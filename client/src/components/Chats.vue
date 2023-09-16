<template>
	<div
		class="flex box-border px-2 py-3 border-b border-slate-200 cursor-pointer hover:bg-slate-100"
		v-for="chat in chats"
		:key="chat._id"
	>
		<div class="flex flex-col items-stretch mr-3">
			<img class="w-8 h-8 rounded-full" :src="getPicOfChat(chat.users)" alt="">
		</div>
		<div class="flex items-start flex-grow">
			<div class="flex flex-col w-full">
				<div class="flex justify-between items-start">
					<p class="text-slate-700 font-bold flex-grow capitalize" v-text="chat.chatName"></p>
					<span class="text-xs text-slate-400">10:24</span>
				</div>
				<small v-if="chat.latestMessage" class="text-slate-400 text-xs" v-html="chat.latestMessage.content"></small>
			</div>
			<div></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getChatsByUser } from '@/services/ChatService';
import { StateInterface } from '@/store';
import { User } from '@/types';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

onMounted(() => {
	getAllChats()
})

const store = useStore<StateInterface>()
const chats = computed(() => store.state.chat.chats)
const user = computed(() => store.state.user.user)

const getPicOfChat = (users: User[]) => {
	const user = users.find(user => user._id !== store.state.user.user?._id)
	return user?.pic
}

const getAllChats = async () => {
	if (!user.value) {
		return
	}
	try {
		const { data } = await getChatsByUser(user.value!._id)
		store.commit('chat/setChats', data)
	} catch (error) {
		console.log(error);
		
	}
}
</script>
