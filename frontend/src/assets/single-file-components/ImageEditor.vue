<template>
    <div class="editor-container">
        <div class="editor" :style="editorStyles">
            <div class="crop-area" :style="cropAreaStyles">
                Cropping Area
            </div>
            <div class="resize-container" :style="resizeContainerStyles">
                <span class="resize-handle top-right-handle" :style="[resizeHandleStyles, topRightHandleStyles]" @mouseup="resizeImage"></span>
                <span class="resize-handle bottom-right-handle" :style="[resizeHandleStyles, bottomRightHandleStyles]" @mouseup="resizeImage"></span>
                <img :src="src">
                <img ref="hidden-image" :src="hiddenDataImage">
                <span class="resize-handle bottom-left-handle" :style="[resizeHandleStyles, bottomLeftHandleStyles]" @mouseup="resizeImage"></span>
                <span class="resize-handle itop-left-handle" :style="[resizeHandleStyles, topLeftHandleStyles]" @mouseup="resizeImage"></span>
            </div>
        </div>
        <input id="upload-image" type="file" :src="src" @change="loadImage">
        <div class="functions-container">
            <label for="upload-image">Upload Image</label>
            <button @click="uploadImage">Upload Image</button>
            <template v-if="src != ''">
                <label>Upload Image</label>
                <button type="button" @click="resetImage">Reset Image</button>
                <label>Rotate Left</label>
                <button type="button" @click="rotateImage">Rotate Left</button>
                <label>Rotate Right</label>
                <button type="button" @click="rotateImage">Rotate Left</button>
                <label>Crop Image</label>
                <button type="button" @click="cropImage">Crop Image</button>
                <label>Redo Change</label>
                <button type="button" @click="redoChange">Redo Change</button>
                <label>Undo Change</label>
                <button type="button" @click="undoChange">Undo Change</button>
            </template>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        cropAreaHeight: {
            type: String,
            default: "50px"
        },
        cropAreaWidth: {
            type: String,
            default: "50px"
        },
        cropAreaBorder: {
            type: String,
            default: ""
        },
        cropAreaRadius: {
            type: String,
            default: ""
        },
        cropAreaOutline: {
            type: String,
            default: ""
        },
        editorHeight: {
            type: String,
            default: "initial"
        },
        editorWidth: {
            type: String,
            default: "initial"
        },
        editorBorder: {
            type: String,
            default: "",
        },
        editorRadius: {
            type: String,
            default: "",
        },
        editorDisplay: {
            type: String,
            default: "table"
        },
        resizeContainerBorder: {
            type: String,
            default: ""
        },
        resizeContainerRadius: {
            type: String,
            default: ""
        },
        resizeContainerOutline: {
            type: String,
            default: ""
        },
        resizeHandleHeight: {
            type: String,
            default: "10px"            
        },
        resizeHandleWidth: {
            type: String,
            default: "10px"
        },
        resizeHandleBackground: {
            type: String,
            default: "#000000"
        },
        resizeHandleBorder: {
            type: String,
            default: ''
        },
        resizeHandleRadius: {
            type: String,
            default: ''
        },
        resizeHandleOutline: {
            type: String,
            default: ''
        }
        // Image src is created inside the component not passed in
    },
    data() {

        let src = '';

        let hiddenDataImage = '';

        let width = '';

        let height = '';

        return {
            src,
            hiddenDataImage,
            width,
            height
        }
    },
    computed: {
        cropAreaStyles() { 
            return {
                'min-height': this.cropAreaHeight,
                'min-width': this.cropAreaWidth,
                'max-height': this.cropAreaHeight,
                'max-width': this.cropAreaWidth,
                'border': this.cropAreaBorder,
                'border-radius': this.cropAreaRadius,
                'outline': this.cropAreaOutline
            }
        },
        editorStyles() {
            return {
                'min-height': this.editorHeight,
                'min-width': this.editorWidth,
                'max-height': this.editorHeight,
                'max-width': this.editorWidth,
                'border': this.editorBorder,
                'border-radius': this.editorRadius,
                'display': this.editorDisplay
            }
        },
        resizeContainerStyles() {
            return {
                'border': this.resizeContainerBorder,
                'border-radius': this.resizeContainerRadius,
                'outline': this.resizeContainerOutline
            }
        },
        resizeHandleStyles() {
            return {
                'min-height': this.resizeHandleHeight,
                'min-width': this.resizeHandleWidth,
                'max-height': this.resizeHandleHeight,
                'max-width': this.resizeHandleWidth,
                'background': this.resizeHandleBackground,
                'border': this.resizeHandleBorder,
                'border-radius': this.resizeHandleRadius,
                'outline': this.resizeHandleOutline
            }
        },
        topRightHandleStyles() {
            return {}
        },
        bottomRightHandleStyles() {
            return {}
        },
        bottomLeftHandleStyles() {
            return {}
        },
        topLeftHandleStyles() {
            return {}
        }
    },
    watch: {
        src() {
            console.log("Image changed");
        }
    },
    methods: {
        resizeImage() {

        },
        uploadImage(e) {
            let element = e.currentTarget.parentNode.previousSibling;
            element.click();
        },
        loadImage(e) {
            let image = e.currentTarget.files[0];

            let reader = new FileReader;

            //console.log(this.$refs['hidden-image']);

            reader.onload = (e) => {
                let data = e.target.result;

                this.hiddenDataImage = data;

                console.log(this.$refs['hidden-image']);

                this.height = this.$refs['hidden-image'].height;

                this.width = this.$refs['hidden-image'].width;

                console.log(`Width: ${ this.width }  Height: ${ this.height} `);

            }

            reader.readAsDataURL(image);
        },
        resetImage() {

        },
        rotateImage() {

        },
        cropImage() {

        },
        undoChange() {

        },
        redoChange() {

        }
    }
}
</script>

<style scoped>

/* Avoid styles that are set statically */

.editor-container {
    position: relative;
}

.editor-container input {
    display: none;
}

.crop-area {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
}

.editor {
    overflow: hidden;
    position: relative;
}

.editor {
    background-color: #FFFFFF;
}

.resize-container {
    position: relative;
    display: inline-block;
    cursor: move;
    margin: 0 auto;
}

.resize-container img {
    display: block;
}

.resize-handle {
    position: absolute;
    display: block;
    z-index: 999;
}

.top-right-handle {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
}

.bottom-right-handle {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
}

.bottom-left-handle {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
}

.top-left-handle {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
}

#upload-image {
    display: none;
}

.functions-container {
    display: flex;
    flex-wrap: nowrap;
}

.functions-container * {
    flex-grow: 1;
}

label {
    max-height: 0;
    max-width: 0;
    visibility: none;
    overflow: hidden;
}

.hidden-image {
    visibility: hidden;
    position: absolute;
    z-index: -1;
}

</style>