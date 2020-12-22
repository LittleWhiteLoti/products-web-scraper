<template>
    <div>
        
    </div>
</template>

<script>


export default {
    props: {
        parentComponent: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        itemName: {
            type: String,
            required: true
        },
        lowestBuyPrice: {
            type: Number,
            required: true
        },
        highestBuyPrice: {
            type: Number,
            required: true
        },
        checkIntervals: {
            type: String,
            required: true
        },
        activelySearching: {
            type: Boolean,
            required: false
        },
        itemLinks: Array
    }
}
</script>