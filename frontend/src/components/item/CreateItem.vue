<template>
    <div id="item-form-frame">
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

<style scoped>

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