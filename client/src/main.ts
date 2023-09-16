import { createApp } from 'vue'
import './assets/app.css'
import App from './App.vue'
import store from './store'
import router from './router'
import timeago from 'vue-timeago3'

const app = createApp(App)

app.use(store)
	.use(router)
	.use(timeago)
.mount('#app')
