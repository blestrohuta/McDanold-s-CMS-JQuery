import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'
import VueAwesomePaginate from 'vue-awesome-paginate'

import 'vue-awesome-paginate/dist/style.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(VueAwesomePaginate)
app.use(vue3GoogleLogin, {
  clientId: '493808490959-0i2uscqafqntpsat5f8h70ribateth4a.apps.googleusercontent.com'
})
app.use(router)

app.mount('#app')
