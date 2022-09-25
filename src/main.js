import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/index.css'
import store from './store'
import '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.use(store)

app.use(router)

app.mount('#app')
