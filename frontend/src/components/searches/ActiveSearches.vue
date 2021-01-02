<template>
    <div>
        <div id="list-items" v-if="items.length > 0">
            <list-items :parentComponent="parentComponent" :items="items"></list-items>
        </div>   
    </div>
</template>

<script>

export default {
    data() {

        let parentComponent = "active-searches";

        let items = [
            { "name": "Ryzen 5950x Ryzen 5950x Ryzen 5950x",
                "lowestBuyPrice": "700",
                "highestBuyPrice": "1000",
                "notifyWhenAvailable": [], 
                "sellers": [{
                    "name": "Amazon",
                    "status": "available",
                    "buyLink": "https://google.com"
                }]
            },
            { "name": "Nvidia RTX 3080",
                "lowestBuyPrice": "549",
                "highestBuyPrice": "900",
                "notifyWhenAvailable": [], 
                "sellers": [{
                    "name": "Amazon",
                    "status": "available",
                    "buyLink": "https://google.com"
                },
                {
                    "name": "B & H",
                    "status": "available",
                    "buyLink": "https://google.com"
                },
                {
                    "name": "Microcenter",
                    "status": "available",
                    "buyLink": "https://google.com"
                },
                {
                    "name": "Newegg",
                    "status": "available",
                    "buyLink": "https://google.com"
                }]
            },
            { "name": "Nvidia RTX 3080",
                "lowestBuyPrice": "549",
                "highestBuyPrice": "900",
                "notifyWhenAvailable": [], 
                "sellers": [{
                    "name": "Amazon",
                    "status": "available",
                    "buyLink": "https://google.com"
                }]
            },
            { "name": "Nvidia RTX 3080",
                "lowestBuyPrice": "549",
                "highestBuyPrice": "900",
                "notifyWhenAvailable": [], 
                "sellers": [{
                    "name": "Amazon",
                    "status": "available",
                    "buyLink": "https://google.com"
                },
                {
                    "name": "Best buy",
                    "status": "available",
                    "buyLink": "https://google.com"
                }]
            },
            { "name": "Nvidia RTX 3080",
                "lowestBuyPrice": "549",
                "highestBuyPrice": "900",
                "notifyWhenAvailable": [], 
                "sellers": [{
                    "name": "Amazon",
                    "status": "available",
                    "buyLink": "https://google.com"
                }]
            }
        ];

        //let items = [];

        return {
            parentComponent,
            items
        }
    },

}

</script>

<style scoped>

#stats {
    margin: 4px auto;
}

#item-list {
    display: initial;
}

</style>