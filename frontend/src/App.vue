<template>
  <div>
    <header>
    </header>
    <nav>
      <router-link to="/create-item-search">Create Item Search</router-link>
      <router-link to="/active-searches">Active Searches</router-link>
      <router-link to="/paused-searches">Paused Searches</router-link>
      <router-link to="/removed-searches">Removed Searches</router-link>
    </nav>
    <main>
      <template v-if="ActiveComponent== 'active-searches'">
        <keep-alive>
          <component :is="ActiveComponent"></component>
        </keep-alive>
      </template>
      <template v-else>
        <component :is="ActiveComponent"></component>
      </template>
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
      ActiveComponent
    }
  },
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

  nav {
    width: 1024px;
    margin: 4px auto 12px auto;
    display: flex;
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

  .router-link-active {
    background-color: #005500;
    color: #BBBBBB;
  }

  main {
    width: 1024px;
    margin: auto auto;
  }

</style>
