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
				<div v-if="!chatSelected" class="w-full h-full flex flex-col justify-center items-center">
					<h2 class="text-2xl text-blue-500 font-bold text-center">Select a user to start a conversation</h2>
				</div>
				<ChatSelected v-else :chat="chatSelected"/>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { StateInterface } from '@/store';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue'
import SearchUsers from '@/components/SearchUsers.vue'
import Chats from '@/components/Chats.vue'
import ChatSelected from '@/components/ChatSelected.vue'

onMounted(() => {
	if (!user.value) {
		return router.replace({name: 'Home'})
	}
	joinToRoom()
})

const store = useStore<StateInterface>();
const router = useRouter()

const user = computed(() => store.state.user.user)
const socket = computed(() => store.state.socket.socket!)
const chatSelected = computed(() => store.state.chat.chatSelected)

const joinToRoom = () => {
	socket.value.emit('join', user.value!._id)
	socket.value.on('connected', () => {
		console.log('connected');
	})
}
</script>