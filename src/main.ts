import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/base.css'
import App from './App.vue'
import router from './router'

// Import FontAwesome icon configuration
import { FontAwesomeIcon } from '@/icon'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// Register the FontAwesomeIcon component globally
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
