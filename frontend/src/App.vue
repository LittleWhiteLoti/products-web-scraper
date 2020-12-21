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

<style scoped>

  header {

  }

  nav {

  }

  main {

  }

</style>
