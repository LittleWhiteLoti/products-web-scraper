<template>
    <div class="item-frame" v-if="parentComponent == 'active-searches'">
        <div class="item-header-frame">
            <div class="item-header">{{ name }}</div>
        </div>
        <div class="item-buying-range-frame">
            <div class="item-buying-range">Range: {{ lowestBuyPrice }} - {{ highestBuyPrice }}</div>
        </div>
        <div class="item-image-frame">
            <div class="item-image">
                <img :src="image" />
            </div>
        </div>
        <div class="item-info" v-for="seller in sellers" :key="seller.seller">
            <div class="item-seller">{{ seller.name }}</div>
            <div class="item-status">
                <div class="item-status-available" v-if="seller.status == 'available'">
                    <a :href="seller.buyLink" @click.prevent="openLink($event)">Buy Now</a>
                </div>
                <div class="item-status-unavailable" v-else>
                    <span>{{ seller.status }}</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="parentComponent == 'paused-searches'">
    </div>
    <div v-else-if="parentComponent == 'removed-searches'">
    </div>
    <div id="item-form-frame" v-else-if="parentComponent == 'create-search-item'">
        <form id="item-form" @submit.prevent="validateItem">
            <div id="item-image-preview-container">
                <input id="image" type="file" :bind="images" />
                <div id="item-image-preview"></div>
                <div class="image-interaction-frame">
                    <div class="image-button-container" v-if="existingImages">
                        <label class="image-interaction-button">Remove Image</label>
                    </div>
                    <div class="image-button-container" v-else>
                        <label for="image" class="image-interaction-button">Select Item Image</label>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </form>   
    </div>
</template>

<script>

//import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    props: {
        parentComponent: {
            type: String,
            required: true
        },
        item: {
            type: Object,
            required: true
        } 
    },
    data() {

        //let store = useStore();

        //let store = useStore()._modules.root._children.items;
        //store.getter['item/nestedGetter']();
        //store.getters['items/nestedGetter'];

        return {
            name: this.$props.item.name,
            image: typeof(this.$props.item.image) != 'undefined' ? this.$props.item.image : './images/no-image-available-for-this-product.png',
            lowestBuyPrice: this.formatLowestBuyPrice(this.$props.item.lowestBuyPrice),
            highestBuyPrice: this.formatHighestBuyPrice(this.$props.item.highestBuyPrice),
            notifyWhenAvailable: this.$props.item.notifyWhenAvailable, // List of phone numbers to sms
            sellers: this.$props.item.sellers
        }
    },
    methods: {
        formatLowestBuyPrice(currency) {
            if(currency === '') return '$0.00';
            let period = new String(currency).charAt(0);
            let value = (period > -1) ? `$${ currency }` : `$0.${ currency }`;
            return value;
        },
        formatHighestBuyPrice(currency) {
            if(currency === "") return '$ &#8734;';
            let period = new String(currency).charAt(0);
            let value = (period > -1) ? `$${ currency }` : `$0.${ currency }`;
            return value;
        },
        openLink(e) {
            let element = e.currentTarget;
            let link = element.href;
            let regex = new RegExp(/^(http|https)/);
            if(regex.test(link))
            {
                // External link
                window.open(link, "_blank");
            }
            else
            {
                // Internal link
                let router = useRouter();
                router.push(link);
            }
        }
    }
}

</script>

<style scoped>

/* Styles for active-searches */

.item-frame {
    background-color: #FFFFFF;
    border-radius: 3px;
    min-height: 100px;
    min-width: 182px;
    max-width: 182px;
    margin: .25em;
    flex-grow: 1;
    box-shadow: 1px 2px 3px #d6d6d6, 2px 1px 3px #d6d6d6;
}

.item-header-frame {
    text-align: center;
    overflow: hidden;
    width: 100%;
    border-bottom: 1px solid #c5c5c5;
}

.item-header {
    font-weight: bold;
    font-size: 14px;
    text-overflow: ellipsis;
    padding: 3px 4px 4px 4px;
    white-space: nowrap;
    overflow: hidden;
}

.item-buying-range-frame {
    padding: 2px 0;
}

.item-buying-range {
    text-align: center;
    font-size: 12px;
    font-weight: 700;
}

.item-image-frame {
    border-top: 1px solid #c5c5c5;
    border-bottom: 1px solid #c5c5c5;
    min-height: 120px;
    max-height: 120px;
}

.item-image {
    text-align: center;
}

.item-image img {
    display: block;
    width: 100%;
    height: 120px;
    overflow: hidden;
} 

.item-info {
    padding: 4px;
    display: flex;
    flex-flow: row nowrap;
}

.item-info > * {
    display: inline-block;
    flex-grow: 1;
    flex-basis: 50%;
}

.item-seller {
    padding-top: 4px;
    font-weight: bold;
    font-size: 12px;
}

.item-status {
    text-align: center;
    font-size: 14px;
}

.item-status > * {
    border-radius: 3px;
    border: 1px solid #5c3901;
    padding: 2px;
    font-weight: bold;
}

.item-status-available {
    background-color: #f9a825;
    font-weight: bold;
}

.item-status-available:active {
    background-color: #b47106; 
}

.item-status-available a:link {
    display: block;
    text-decoration: none;
    color: #885b13;
}

.item-status-available a:active {
    color: #DDDDDD; 
}

.item-status-unavailable {
    font-weight: initial;
} 

@media screen and (max-width: 800px) {

}

@media screen and (max-width: 480px) {
}

/* esling no-empty-rulesets */

/* Styles for create-search-item */

.item-form-frame {
    background-color: #FFFFFF;
    border: 1px solid #005500;
    border-radius: 3px;
    padding: 8px;
}

#item-form {

}

#item-image-preview-container {
    border: 1px solid #000000;
    min-width: 150px;
    max-width: 150px;
    min-height: 150px;
    max-height: 150px;
}

#item-image-preview {
    display: block;
    min-height: inherit;
    min-width: 100%;
}

.image-interaction-frame {
    position: relative;
}

.image-button-container {
    text-align: center;
    background-color: #DDDDDD;
    margin-top: -24px;
}

.image-button-container:link {
    visibility: hidden;
}

.image-button-container:hover {
    visibility: visible;
}

.image-interaction-button {
    display: block;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    padding: 3px 0px;
}

</style>