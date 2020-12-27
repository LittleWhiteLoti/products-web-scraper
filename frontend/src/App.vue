<template>
  <div>
    <header>
    </header>
    <div id="main-nav">
      <input id="dropdown-drawer" type="checkbox" >
      <label id="open-drawer" for="dropdown-drawer">
        ...
      </label>
      <label id="close-drawer" for="dropdown-drawer">
        Close drawer
      </label>
      <nav id="drawer">
        <router-link to="/create-item-search">Create Item Search</router-link>
        <router-link to="/active-searches">Active Searches</router-link>
        <router-link to="/paused-searches">Paused Searches</router-link>
        <span class="flex-break"></span>
        <router-link to="/removed-searches">Removed Searches</router-link>
        <router-link to="/global-configurations">Global Configurations</router-link>
      </nav>
    </div>
    <main>
      <component :is="ActiveComponent"></component>
    </main>
  </div>
</template>

<script>

/* eslint no-unused-vars:0 */

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {

    let router = useRouter();

    let ActiveComponent = ref("active-searches");

    watch(router.currentRoute, (to, from) => {
      ActiveComponent.value = to.name;
    });

    return {
      ActiveComponent,
    }
  },
  data() {

    return {
    }
  },
  methods: {
  }
}
</script>

<style>

  html, body {
    margin: 0;
  }

  body {
    background-color: #d1fce0;
    font-family: Arial, Helvetica, sans-serif;
  }

</style>

<style scoped>

  header {
    background-color: #007700;
    border-bottom: 3px solid #004400; 
    height: 38px;
  }

  label[for="dropdown-drawer"] {
    display: none;
  }

  #dropdown-drawer {
    display: none;
  }

  nav {
    width: 950px;
    margin: 4px auto 0 auto;
    display: flex;
    flex-wrap: wrap;
  }

  nav a {
    flex-grow: 1;
    font-weight: bold;
    background-color: #007700;
    border-top: 1px solid #004400;
    border-right: 1px solid #004400;
    border-bottom: 1px solid #004400;
    color: #FFFFFF;
    text-align: center;
    padding: 6px 0;
    display: block;
  }
  
  nav a:first-child {
    border-left: 1px solid #004400;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;   
  }

  nav a:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  nav a {
    text-decoration: none;
  }

  .flex-break {
    display: none;
  }

  .router-link-active {
    background-color: #005500;
    color: #BBBBBB;
  }

  main {
    width: 950px;
    margin: auto auto;
  }

  @media screen and (max-width: 1024px) {

    nav {
      width: 100%;
    }

    nav a, nav a:first-child, nav a:last-child {
      border-radius: 0;
    }
    
    main {
      width: 100%;
    }

    .flex-break {
      flex-basis: 100%;
      height: 0;
      display: initial;
    }
  }

  @media screen and (max-width: 550px) {

    .flex-break {
      display: none;
    }

    #main-nav {
      display: flex;
      flex-direction: column;
      z-index: 2;
      position: absolute;
      width: 100%;
      background-color: #FFFFFF;
    }

    nav {
      margin: 0;
    }

    nav a {
      flex-basis: 100%;     
    }

    nav a:first-child {
      border-top: 0;
    }

    #dropdown-drawer ~ #open-drawer {
      display: block;
    }

    #dropdown-drawer:checked ~ #open-drawer {
      display: none;
    }

    #open-drawer {
      order: 1;
      padding: 0 0 16px 0;
      font-weight: bold;
      font-size: 24px;
      text-align: center;
    }

    #drawer {
      order: 2;
    }

    #close-drawer {
      order: 3;
    }

    #dropdown-drawer ~ #close-drawer {
      display: none;
    }

    #dropdown-drawer:checked ~ #close-drawer {
      display: block;
    }

    #dropdown-drawer ~ #drawer {
      display: none;
    }

    #dropdown-drawer:checked ~ #drawer {
      display: block;
    }

    main {
      margin: 24px 0 0 0;
    }
 
  }

</style>
