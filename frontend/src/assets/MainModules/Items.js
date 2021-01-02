//import { useStore } from 'vuex'
//import { v5 as uuid } from 'uuid'

//let store = 

//let namespace = `${ window.location.protocol }//${ window.location.hostname}`;

//let id = uuid(`${ namespace }?${ Date.now().toString()}`, uuid.URL );
/*
let createItem = () => {

}
*/

export default {
    namespaced: true,
    state() {

    },
    getters: {
        nestedGetter() {
            console.log("This is the item getter in the vuex store item module");
        }
    },
    mutations: {
    
    },
    actions: {

    }
}