<template>
	<div
		class="flex box-border px-2 py-3 border-b border-slate-200 cursor-pointer hover:bg-slate-100"
		v-for="chat in chats"
		:key="chat._id"
	>
		<ChatRow :chat="chat" />
	</div>
</template>

<script setup lang="ts">
import { getChatsByUser } from '@/services/ChatService';
import { StateInterface } from '@/store';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import ChatRow from '@/components/ChatRow.vue'

onMounted(() => {
	getAllChats()
})

const store = useStore<StateInterface>()
const chats = computed(() => store.state.chat.chats)
const user = computed(() => store.state.user.user)

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
