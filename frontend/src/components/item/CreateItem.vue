<template>
    <div id="item-form-frame">
        <form id="item-form" @submit.prevent="validateItem">
            <div id="item-image-preview-container">
                <input id="image" type="file" :bind="imageFile" @change="renderImage" />
                <div id="item-image-preview">
                    <img :src="imageSrc" />
                </div>
                <div class="image-interaction-frame">
                    <div class="image-button-container" v-if="imageFile != ''">
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
                    <input id="item-check-interval-input" type="number" min="2" max="600" value="2" @input="validateInterval" />
                </div>
                <div class="item-information-block">
                    <label>Lowest Price</label>
                    <input name="lowestBuyPrice" @input="validatePrice" v-model="lowestBuyPrice" />
                </div>
                <div class="item-information-block">
                    <label>Highest Price</label>
                    <input name="highestBuyPrice" @input="validatePrice" v-model="highestBuyPrice" />
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
                    <label>Notify Phone Numbers</label>
                    <ul>
                        <li>
                            <div>
                                <input type="text" placeholder="(###) ###-####" />
                                <button @click="addPhoneNumber">+</button>
                            </div>
                        </li>
                        <li v-for="(phoneNumber, index) in phoneNumbers" :key="phoneNumber.index">
                            <div>
                                <input type="text" name="phoneNumbers[]" disabled="disabled" :value="phoneNumber.value" />
                                <button @click="deletePhoneNumber(index)">-</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="email-notifications">
                    <label>Notify Email Addresses</label>
                    <ul>
                        <li>
                            <div>
                                <input type="text" placeholder="email address" />
                                <button @click="addEmail">+</button>
                            </div>
                        </li>
                        <li v-for="(email, index) in emailAddresses" :key="email.index">
                            <input type="text" name="emails[]" disabled="disabled" :value="email.value" />
                            <button @click="deleteEmail(index)">-</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>   
    </div>
</template>

<script>

import { v5 as uuid } from 'uuid'
//import { mapMutations } from 'vuex';

export default {
    data() {

        let imageFile = '';

        let imageSrc = '';

        let lowestBuyPrice = "0.00";

        let highestBuyPrice = 0.01;

        // Component only property
        let emailAddresses = [];

        // Component only property
        let phoneNumbers = [];

        return {
            imageFile,
            imageSrc,
            lowestBuyPrice,
            highestBuyPrice,
            phoneNumbers,
            emailAddresses
        }
    },
    methods: {
        renderImage(e) {
            this.image = e.currentTarget.files[0];
            let fileReader = new FileReader();
            fileReader.onload = e => {
                this.imageSrc = e.target.result;
            }
            fileReader.readAsDataURL(this.image);
        },
        validateInterval(e) {
            let input = e.currentTarget;
            let value = input.value;
            let classes = input.classList;
            (classes.contains("valid-interval")) ? classes.toggle("valid-interval") : "";
            (classes.contains("invalid-interval")) ? classes.toggle("invalid-interval") : "";
            if(value !== "")
            {
                if(/^[0-9]+$/.test(value)) {
                    if(parseInt(value) >= 2 && parseInt(value) <= 600 )
                    {
                        (classes.contains("invalid-interval")) ? classes.toggle("invalid-interval") : "";
                        (!classes.contains("valid-interval")) ? classes.toggle("valid-interval") : "";
                    }
                    else
                    {
                        (classes.contains("valid-interval")) ? classes.toggle("valid-interval") : "";
                        (!classes.contains("invalid-interval")) ? classes.toggle("invalid-interval") : "";
                    }
                }
                else
                {
                    (classes.contains("valid-interval")) ? classes.toggle("valid-interval") : "";
                    (!classes.contains("invalid-interval")) ? classes.toggle("invalid-interval") : "";
                }
            }
        },
        validatePrice(e) {
            let input = e.currentTarget;
            let value = input.value;
            let classes = input.classList;
            if(!/^([0-9]+)?\.[0-9]{0,2}$/.test(value))
            {
                (classes.contains("valid-price")) ? classes.toggle("valid-price") : "";
                (!classes.contains("invalid-price")) ? classes.toggle("invalid-price") : "";                
            }
            else
            {
                if(input.name === "lowestBuyPrice")
                {
                    if(parseFloat(value) >= parseFloat(this.highestBuyPrice))
                    {
                        (classes.contains("valid-price")) ? classes.toggle("valid-price") : "";
                        (!classes.contains("invalid-price")) ? classes.toggle("invalid-price") : "";                    
                    }
                    else if((value == "") || (/^[0]*\.[0]*$/.test(value)))
                    {
                        (classes.contains("valid-price")) ? classes.toggle("valid-price") : "";
                        (classes.contains("invalid-price")) ? classes.toggle("invalid-price") : "";                      
                    }
                }
                if(input.name === "highestBuyPrice")
                {
                    if(parseFloat(value) <= parseFloat(this.lowestBuyPrice))
                    {
                        (classes.contains("valid-price")) ? classes.toggle("valid-price") : "";
                        (!classes.contains("invalid-price")) ? classes.toggle("invalid-price") : "";                    
                    }
                    else if(parseFloat(value) >= parseFloat(this.lowestBuyPrice))
                    {
                        (!classes.contains("valid-price")) ? classes.toggle("valid-price") : "";
                        (classes.contains("invalid-price")) ? classes.toggle("invalid-price") : "";                    
                    }
                    else if((value == "") || (/^[0]*\.[0]*$/.test(value)))
                    {
                        (classes.contains("valid-price")) ? classes.toggle("valid-price") : "";
                        (classes.contains("invalid-price")) ? classes.toggle("invalid-price") : "";                      
                    }
                }
            }
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
                    regex = new RegExp(/^https:\/\/(www\.)?microcenter\.com\/product\//i);
                    validURL = regex.test(value);
                break;
            }
            let classes = input.classList;
            if(value === "")
            {
                (classes.contains("valid-link")) ? classes.toggle("valid-link") : "";
                (classes.contains("invalid-link")) ? classes.toggle("invalid-link") : "";
            }
            else
            {
                if(validURL) {
                    (classes.contains("invalid-link")) ? classes.toggle("invalid-link") : "";
                    (!classes.contains("valid-link")) ? classes.toggle("valid-link") : "";
                }
                else
                {
                    (classes.contains("valid-link")) ? classes.toggle("valid-link") : "";
                    (!classes.contains("invalid-link")) ? classes.toggle("invalid-link") : "";
                }
            }
        },
        addPhoneNumber(e) {
            let input = e.currentTarget;
            let inputSibling = input.previousSibling;
            let namespace = `${ window.location.protocol }//${ window.location.hostname}`;
            let index = (uuid(`${ namespace }?${ Date.now().toString()}`, uuid.URL )).toString().replace(/-/g,"");
            this.phoneNumbers.unshift({ "index": index, "value": inputSibling.value });
            inputSibling.value = "";
        },
        deletePhoneNumber(index) {
            this.phoneNumbers.splice(index, 1);
        },
        addEmail(e) {
            let input = e.currentTarget;
            let inputSibling = input.previousSibling;
            let namespace = `${ window.location.protocol }//${ window.location.hostname}`;
            let index = (uuid(`${ namespace }?${ Date.now().toString()}`, uuid.URL )).toString().replace(/-/g,"");
            this.emailAddresses.unshift({ "index": index, "value": inputSibling.value });
            inputSibling.value = "";
        },
        deleteEmail(index) {
            this.emailAddresses.splice(index, 1);
        }
    },
    beforeUnmount() {
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

#item-form > div:last-child {
    flex-grow: 1;
    margin-top: 10px;
    text-align: center;
}

#item-form > div:last-child button {
    padding: 4px 8px 3px 8px;
    border-radius: 3px;
    border: 1px solid #000000;
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

#item-image-preview > img {
    display: block;
    width: 100%;
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
    line-height: 1.8;
    display: inline-block;
}

.resellers-frame > div input {
    flex-grow: 1;
    border: 1px solid #000000;
    margin-right: 7px;
    padding: 4px 3px 5px 3px;
    font-size: 14px;
}

.valid-interval, .valid-price, .valid-link {
    background-color: #51fd4b;
}

.invalid-interval, .invalid-price, .invalid-link {
    background-color: #ff1f1f;    
}


.notifications-frame {
    flex-grow: 1;
    flex-basis: 100%;
    margin-top: 10px;
}

.notifications-frame > div {
    display: inline-block;
    width: 46%;
    padding: 0 0 0 4%;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    vertical-align:top;
}

.notifications-frame > div > ul {
    list-style: number;
    padding-left: 10px;
    margin: 4px 0 0 0;
}

.notifications-frame div ul li div input {
    padding: 4px 4px 6px 4px;
    font-size: 14px;
    width: 156px;
}

.notifications-frame div ul li div button {
    font-size: 16px;
    font-weight: bold;
    padding: 3px;
    margin-left: 4px;
    width: 34px;
    text-align: center;
}

</style>