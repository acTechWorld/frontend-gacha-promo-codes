import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/base.css'
import App from './App.vue'
import router from './router'

// Import FontAwesome icon configuration
import { FontAwesomeIcon } from '@/icon'

import { createI18n } from 'vue-i18n'

// Import translations
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
import es from '@/locales/es.json'
import cn from '@/locales/cn.json'
import ja from '@/locales/ja.json'

// Set up the i18n instance with global scope

const i18n = createI18n({
  legacy: false, // Disable legacy mode to use Composition API
  locale: 'en', // Set default locale
  fallbackLocale: 'en', // Set fallback locale
  messages: {
    en,
    fr,
    es,
    cn,
    ja
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)

// Register the FontAwesomeIcon component globally
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
