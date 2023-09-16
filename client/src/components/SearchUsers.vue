<template>
	<div class="flex flex-col relative">
		<input
			class="h-10 rounded-tl rounded-tr placeholder:text-slate-400 outline-none w-full p-2 border border-slate-200 text-md"
			type="search"
			v-model="q"
			placeholder="Search User"
		/>
		<div
			v-if="q.trim().length"
			class="absolute top-full box-border border-l border-r border-b z-10 w-full h-44 bg-slate-50 shadow-md rounded-bl rounded-br overflow-y-auto"
		>
			<div v-if="users.length" class="flex flex-col">
				<div
					v-for="user in users"
					class="flex items-center gap-x-3 p-2 hover:bg-slate-100 cursor-pointer box-border border-b border-slate-200"
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
</template>

<script setup lang="ts">
import { getUsers } from '@/services/UserService';
import { User } from '@/types';
import { computed, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useStore } from 'vuex';
import { StateInterface } from '../store/index';
import { createChat } from '@/services/ChatService'

const store = useStore<StateInterface>()
const q = ref('')
const loadingUsers = ref(false)
const users = ref<User[]>([])

watch(q, () => {
	searchUsers()
})

const user = computed(() => store.state.user.user)
const chats = computed(() => store.state.chat.chats)

const searchUsers = useDebounceFn(async () => {
	loadingUsers.value = true
	try {
		const { data } = await getUsers(q.value)
		users.value = data.filter((u) => u._id !== user.value?._id)
	} catch (error) {
		console.log(error);
	}
	loadingUsers.value = false
}, 500)

const clearSearchInput = () => {
	q.value = ''
}

const openChat = async (user_id: string) => {
	clearSearchInput()

	store.commit('chat/setLoadingChat', true)
	try {
		const payload = {
			user: user.value!._id,
			user_id
		}
		const { data } = await createChat(payload)

		const chatExists = chats.value.find(chat => chat._id === data._id)
		
		if (!chatExists) {
			store.commit('chat/addChat', data)
		}

		store.commit('chat/setChatSelected', data)
	} catch (error) {
		console.log(error);
	}
	store.commit('chat/setLoadingChat', false)
}
</script>