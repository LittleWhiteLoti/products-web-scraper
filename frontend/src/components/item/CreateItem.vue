<template>
    <div id="item-form-frame">
        <form id="item-form" @submit.prevent="validateItem">
            <div id="item-image-preview-container">
                <input id="image" type="file" :bind="image" @change="renderImage" />
                <div id="item-image-preview"></div>
                <div class="image-interaction-frame">
                    <div class="image-button-container" v-if="image > 0">
                        <label class="image-interaction-button">Remove Image</label>
                    </div>
                    <div class="image-button-container" v-else>
                        <label for="image" class="image-interaction-button">Select Image</label>
                    </div>
                </div>
            </div>
            <div id="item-information-container">
                <div class="item-information-block">
                    <label id="item-name-label">Name</label>
                    <input id="item-name-input" type="text" name="item-name" placeholder="Item Name">
                </div>
                <div class="item-information-block">
                    <label id="item-check-interval-label">Check Interval</label>
                    <input id="item-check-interval-input" type="number" min="2" max="600" />
                </div>
                <div class="item-information-block">
                    <label>Lowest Price</label>
                    <input placeholder="##.##" />
                </div>
                <div class="item-information-block">
                    <label>Highest Price</label>
                    <input placeholder="##.##" />
                </div>
            </div>
            <div class="resellers-frame">
                <div>
                    <label>Newegg</label>
                    <input type="text" name="newegg" @input="validateLink" placeholder="Product Link" />
                </div>
                <div>
                    <label>Amazon</label>
                    <input type="text" name="amazon" @input="validateLink" placeholder="Product Link" />
                </div>
                <div>
                    <label>B &amp; H</label>
                    <input type="text" name="b&amp;h" @input="validateLink" placeholder="Product link" />
                </div>
                <div>
                    <label>Microcenter</label>
                    <input type="text" name="microcenter" @input="validateLink" placeholder="Product link" />
                </div>
            </div>
            <div class="notifications-frame">
                <div class="phone-notifications">
                    <div>
                        Notify Phone Numbers
                    </div>
                </div>
                <div class="email-notifications">
                    <div>
                        Notify Email Addresses
                    </div>
                </div>
            </div>
        </form>   
    </div>
</template>

<script>
export default {
    data() {

        let image = '';

        return {
            image
        }
    },
    methods: {
        renderImage(e) {
            let image = e.currentTarget.files;
            console.log(image);
        },
        validateLink(e) {
            let input = e.currentTarget;
            let value = input.value;
            let regex;
            let validURL = false;
            let reseller = input.name;
            switch(reseller) {
                case "newegg":
                    regex = new RegExp(/^https:\/\/(www\.)?newegg\.com\//i);
                    validURL = regex.test(value);
                break;
                case "amazon":
                    regex = new RegExp(/^https:\/\/(www\.)?amazon\.com\//i);
                    validURL = regex.test(value);
                break;
                case "b&h":
                    regex = new RegExp(/^https:\/\/(www\.)?bhphotovideo\.com\//i);
                    validURL = regex.test(value);
                break;
                case "microcenter":
                    regex = new RegExp(/^https:\/\/(www\.)?microcenter\.com\/product\//);
                    validURL = regex.test(value);
                break;
            }
            let attr = document.createAttribute("disabled");
            attr.value = "disabled";
            input.attributes.setNamedItem(attr);
            console.log(input.attributes);
        }
    }
}
</script>

<style scoped>

#item-form-frame {
    overflow: hidden;
}

#item-form {
    border: 1px solid #005500;
    border-radius: 3px;
    background-color: #FFFFFF;
    display: table;
    width: 500px;
    margin: auto auto;
    display: flex;
    flex-flow: row wrap;
    box-sizing: border-box;
    padding: 1%;
}

.flex-break {
    flex-grow: 1;
    height: 0;
}

#item-image-preview-container {
    border: 1px solid #000000;
    min-width: 100px;
    max-width: 100px;
    min-height: 100px;
    max-height: 100px;
    flex: 0 0 18%;
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
    font-size: 14px;
    text-align: center;
    background-color: #DDDDDD;
    color: #555555;
    position: absolute;
    width: 100%;
    bottom: 2px;
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
    padding: 2px 0px;
    margin: -2px 0;
}

#item-information-container {
    flex: 0 0 78.5%;
}

#item-information-container label {
    display: block;
}

#item-information-container > * {
    display: inline-block;
}

.item-information-block {
    width: 46%;
    display: block;
    padding: 2%;
}

.item-information-block:nth-child(1), .item-information-block:nth-child(2) {
    margin-bottom: 1px;
}

.item-information-block label {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 2px;
}

.item-information-block input {
    width: 100%;
    display: block;
}

.resellers-frame {
    flex: 1 0 100%;
}

.resellers-frame > div {
    padding: 4px;
    width: 100%;
    display: flex;
}

.resellers-frame > div label {
    width: 100px;
    display: inline-block;
}

.resellers-frame > div input {
    flex-grow: 1;
}

</style>