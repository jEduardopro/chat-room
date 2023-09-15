<template>
	<div class="flex h-screen justify-center items-center">
		<div class="flex flex-col">
			<h1 class="text-blue-900 text-4xl font-bold text-center mb-5">Chat Room</h1>
			<div class="flex flex-col items-start">
				<div class="flex items-start gap-x-3">
					<div>
						<input 
							class="h-10 rounded outline-none w-full p-2 border border-slate-200 text-md disabled:opacity-50" 
							type="text" 
							v-model="username"
							autofocus 
							:disabled="loading"
						/>
						<small v-if="errorMessage" class="text-red-500 text-xs" v-text="errorMessage"></small>
					</div>
					<button 
						class="p-2 w-32 text-md bg-blue-800 hover:bg-blue-700 outline-none text-white rounded disabled:opacity-50" 
						:disabled="!username.trim().length || loading"
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
import {register} from '@/services/UserService'

onMounted(() => {
	setSocket();

	socket.on('message-from-server', (data) => {
		console.log('message received from server: ', data);
	})
})

const router = useRouter()
const store = useStore();
const username = ref('')
const loading = ref(false)
const errorMessage = ref<string|null>(null)

const setSocket = () => {
	store.commit('socket/setSocket', socket)
}

const join = async () => {
	if (!username.value.trim().length || loading.value) {
		return
	}

	loading.value = true

	try {
		const {data} = await register(username.value)		
		store.commit('user/setUser', data)
		// localStorage.setItem('auth-user', JSON.stringify(data))
		router.push('/chat')
	} catch (error: any) {
		console.log(error);
		if (error.response) {
			errorMessage.value = error.response.data.message
		} else {
			errorMessage.value = error.message
		}
	}
	loading.value = false
}
</script>