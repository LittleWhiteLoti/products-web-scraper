<template>
    <div class="editor-container" :style="editorContainerStyles">
        <div class="editor" :style="editorStyles">
            <div class="crop-area" :style="cropAreaStyles">
                Cropping Area
            </div>
            <div class="resize-container" :style="resizeContainerStyles">
                <!--
                <span class="resize-handle top-right-handle" :style="[resizeHandleStyles, topRightHandleStyles]" @mousedown="startResizingImage" @touchstart="startResizingImage" @mouseup="endResizingImage" @touchmove="endResizingImage"></span>
                <span class="resize-handle bottom-right-handle" :style="[resizeHandleStyles, bottomRightHandleStyles]" @mousedown="startResizingImage" @touchstart="startResizingImage" @mouseup="endResizingImage" @touchmove="endResizingImage"></span>
                <img :src="src" ref="image" @mousedown="startMovingImage" @touchstart="startMovingImage" @mouseup="endMovingImage" @touchmove="endMovingImage">
                <span class="resize-handle bottom-left-handle" :style="[resizeHandleStyles, bottomLeftHandleStyles]" @mousedown="startResizingImage" @touchstart="startResizingImage" @mouseup="endResizingImage" @touchmove="endResizingImage"></span>
                <span class="resize-handle top-left-handle" :style="[resizeHandleStyles, topLeftHandleStyles]" @mousedown="startResizingImage" @touchstart="startResizingImage" @mouseup="endResizingImage" @touchmove="endResizingImage"></span>
                -->
                <span class="resize-handle top-right-handle" :style="[resizeHandleStyles, topRightHandleStyles]" @mousedown="startResizingImage"></span>
                <span class="resize-handle bottom-right-handle" :style="[resizeHandleStyles, bottomRightHandleStyles]" @mousedown="startResizingImage"></span>
                <!-- class moveable-image is used for detection in saving state -->
                <img class="moveable-image" :src="src" ref="image" @mousedown="startMovingImage" @touchstart="startMovingImage" @mouseup="endMovingImage">
                <span class="resize-handle bottom-left-handle" :style="[resizeHandleStyles, bottomLeftHandleStyles]" @mousedown="startResizingImage"></span>
                <span class="resize-handle top-left-handle" :style="[resizeHandleStyles, topLeftHandleStyles]" @mousedown="startResizingImage"></span>
            </div>
        </div>
        <input type="file" @change="loadImage">
        <div class="functions-container">
            <label @click="uploadImage">Upload Image</label>
            <button @click="uploadImage">Upload Image</button>
            <template v-if="src">
                <label>Upload Image</label>
                <button type="button" @click="reset">Reset Image</button>
                <label>Rotate Image</label>
                <button type="button" @click="rotate">Rotate Image</button>
                <template v-if="!aspectRatio">
                    <label>Maintain Image Ratio</label>
                    <button type="button" @click="toggleAspectRatio">Maintain Image Ratio</button>
                </template>
                <template v-else>
                    <label>Neglect Image Ratio</label>
                    <button type="button" @click="toggleAspectRatio">Neglect Image Ratio</button>
                </template>
                <label>Crop Image</label>
                <button type="button" @click="crop">Crop Image</button>
                <label>Redo Change</label>
                <button type="button" @click="redo">Redo Change</button>
                <label>Undo Change</label>
                <button type="button" @click="undo">Undo Change</button>
                <label>Save Change</label>
                <button type="button" @click="save">Save Change</button>
            </template>
        </div>
    </div>
</template>

<script>

/* eslint no-unused-vars:off */
/* eslint no-empty:off */

export default {
    props: {
        editorContainerHeight: {
            type: String,
            default: "initial"
        },
        editorContainerWidth: {
            type: String,
            default: "initial"
        },
        editorContainerBorder: {
            type: String,
            default: "",
        },
        editorContainerRadius: {
            type: String,
            default: "",
        },
        editorHeight: {
            type: String,
            default: "initial"
        },
        editorWidth: {
            type: String,
            default: "initial"
        },
        editorPadding: {
            type: String,
            default: "4px"
        },
        editorBorder: {
            type: String,
            default: "",
        },
        editorRadius: {
            type: String,
            default: "",
        },
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
        // display: inline-block makes the element wrap around it's children like span
        let container;

        // Original image source
        let src;

        // Canvas variable will be assigned when image is loaded
        let canvas = document.createElement('canvas');

        // The initial
        let aspectRatio = false;
        let initialLeft;
        let initialTop;
        let leftOffset;
        let topOffset;
        let mouseX;
        let mouseY;
        let width;
        let height;
        let rotation;
        let flipped;
        let handle;

        // Array of image state: initialLeft, initialTop, width, height, rotation
        let imageStates;

        return {
            aspectRatio,
            container,
            src,
            canvas,
            initialLeft,
            initialTop,
            leftOffset,
            topOffset,
            mouseX,
            mouseY,
            width,
            height,
            rotation,
            flipped,
            handle,
            imageStates
        }
    },
    computed: {
        editorContainerStyles() {
            return {
                'min-height': this.editorContainerHeight,
                'min-width': this.editorContainerWidth,
                'max-height': this.editorContainerHeight,
                'max-width': this.editorContainerWidth,
                'border': this.editorContainerBorder,
                'border-radius': this.editorContainerRadius                
            }
        },
        editorStyles() {
            return {
                'min-height': this.editorHeight,
                'min-width': this.editorWidth,
                'max-height': this.editorHeight,
                'max-width': this.editorWidth,
                'padding': this.editorPadding,
                'border': this.editorBorder,
                'border-radius': this.editorRadius
            }
        },
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
    mounted() {
        this.container = this.$refs['image'].parentNode;
        // Hides image handles on initial load
        this.showResizeHandles();
    },
    methods: {
        showResizeHandles(show) {
            let children = this.container.children;
            for(var i = 0, len = children.length; i < len; i++)
            {
                if(children[i].tagName == "SPAN") {
                    children[i].style.display = show ? "block" : "none"; 
                }
            }   
        },
        on(element, event, callback) {
            element.addEventListener(event, callback);
        },
        off(element, event, callback) {
            element.removeEventListener(event, callback);
        },
        // paint transformation on canvas and display it
        paintImage(e) {
        },
        // Call saveImageState once on image upload and everytime the endResize
        saveImageState(e) {
            this.initialLeft = e.clientX;
            this.initialTop = e.clientY;
            let container = this.container.getBoundingClientRect();
            this.width = container['width'];
            this.height = container['height'];
            // The handle used to start the resize
            let element = e.target;
            let classes = element.classList;
            // Note: Might not work for moving...
            let handle;
            switch(true) {
                case classes.contains('top-right-handle'):
                    handle = 'top-right-handle';
                break;
                case classes.contains('bottom-right-handle'):
                    handle = 'bottom-right-handle';
                break;
                case classes.contains('bottom-left-handle'):
                    handle = 'bottom-left-handle';
                break;
                case classes.contains('top=left-handle'):
                    handle = 'top=left-handle';
                break;
                case classes.contains('moveable-image'):
                    handle = 'moveable-image';
                break;
            }
            this.imageStates.push({ 'left': this.left, 'top': this.top, 'width': this.width, 'height': this.height, 'rotation': this.rotation, 'handle': handle });
            // rotation is updated at the end
            let index = this.imageStates.length - 1;
            //console.log(JSON.parse(JSON.stringify(this.imageStates[index])));
        },
        startResize(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            // e by itself gets the document and clientX & clientY is the mouseposition on the document
            let element = e.target;
            let classes = element.classList;

            // Difference is applied to width and height of container
            this.leftOffset = (this.mouseX - this.initialLeft);
            this.topOffset = (this.mouseY - this.initialTop);

            // Current ImageState contains handle
            let index = this.imageStates.length - 1;
            let handle = JSON.parse(JSON.stringify(this.imageStates[index]))['handle'];

            //console.log(e.code);
            // Case statement is needed to preserve the height or width based on which handler is used
            switch(handle) {
                case 'top-right-handle':

                break;
                case 'bottom-right-handle':

                break;
                case 'bottom-left-handle':

                break;
                case 'top-left-handle':

                break;
            }

            if(this.aspectRatio) {
                let changeX = e.clientX - this.initialLeft;
                let newWidth = this.width + changeX;
                let changeY = e.clientY - this.initialTop;
                let newHeight = this.height + changeY;
                
                if(changeX != 0) {
                    this.container.style.width = newWidth + 'px';
                    this.container.style.height = newWidth + 'px';
                }
                /*
                if(changeY != 0) {
                    this.container.style.width = newHeight + 'px';
                    this.container.style.height = newHeight + 'px';                    
                }
                */
            }
        },
        endResize(e) {
            // Must call to prevent memory leaks
            this.off(document, 'mousemove', this.startResize);
        },
        startResizingImage(e) {
            e.preventDefault();
            e.stopPropagation();
            // get image width & height after reader.onloadended function otherwise it will 
            // return anything other than 0 on clientWidth & clientHeight
            // Call save state only on resize handlers
            e.target.classList.contains('resize-handle') ? this.saveImageState(e) : "";
            this.on(document, 'mousemove', this.startResize);
            // Event needed to cancel mousemove
            this.on(document, 'mouseup', this.endResize);
        },
        // !Important: endResizingImage only fires when the currentTarget is span, therefore the image needs to move to keep span targetted
        endResizingImage(e) {
            e.stopPropagation();
            // Remove event handlers to prevent memory leaks
            // Unable to remove movemouse startReize in current function, must do it when endResize is called
            this.off(document, 'mouseup', this.endResize);
            // Apply transformations but don't save state
            this.assignNewImageDimensions();
            this.paintImage();
        },
        startMovingImage(e) {

        },
        endMovingImage(e) {

        },
        uploadImage(e) {
            // Both of these reference the same element
            let element = e.currentTarget.parentNode.previousSibling;
            element.click();
        },
        loadImage(e) {
            let image = e.currentTarget.files[0];
            let reader = new FileReader;

            // Begins after any image upload
            // Note: Will fire on the event of success or failure of event
            // **Note for later: Add mime validation to prevent errors
            reader.onloadend = (e) => {
                // All changes will be a copy of the original image
                this.src = e.target.result;
                // Show image handles after image has loaded
                this.showResizeHandles(true);
                // Reset properties after every upload
                this.left = 0;
                this.top = 0;
                this.rotation = 0;
                this.flipped = false;
                this.imageStates = new Array();
            }
            reader.readAsDataURL(image);
        },
        reset() {

        },
        rotate() {

        },
        toggleAspectRatio() {
            this.aspectRatio = !this.aspectRatio;
        },
        crop() {

        },
        undo() {

        },
        redo() {

        },
        save() {

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
    box-sizing: border-box;
    background-color: #FFFFFF;
}

.resize-container {
    position: absolute;
    cursor: move;
    margin: 0 auto;
    /* Set element at the top by default if handles were not hidden by default */
    vertical-align: top;
}
.resize-container img {
    display: block;
    width: 100%;
    height: 100%;
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

.functions-container {
    display: flex;
    flex-wrap: nowrap;
}

.functions-container * {
    flex-grow: 1;
    max-height: 22px;
    overflow: hidden;
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