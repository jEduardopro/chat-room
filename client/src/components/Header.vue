<template>
	<header class="flex w-full h-14 shadow-md py-2 px-5 items-center justify-between mb-3">
		<h2 class="text-blue-900 text-center">Welcome to Chat Room</h2>
		<div class="flex items-center gap-x-3">
			<p class="text-blue-900 font-bold leading-none capitalize text-2xl" v-text="user?.name"></p>
			<img class="w-8 h-8 rounded-full cursor-pointer" :src="user?.pic" alt="">
		</div>
	</header>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { StateInterface } from '@/store';
import { computed } from 'vue';

const store = useStore<StateInterface>()
const user = computed(() => store.state.user.user)
</script>