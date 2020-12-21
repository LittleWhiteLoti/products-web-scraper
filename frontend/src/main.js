import { createApp } from 'vue'
import App from './App.vue'
//import { createRouter, createWebHistory } from 'vue-router'
import Store from './assets/MainModules/AppStore.js'

const app = createApp(App);
app.use(Store);

app.mount('#app');
