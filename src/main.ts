import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initVueLibrary } from '@vue-landing/vue-landing'

const app = createApp(App)
await initVueLibrary(app, import.meta.env.VITE_VUE_LANDING_LICENSE_KEY)
app.use(createPinia())
app.use(router)

app.mount('#app')
