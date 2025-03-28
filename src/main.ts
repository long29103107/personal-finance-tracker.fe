import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/main.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
// import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App)

app.use(createPinia())
// app.use(vue3GoogleLogin, {
//     clientId: "181961000571-a9s0t4fv8qmajklmvo8qo0u49rv03on4.apps.googleusercontent.com"
// });

app.use(Antd)
app.use(router)

app.mount('#app')
