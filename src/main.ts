import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// dark mode always on
import { useDark, useToggle } from '@vueuse/core'
useDark()

const app = createApp(App)

app.use(router)

app.mount('#app')
