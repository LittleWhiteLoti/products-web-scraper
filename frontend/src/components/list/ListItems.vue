<template>
    <div class="active-seaches-list" v-if="parentComponent == 'active-searches'">
        <item v-for="item in items" :item="item" :parentComponent="parentComponent" :key="item.name">
        </item>
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

    .active-searches-list {
        display: flex;
        flex-wrap: wrap;
    }

</style>