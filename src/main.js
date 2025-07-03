import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/routes.js'
import './index.css'
import Tooltip from 'primevue/tooltip';
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import CountryFlag from 'vue-country-flag-next';

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

createApp(App).use(router).use(pinia).directive('tooltip', Tooltip).component('CountryFlag', CountryFlag).mount('#app')