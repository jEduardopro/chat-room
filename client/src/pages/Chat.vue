<template>
	<div class="w-full h-screen flex flex-col overflow-hidden">
		<header class="flex w-full h-14 shadow-md py-2 px-5 items-center justify-between mb-3">
			<h2 class="text-blue-900 text-center">Welcome to Chat Room</h2>
			<div class="flex items-start gap-x-3">
				<p class="text-blue-900 font-bold capitalize text-2xl" v-text="user?.name"></p>
				<img class="w-8 h-8 rounded-full" :src="user?.pic" alt="">
			</div>
		</header>
		<main class="flex h-full items-center gap-x-5 py-3 px-2">
			<div class="h-full rounded shadow py-5 px-2 w-1/3 box-border border border-blue-100">
				<div class="flex flex-col relative">
					<input
						class="h-10 rounded-tl rounded-tr outline-none w-full p-2 border border-slate-200 text-md"
						type="search"
						v-model="q"
						placeholder="Search User"
					/>
					<div
						v-if="q.trim().length"
						class="absolute top-full z-10 w-full h-36 bg-slate-100 rounded-bl rounded-br overflow-y-auto"
					>
						<div v-if="users.length" class="flex flex-col gap-y-2">
							<div
								v-for="user in users"
								class="flex items-center gap-x-3 p-2 hover:bg-slate-200 cursor-pointer"
								@click="openChat(user._id)"
							>
								<img class="w-8 h-8 rounded-full" :src="user.pic" alt="">
								<p class="text-blue-900 font-bold capitalize text-md" v-text="user.name"></p>
							</div>
						</div>
						<div v-else class="flex justify-center items-center h-full">
							<p class="text-blue-900 font-bold capitalize text-md">No users found</p>
						</div>
					</div>
				</div>
				<div class="flex flex-col mt-5 max-h-[660px] overflow-y-auto pb-10">
					<div 
						class="flex box-border p-2 border-b border-slate-200 cursor-pointer hover:bg-slate-100"
						v-for="chat in chats"
						:key="chat._id"
					>
						<div class="flex flex-col items-stretch mr-3">
							<img class="w-8 h-8 rounded-full" src="" alt="">
						</div>
						<div class="flex items-start flex-grow">
							<div class="flex flex-col w-full">
								<div class="flex justify-between items-center">
									<p class="text-slate-700 font-bold flex-grow capitalize" v-text="chat.chatName"></p>
									<span class="text-xs text-slate-400">10:24</span>
								</div>
								<small v-if="chat.latestMessage" class="text-slate-400 text-sm" v-html="chat.latestMessage.content"></small>
							</div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
			<div class="h-full rounded shadow p-5 w-2/3">
				chat
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { getChatsByUser, createChat } from '@/services/ChatService'
import { getUsers } from '@/services/UserService'
import {Chat, User} from '@/types'
import { useStore } from 'vuex';
import { StateInterface } from '@/store';
import {useDebounceFn} from '@vueuse/core'
import { useRouter } from 'vue-router';

onMounted(() => {
	shouldRedirectToLanding()
	getAllChats()
})

const store = useStore<StateInterface>();
const router = useRouter()
const q = ref('')
const loadingUsers = ref(false)
const chats = ref<Chat[]>([])
const users = ref<User[]>([])

const user = computed(() => store.state.user.user)

const shouldRedirectToLanding = () => {
	if (!user.value) {
		router.replace({name: 'Home'})
	}
}

const getAllChats = async () => {
	if (!user.value) {
		return
	}
	try {
		const { data } = await getChatsByUser(user.value!._id)
		console.log(data);
		chats.value = data
	} catch (error) {
		console.log(error);
		
	}
}

watch(q, () => {
	searchUsers()
})

const searchUsers = useDebounceFn(async () => {
	console.log(q.value);
	loadingUsers.value = true
	try {
		const { data } = await getUsers(q.value)
		console.log(data);
		users.value = data
	} catch (error) {
		console.log(error);
	}
	loadingUsers.value = false
}, 500)

const openChat = async (user_id: string) => {
	console.log(user_id);
	try {
		const payload = {
			user: user.value!._id,
			user_id
		}
		const { data } = await createChat(payload)
		console.log(data);
		
	} catch (error) {
		console.log(error);
	}
}

</script>