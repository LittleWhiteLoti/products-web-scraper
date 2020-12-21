import { createStore } from 'vuex'
import items from "./Items.js"

let Store = createStore({
    state() {

    },
    mutations: {

    },
    getters: {

    },
    modules: {
        items: items
    }    
});

export default Store