<template>
    <div id="active-searches-list" v-if="parentComponent == 'active-searches'">
        <view-item v-for="item in items" :item="item" :parentComponent="parentComponent" :key="item.name"></view-item>
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
        return {
        }
    }
}

</script>

<style scoped>

    #active-searches-list {
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
    }

</style>