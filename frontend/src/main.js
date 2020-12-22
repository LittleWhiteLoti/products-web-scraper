import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Store from './assets/MainModules/AppStore.js'
import Configurations from './components/configurations/Configurations.vue'
import List from './components/list/List.vue'
import Item from './components/item/Item.vue'
import CreateItemSearch from './components/searches/CreateItemSearch.vue'
import ActiveSearches from './components/searches/ActiveSearches.vue'
import PausedSearches from './components/searches/PausedSearches.vue'
import RemovedSearches from './components/searches/RemovedSearches.vue'

const app = createApp(App);

app.use(Store);

// Register as global components
app.component('configurations', Configurations);
app.component('list', List);
app.component('item', Item);
app.component('create-item-search', CreateItemSearch);
app.component('active-searches', ActiveSearches);
app.component('paused-searches', PausedSearches);
app.component('removed-searches', RemovedSearches);

const Router = createRouter({
    routes: [
        { path: '/create-item-search', component: CreateItemSearch, name: 'create-item-search', alias: '/'},
        { path: '/active-searches', component: ActiveSearches, name: 'active-searches' },
        { path: '/paused-searches', component: PausedSearches, name: 'paused-searches' },
        { path: '/removed-searches', component: RemovedSearches, name: 'removed-searches' }
    ],
    history: createWebHistory()
});

app.use(Router);

app.mount('#app');