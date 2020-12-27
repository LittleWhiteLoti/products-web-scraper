import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Store from './assets/MainModules/AppStore.js'
import GlobalConfigurations from './components/configurations/GlobalConfigurations.vue'
import ListItems from './components/list/ListItems.vue'
import Item from './components/item/Item.vue'
import CreateItemSearch from './components/searches/CreateItemSearch.vue'
import ActiveSearches from './components/searches/ActiveSearches.vue'
import PausedSearches from './components/searches/PausedSearches.vue'
import RemovedSearches from './components/searches/RemovedSearches.vue'

const app = createApp(App);

app.use(Store);

// Register as global components
app.component('global-configurations', GlobalConfigurations);
app.component('list-items', ListItems);
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
        { path: '/removed-searches', component: RemovedSearches, name: 'removed-searches' },
        { path: '/global-configurations', component: GlobalConfigurations, name: 'global-configurations' }
    ],
    history: createWebHistory()
});

app.use(Router);

app.mount('#app');
