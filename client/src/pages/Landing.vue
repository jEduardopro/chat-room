<template>
	<div class="flex h-screen justify-center items-center">
		<div class="flex flex-col">
			<h1 class="text-blue-900 text-4xl font-bold text-center mb-5">Chat Room</h1>
			<div class="flex flex-col items-start">
				<div class="flex items-center gap-x-3">
					<input 
						class="h-10 rounded outline-none w-full p-2 border border-slate-200 text-md" 
						type="text" 
						v-model="username" 
						autofocus 
					/>
					<button 
						class="p-2 w-32 text-md bg-blue-800 hover:bg-blue-700 outline-none text-white rounded disabled:opacity-50" 
						:disabled="!username.trim().length"
						@click="join"						
					>
						Join
					</button>
				</div>
				<small class="text-slate-400 text-xs text-center">Enter your name to start chatting</small>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { socket } from '../socket'
import { useRouter } from 'vue-router';

onMounted(() => {
	setSocket();

	socket.on('message-from-server', (data) => {
		console.log('message received from server: ', data);
	})
})

const router = useRouter()
const store = useStore();
const username = ref('')

const setSocket = () => {
	store.commit('socket/setSocket', socket)
}

const join = () => {
	if (!username.value.trim().length) {
		return
	}
	router.push('/chat')
	// console.log('send', message.value);
	// socket.emit('send-message', message.value)

}
</script>