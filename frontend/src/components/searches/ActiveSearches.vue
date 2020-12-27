<template>
    <div>
        <div id="list-items">
            <list-items :parentComponent="parentComponent" :items="items"></list-items>
        </div>   
    </div>
</template>

<script>

export default {
    data() {

        let parentComponent = "active-searches";

        let itemsFound = 0;

        let items = [
            { "name": "Ryzen 5950x",
                "image": "Not Available",
                "lowBuyPrice": "700",
                "highBuyPrice": "1000",
                "notifyWhenAvailable": [], 
                "sellers": {
                    "Amazon": {
                        "itemStatus": "Searching...",
                        "buyLink": "dfshd;ojkhs",
                        "lastAvailable": ""
                    },
                    "BestBuy": {
                        "itemStatus": "Searching...",
                        "buyLink": "dfshd;ojkhs",
                        "lastAvailable": ""                   
                    },
                    "B&H": {
                        "itemStatus": "Available",
                        "buyLink": "dfshd;ojkhs",
                        "lastAvailable": ""                   
                    },
                    "Newegg": {
                        "itemStatus": "",
                        "buyLink": "dfshd;ojkhs",
                        "lastAvailable": ""                   
                    }
                }
            },
            { "name": "Nvidia RTX 3080",
                "image": "Not Available",
                "lowBuyPrice": "549",
                "highBuyPrice": "900",
                "notifyWhenAvailable": [], 
                "sellers": {
                    "Newegg": {
                        "itemStatus": "",
                        "buyLink": "dfshd;ojkhs",
                        "lastAvailable": ""                   
                    },
                }
            }
        ];

        return {
            parentComponent,
            itemsFound,
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

.item {
    margin: 4px;
    padding: 0;
    border: 1px solid #006600;
    border-radius: 3px;
    background-color:  #FFFFFF;
    min-height: 150px;
    min-width: 200px;
    max-width: 200px;
}

table {
    width: 100%;
    table-layout: auto;
}

th, tr {
    width: 100%;
    display: inherit;
}

td {
    width: 50%;
    text-align: center;

}

</style>