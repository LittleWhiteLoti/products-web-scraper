//import { useStore } from 'vuex'
//import { v5 as uuid } from 'uuid'

//let store = 

//let namespace = `${ window.location.protocol }//${ window.location.hostname}`;

//let id = uuid(`${ namespace }?${ Date.now().toString()}`, uuid.URL );
/*
let createItem = () => {

}
*/

// items is an object with nested properties
// name
// search interval
// lowest buy price
// highest buy price
// retrailers
// email
// phonenumber 

export default {
    namespaced: true,
    state() {
        return {

        }
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