import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'

//  设置默认请求url
axios.defaults.baseURL = '/api/'



const app = createApp(App) 

app.use(router)
app.use(store)
app.mount('#app')  
