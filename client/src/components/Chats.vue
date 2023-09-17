<template>
	<div class="flex box-border px-2 py-3 border-b border-slate-200 cursor-pointer hover:bg-slate-100" v-for="chat in chats"
		:key="chat.id" @click="setChat(chat)">
		<ChatRow :chat="chat" />
	</div>
</template>

<script setup lang="ts">
import { StateInterface } from '@/store';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import ChatRow from '@/components/ChatRow.vue'
import { Chat } from '@/types';

onMounted(() => {
	getAllChats()
})

const store = useStore<StateInterface>()
const chats = computed(() => store.state.chat.chats.sort((a, b) => Number(b.pinned) - Number(a.pinned)) )
const user = computed(() => store.state.user.user)

const getAllChats = async () => {
	if (!user.value) {
		return
	}
	try {
		store.dispatch('chat/getAllChats', user.value!.id)
	} catch (error) {
		console.log(error);
	}
}

const setChat = (chat: Chat) => {
	store.commit('chat/setChatSelected', chat)
}
</script>
