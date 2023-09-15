import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../pages/Landing.vue')
	},
	{
		path: '/chat',
		name: 'Chat',
		component: () => import('../pages/Chat.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router