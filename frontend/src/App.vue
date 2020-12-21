<template>
  <div>

    <div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue';

import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
  },
  data() {

    let store = useStore();

    // Dive deeper into store for the authenication module
    let Auth = store._modules.root._children.Auth;

    // Get the accessToken property
    let accessTokens = reactive(Auth.state.accessTokens.appAccessToken);

    // Watch changes in accessToken
    // If any changes are made send a fetch reques to verify that the token matches the hash 
    watch(accessTokens, () => {
      Auth.validate(accessTokens.appAccessToken);
    });

    return {
      appAccessToken: accessTokens.appAccessToken,
    }
  },
  setup() {
     return {
     }
  }
}
</script>

<style>
</style>
