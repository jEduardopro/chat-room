<template>
	<div
		class="w-auto max-w-[80%] my-2 relative text-white text-sm px-3 py-2"
		:class="[
			message.sender._id === user?._id
			? 'text-right self-end bg-blue-400 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' 
			: 'self-start bg-slate-400 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl',
		]"
	>
		<p class="leading-none text-xs mb-1 font-bold capitalize" v-text="message.sender.name"></p>
		<p
			class="leading-snug text-sm"
			v-html="message.content"
		></p>
		<span class="text-[10px]" v-text="timestamp"></span>
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