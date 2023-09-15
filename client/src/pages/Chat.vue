<template>
	<div>
		chat
		<p v-for="chat in chats" :key="chat._id" v-text="chat.chatName"></p>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getChats } from '@/services/ChatService'
import {Chat} from '@/types'

onMounted(() => {
	console.log('chat mounted');
	getAllChats()
})

const chats = ref<Chat[]>([])

const getAllChats = async () => {
	const {data} = await getChats()
	console.log(data);
	chats.value = data
}

</script>