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

</style>