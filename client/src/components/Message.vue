<template>
	<div class="flex flex-col justify-between min-w-[100px] max-w-[80%] my-2 relative text-white text-sm px-3 py-2" :class="[
		message.sender.id === user?.id
			? 'text-right self-end bg-blue-400 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
			: 'self-start bg-slate-400 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl',
	]">
		<div class="flex flex-col">
			<p class="leading-none text-xs mb-1 font-bold capitalize" v-text="message.sender.name"></p>
			<p class="leading-normal text-sm w-full text-left" v-html="message.content"></p>
		</div>
		<span class="text-[10px] align-bottom self-end" v-text="timestamp"></span>
	</div>
</template>

<script setup lang="ts">
import { StateInterface } from '@/store';
import { Message } from '@/types';
import { PropType, computed } from 'vue';
import { useStore } from 'vuex';
import { DateTime } from 'luxon';

const props = defineProps({
	message: {
		type: Object as PropType<Message>,
		required: true
	}
})

const store = useStore<StateInterface>();
const user = computed(() => store.state.user.user)

const timestamp = computed(() => DateTime.fromISO(props.message.createdAt).toFormat('HH:mm'))

</script>