import { createApp } from 'vue'
import BootstrapVueNext from 'bootstrap-vue-next'
import router from './_routes'
//store pinia
import './_store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './scss/style.scss'
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import Swal from 'sweetalert2'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
    .use(pinia)
    .use(router)
    .use(BootstrapVueNext)
    .use('Swal', Swal)
    .mount('#app')
