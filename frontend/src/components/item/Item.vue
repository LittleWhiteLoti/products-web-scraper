<template>
    <div>
        <div id="item-frame">
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
    </div>
</template>

<script>

// import { ref } from 'vue'

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
        sellers: Array
    },
    data() {
        return {}
    },
    methods: {
        validateItem: () => {

        }
    },
}

</script>

<style scoped>

#item-frame {
    background-color: white;
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

#image {
    display: none;
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