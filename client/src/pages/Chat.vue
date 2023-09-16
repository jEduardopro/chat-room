<template>
	<div class="w-full h-screen flex flex-col overflow-hidden">
		<Header/>
		<main class="flex h-[90%] items-center gap-x-5 py-3 px-2">
			<div class="h-full rounded shadow py-5 px-2 w-1/3 box-border border border-blue-100">
				<SearchUsers/>
				<div class="flex flex-col mt-5 max-h-[660px] overflow-y-auto pb-10">
					<Chats/>
				</div>
			</div>
			<div class="h-full rounded shadow p-5 w-2/3 box-border border border-blue-100 overflow-y-hidden">
				<div class="flex flex-col h-full box-border gap-y-1 bg-blue-50 p-2 rounded overflow-hidden">
					<div class="flex flex-col flex-grow overflow-y-auto">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente accusantium obcaecati sint exercitationem repellendus, amet dolore vero, debitis quaerat ipsam magnam. Nulla quod officiis consectetur alias numquam eaque veniam beatae aliquid voluptatum quos quibusdam vel veritatis, fugit laborum nobis maxime, provident corrupti! Ea aliquid voluptatem quaerat distinctio, provident ipsam veniam eveniet aliquam voluptatum fugiat incidunt, doloremque inventore culpa ab nostrum vel a libero? Aperiam, quidem iusto? Illo autem nemo nobis quasi voluptatibus magni architecto voluptatum praesentium ex adipisci voluptatem deleniti doloribus quae numquam nesciunt, eos quis explicabo illum doloremque aperiam cumque! Deleniti voluptatum debitis amet vitae adipisci explicabo ex dignissimos magnam soluta rerum mollitia beatae dolores alias, quisquam unde eius tempora similique neque? Id maiores perferendis repudiandae ratione excepturi libero nihil eius quae omnis veritatis labore nemo laborum rerum porro iste, tenetur, inventore veniam sit at doloremque soluta totam, sapiente officiis et! Veritatis maiores quam in vitae dolorem itaque qui eligendi asperiores quae consequatur dolorum, sapiente, quo nisi, praesentium culpa laboriosam ab nam recusandae vel accusantium distinctio deleniti. Illum odit nihil, veniam itaque dicta molestiae corporis ut quod atque, sunt nam? Possimus, atque nihil? Quae perferendis accusamus quod asperiores. Dicta consequuntur totam voluptatum tenetur hic? Reiciendis labore architecto assumenda voluptate? 
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente accusantium obcaecati sint exercitationem repellendus, amet dolore vero, debitis quaerat ipsam magnam. Nulla quod officiis consectetur alias numquam eaque veniam beatae aliquid voluptatum quos quibusdam vel veritatis, fugit laborum nobis maxime, provident corrupti! Ea aliquid voluptatem quaerat distinctio, provident ipsam veniam eveniet aliquam voluptatum fugiat incidunt, doloremque inventore culpa ab nostrum vel a libero? Aperiam, quidem iusto? Illo autem nemo nobis quasi voluptatibus magni architecto voluptatum praesentium ex adipisci voluptatem deleniti doloribus quae numquam nesciunt, eos quis explicabo illum doloremque aperiam cumque! Deleniti voluptatum debitis amet vitae adipisci explicabo ex dignissimos magnam soluta rerum mollitia beatae dolores alias, quisquam unde eius tempora similique neque? Id maiores perferendis repudiandae ratione excepturi libero nihil eius quae omnis veritatis labore nemo laborum rerum porro iste, tenetur, inventore veniam sit at doloremque soluta totam, sapiente officiis et! Veritatis maiores quam in vitae dolorem itaque qui eligendi asperiores quae consequatur dolorum, sapiente, quo nisi, praesentium culpa laboriosam ab nam recusandae vel accusantium distinctio deleniti. Illum odit nihil, veniam itaque dicta molestiae corporis ut quod atque, sunt nam? Possimus, atque nihil? Quae perferendis accusamus quod asperiores. Dicta consequuntur totam voluptatum tenetur hic? Reiciendis labore architecto assumenda voluptate? 
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente accusantium obcaecati sint exercitationem repellendus, amet dolore vero, debitis quaerat ipsam magnam. Nulla quod officiis consectetur alias numquam eaque veniam beatae aliquid voluptatum quos quibusdam vel veritatis, fugit laborum nobis maxime, provident corrupti! Ea aliquid voluptatem quaerat distinctio, provident ipsam veniam eveniet aliquam voluptatum fugiat incidunt, doloremque inventore culpa ab nostrum vel a libero? Aperiam, quidem iusto? Illo autem nemo nobis quasi voluptatibus magni architecto voluptatum praesentium ex adipisci voluptatem deleniti doloribus quae numquam nesciunt, eos quis explicabo illum doloremque aperiam cumque! Deleniti voluptatum debitis amet vitae adipisci explicabo ex dignissimos magnam soluta rerum mollitia beatae dolores alias, quisquam unde eius tempora similique neque? Id maiores perferendis repudiandae ratione excepturi libero nihil eius quae omnis veritatis labore nemo laborum rerum porro iste, tenetur, inventore veniam sit at doloremque soluta totam, sapiente officiis et! Veritatis maiores quam in vitae dolorem itaque qui eligendi asperiores quae consequatur dolorum, sapiente, quo nisi, praesentium culpa laboriosam ab nam recusandae vel accusantium distinctio deleniti. Illum odit nihil, veniam itaque dicta molestiae corporis ut quod atque, sunt nam? Possimus, atque nihil? Quae perferendis accusamus quod asperiores. Dicta consequuntur totam voluptatum tenetur hic? Reiciendis labore architecto assumenda voluptate? 
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente accusantium obcaecati sint exercitationem repellendus, amet dolore vero, debitis quaerat ipsam magnam. Nulla quod officiis consectetur alias numquam eaque veniam beatae aliquid voluptatum quos quibusdam vel veritatis, fugit laborum nobis maxime, provident corrupti! Ea aliquid voluptatem quaerat distinctio, provident ipsam veniam eveniet aliquam voluptatum fugiat incidunt, doloremque inventore culpa ab nostrum vel a libero? Aperiam, quidem iusto? Illo autem nemo nobis quasi voluptatibus magni architecto voluptatum praesentium ex adipisci voluptatem deleniti doloribus quae numquam nesciunt, eos quis explicabo illum doloremque aperiam cumque! Deleniti voluptatum debitis amet vitae adipisci explicabo ex dignissimos magnam soluta rerum mollitia beatae dolores alias, quisquam unde eius tempora similique neque? Id maiores perferendis repudiandae ratione excepturi libero nihil eius quae omnis veritatis labore nemo laborum rerum porro iste, tenetur, inventore veniam sit at doloremque soluta totam, sapiente officiis et! Veritatis maiores quam in vitae dolorem itaque qui eligendi asperiores quae consequatur dolorum, sapiente, quo nisi, praesentium culpa laboriosam ab nam recusandae vel accusantium distinctio deleniti. Illum odit nihil, veniam itaque dicta molestiae corporis ut quod atque, sunt nam? Possimus, atque nihil? Quae perferendis accusamus quod asperiores. Dicta consequuntur totam voluptatum tenetur hic? Reiciendis labore architecto assumenda voluptate? 
						</p>
						<div 
							v-for="message in messages" 
							:key="message._id"
							v-html="message.content"
							class="w-auto max-w-[80%] my-2 relative text-white text-sm rounded-md p-2"
							:class="[
								message.sender._id === user?._id
								? 'text-right self-end bg-blue-400' 
								: 'self-start bg-slate-400',
							]"
						>
						</div>
					</div>
					<div class="flex box-border flex-shrink">
						<input 
							type="text" 
							class="w-full border border-slate-200 rounded p-2 outline-none"
							v-model="content"
							placeholder="Type a message"
							@keyup.enter="send"
						/>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { StateInterface } from '@/store';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue'
import SearchUsers from '@/components/SearchUsers.vue'
import Chats from '@/components/Chats.vue'
import {sendMessage} from '@/services/MessageService'
import { getMessagesByChat } from '../services/MessageService';
import { Message } from '@/types';

onMounted(() => {
	shouldRedirectToLanding()
})

const store = useStore<StateInterface>();
const router = useRouter()
const content = ref('')
const loading = ref(false)
const messages = ref<Message[]>([])

const user = computed(() => store.state.user.user)
const chatSelected = computed(() => store.state.chat.chatSelected)

watch(chatSelected, () => {
	fetchMessages()
})

const shouldRedirectToLanding = () => {
	if (!user.value) {
		router.replace({name: 'Home'})
	}
}

const fetchMessages = async () => {
	if (!chatSelected.value) {
		return
	}
	loading.value = true
	try {
		const { data } = await getMessagesByChat(chatSelected.value._id)
		messages.value = data
	} catch (error) {
		console.log(error);
	}
	loading.value = false
}

const send = async () => {
	if (!content.value || !chatSelected.value) {
		return
	}
	try {
		const payload = {
			user_id: user.value!._id,
			content: content.value,
			chat_id: chatSelected.value._id
		}
		content.value = ''
		const { data } = await sendMessage(payload)
		console.log('message response: ', data);
		
	} catch (error) {
		console.log(error);
	}
}

</script>