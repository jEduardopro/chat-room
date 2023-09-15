<template>
	<div class="w-full h-screen flex flex-col overflow-hidden">
		<Header/>
		<main class="flex h-full items-center gap-x-5 py-3 px-2">
			<div class="h-full rounded shadow py-5 px-2 w-1/3 box-border border border-blue-100">
				<SearchUsers/>
				<div class="flex flex-col mt-5 max-h-[660px] overflow-y-auto pb-10">
					<Chats/>
				</div>
			</div>
			<div class="h-full rounded shadow p-5 w-2/3 box-border border border-blue-100">
				chat
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

onMounted(() => {
	shouldRedirectToLanding()
})

const store = useStore<StateInterface>();
const router = useRouter()

const user = computed(() => store.state.user.user)

const shouldRedirectToLanding = () => {
	if (!user.value) {
		router.replace({name: 'Home'})
	}
}

</script>