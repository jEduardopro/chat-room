<template>
  <div>
		<h1 class="text-blue-900 text-2xl font-bold">Hello Socket</h1>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import {socket} from './socket'

onMounted(() => {
	setSocket();
})

const store = useStore();

const setSocket = () => {
	store.commit('socket/setSocket', socket)
}

</script>
