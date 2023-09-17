<template>
	<div class="flex flex-grow">
		<div class="flex flex-col items-stretch mr-3 min-w-[35px]">
			<img class="w-8 h-8 rounded-full" :src="pic" :alt="chat.chatName">
		</div>
		<div class="flex items-start flex-grow">
			<div class="flex flex-col w-full">
				<div class="flex justify-between items-start">
					<p class="text-slate-700 leading-none font-bold flex-grow capitalize" v-text="chatName"></p>
					<div class="flex gap-x-2 text-right">
						<span v-if="updatedAt" class="text-xs text-slate-400">
							<timeago :datetime="updatedAt" :converter-options="{
								includeSeconds: true,
								addSuffix: false,
								useStrict: false,
							}" :auto-update="30" />
						</span>
						<i v-show="chat.pinned" class="fa-solid fa-thumbtack text-xs text-slate-400"></i>
					</div>
				</div>
				<small v-if="chat.latestMessage" class="text-slate-400 text-xs mt-1" v-html="lastMessage"></small>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { StateInterface } from '@/store';
import { Chat } from '@/types';
import { PropType, computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
	chat: {
		type: Object as PropType<Chat>,
		required: true
	}
})

const store = useStore<StateInterface>()

const user = computed(() => store.state.user.user)

const pic = computed(() => {
	return props.chat.users.find(u => u.id !== user.value?.id)?.pic
})

const updatedAt = computed(() => {
	if (!props.chat.latestMessage) {
		return null
	}
	return new Date(props.chat.latestMessage.updatedAt)
})

const chatName = computed(() => {
	return props.chat.users[0].id === user.value?.id ? props.chat.users[1].name : props.chat.users[0].name
})

const lastMessage = computed(() => {
	if (!props.chat.latestMessage) {
		return ''
	}
	const content = props.chat.latestMessage.content.split(' ')
	if (content.length > 15) {
		return content.slice(0, 15).join(' ') + '...'
	}
	return props.chat.latestMessage.content
})

</script>
