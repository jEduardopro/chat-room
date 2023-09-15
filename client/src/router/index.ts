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


// router.beforeEach((to, from, next) => {

// 	const userAuthLS = localStorage.getItem('auth-user')
// 	if (!userAuthLS && to.name !== 'Home') {
// 		return router.replace({ name: 'Home' })
// 	}

// 	if (userAuthLS && to.name === 'Home') {
// 		return router.replace({ name: 'Chat' })
// 	}

// 	next()
// })

export default router