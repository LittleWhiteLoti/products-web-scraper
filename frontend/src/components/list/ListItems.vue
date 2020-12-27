<template>
    <div v-if="parentComponent == 'active-searches'">
    </div>
    <div v-else-if="parentComponent == 'paused-searches'">
    </div>
    <div v-else-if="parentComponent == 'removed-searches'">
    </div> 
</template>

<script>

/* eslint vue/no-dupe-keys:off */

export default {
    props: ["parentComponent", "items"],
    data() {
        return {}
    }
}

</script>