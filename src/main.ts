import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueLanding from '@oncekiller/vue-landing'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueLanding)

app.mount('#app')
