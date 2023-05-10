import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes'
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
window.addEventListener('DOMContentLoaded', () => {
  console.log('我是关闭的页')
})


