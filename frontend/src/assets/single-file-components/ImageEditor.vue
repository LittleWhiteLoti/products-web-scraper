<template>
    <div class="editor" :style="editorStyles">
        <div class="edit-region" :style="editRegionStyles">
            <!--
            <div class="crop-area" :style="cropAreaStyles">
                Cropping Area
            </div>
            -->
            <div class="resize-region" :style="resizeRegionStyles">
                <span class="resize-handle top-right-handle" :style="[resizeHandleStyles, topRightHandleStyles]" @mousedown="startResizingImage" @mouseup="endResizingImage"></span>
                <span class="resize-handle bottom-right-handle" :style="[resizeHandleStyles, bottomRightHandleStyles]" @mousedown="startResizingImage" @mouseup="endResizingImage"></span>
                <!-- class moveable-image is used for detection in saving state -->
                <img class="moveable-region" :src="src" ref="image" @mousedown="startMovingImage" @touchstart="startMovingImage" @mouseup="endMovingImage">
                <span class="resize-handle bottom-left-handle" :style="[resizeHandleStyles, bottomLeftHandleStyles]" @mousedown="startResizingImage" @mouseup="endResizingImage"></span>
                <span class="resize-handle top-left-handle" :style="[resizeHandleStyles, topLeftHandleStyles]" @mousedown="startResizingImage" @mouseup="endResizingImage"></span>
            </div>
        </div>
        <input type="file" @change="loadImage">
        <div class="functions">
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
        editRegionHeight: {
            type: String,
            default: "600px"
        },
        editRegionWidth: {
            type: String,
            default: "600px"
        },
        editRegionBorder: {
            type: String,
            default: "",
        },
        editRegionRadius: {
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
        resizeRegionBorder: {
            type: String,
            default: ""
        },
        resizeRegionRadius: {
            type: String,
            default: ""
        },
        resizeRegionOutline: {
            type: String,
            default: ""
        },
        resizeHandleSize: {
            type: String,
            default: "5px"            
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

        let handleSize;

        let handle;

        // The initial
        //let aspectRatio = false;
        let aspectRatio = true;
        let width;
        let height;
        let startingX;
        let startingY;
        let mouseX;
        let mouseY;
        let rotation;
        let flipped;

        // Array of image state: initialLeft, initialTop, width, height, rotation
        let imageStates;

        return {
            container,
            src,
            handleSize,
            handle,
            aspectRatio,
            width,
            height,
            startingX,
            startingY,
            mouseX,
            mouseY,
            rotation,
            flipped,
            imageStates
        }
    },
    computed: {
        editorStyles() {
            return {
                'min-height': this.editorHeight,
                'min-width': this.editorWidth,
                'max-height': this.editorHeight,
                'max-width': this.editorWidth,
                'border': this.editorBorder,
                'border-radius': this.editorRadius                
            }
        },
        editRegionStyles() {
            return {
                'min-height': this.editRegionHeight,
                'min-width': this.editRegionWidth,
                'max-height': this.editRegionHeight,
                'max-width': this.editRegionWidth,
                'border': this.editRegionBorder,
                'border-radius': this.editRegionRadius
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
        resizeRegionStyles() {
            return {
                'border': this.resizeRegionBorder,
                'border-radius': this.resizeRegionRadius,
                'outline': this.resizeRegionOutline
            }
        },
        resizeHandleStyles() {
            return {
                'min-height': this.resizeHandleSize,
                'min-width': this.resizeHandleSize,
                'max-height': this.resizeHandleSize,
                'max-width': this.resizeHandleSize,
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
        // image & container are dynamically added adn available throughout the component
        this.image = this.$refs['image'];
        this.container = this.$refs['image'].parentNode;
        this.editor = this.container.parentNode;
        // Hides image handles on initial load
        this.showImageContainer();
        // Used later to prevent image from being shrunk too much
        // Note: Even though the element has display: none the styles are still able
        //       to be recieved because it is an inline style and not removed from DOM
        let handleSize = parseInt(this.container.children[0].style.minWidth);
        this.handleSize = (handleSize * 2);
    },
    methods: {
        showImageContainer(show) {
            this.container.style.display = (show) ? "block" : "none";
        },
        on(element, event, callback) {
            element.addEventListener(event, callback);
        },
        off(element, event, callback) {
            element.removeEventListener(event, callback);
        },
        // Reset the initial width & height 
        saveInitialImageState() {
            let container = this.container;
            // Get initial dimensions of container holding the image
            let dimensions = JSON.parse(JSON.stringify(container.getBoundingClientRect()));

            // Note: Never apply styles to image because it is the full width and height of the container
            // Note: Values are used when repainting and should only be saved at the end of image state
            this.width = Math.floor(dimensions['width']) -2;
            this.height = Math.floor(dimensions['height']) -2;
            //this.left = 0;
            //this.top = 0;

            // Initialize inline css values to prevent NaN but never save
            container.style.width = dimensions['width'] -2 + "px";
            container.style.height = dimensions['height'] -2 + "px";
            //container.style.left = "0px";
            //container.style.top = "0px";

            // Declare initial transformations
            this.rotation = 0;
            this.flipped = false;

            // The -2 is for the jump bug that occurs when width or height
            this.imageStates.push({ 'left': this.left, 'top': this.top, 'width': this.width, 'height': this.height, 'rotation': 0, 'flipped': false });
            //console.log("intial state: " + JSON.stringify(this.imageStates[0]));
        },
        // Call saveImageState once on image upload and everytime the endResize
        saveImageState(e) {
            let editor = this.editor;
            let editorDimensions = JSON.parse(JSON.stringify(editor.getBoundingClientRect()));
            let container = this.container;
            let dimensions = JSON.parse(JSON.stringify(container.getBoundingClientRect()));
            this.width = Math.floor(dimensions['width']) -2;
            this.height = Math.floor(dimensions['height']) -2;
            // Important: To calculate the top, take have to take the editor 
            //            top position subtracted by the container top 
            //            position to get the final top position otherwise 
            //            you get a jump from the offset of the container 
            //            top position relative to the viewport rather than 
            //            to the editor
            this.left = Math.floor(dimensions['left'] - editorDimensions['left']);
            this.top = Math.floor(dimensions['top'] - editorDimensions['top']);
            this.imageStates.push({ 'left': this.left, 'top': this.left, 'width': this.width, 'height': this.height, 'rotation': this.rotation, 'flipped': this.flipped });
            // Clear handle
            this.handle = ""; 
            //console.log("Image state: " + JSON.stringify(this.imageStates[this.imageStates.length - 1]));
        },
        startResize(e) {
            let container = this.container;
            // Because container.style.width could be undefined on first run, use dimensions
            // let dimensions = JSON.parse(JSON.stringify(container.getBoundingClientRect()));

            let changeX = (-1 * (this.startingX - e.clientX));
            //let changeY = (-1 * (this.startingY - e.clientY));

            // Manipulations of css by handles
            switch(this.handle) {
                case "top-right-handle":
                    if((this.width + changeX) > (this.handleSize) && (this.height + changeX) > this.handleSize) {
                        container.style.width = (this.width - (-1 * changeX)) + "px";
                        container.style.height = (this.height - (-1 * changeX)) + "px";
                        // Left is sustained
                        container.style.left = this.left + "px";
                        container.style.top = this.top - changeX + "px";
                    }
                break;
                case "bottom-right-handle":
                    container.style.width = (this.width - (-1 * changeX)) + "px";
                    container.style.height = (this.height - (-1 * changeX)) + "px";
                    // Left is sustained
                    container.style.left = this.left + "px";
                    // Top is sustained
                    container.style.top = this.top + "px";
                break;
                case "bottom-left-handle":
                    container.style.width = (this.width - changeX) + "px";
                    container.style.height = (this.height - changeX) + "px";
                    container.style.left = (this.left + changeX) + "px";
                    container.style.tio = this.top + "px";
                break;
                case "top-left-handle":
                    container.style.width = (this.width - changeX) + "px";
                    container.style.height = (this.height - changeX) + "px";
                    container.style.left = (this.left + changeX) + "px";
                    container.style.top = (this.top + changeX) + "px";
                break;
            }

        },
        startResizingImage(e) {
            e.preventDefault();
            e.stopPropagation();
            // If image states length is than 0, set initial state
            this.imageStates.length == 0 ? this.saveInitialImageState() : "";

            // Save handle that initiated the resize
            let classes = e.target.classList;
            this.handle = classes.contains('top-right-handle') ? 'top-right-handle' : this.handle;
            this.handle = classes.contains('bottom-right-handle') ? 'bottom-right-handle' : this.handle;
            this.handle = classes.contains('bottom-left-handle') ? 'bottom-left-handle' : this.handle;
            this.handle = classes.contains('top-left-handle') ? 'top-left-handle' : this.handle;

            // !important: Save the starting x and y for doing calculations of transformation
            this.startingX = e.clientX;
            this.startingY = e.clientY;

            // Transformations are applied to resize container 
            this.on(document, 'mousemove', this.startResize);
            // Event needed to cancel mousemove
            this.on(document, 'mouseup', this.endResizingImage);
        },
        // !Important: endResizingImage only fires when the currentTarget is span, therefore the image needs to move to keep span targetted
        endResizingImage(e) {
            e.stopPropagation();
            this.off(document, 'mousemove', this.startResize);
            this.off(document, 'mouseup', this.endResizingImage);

            // Save final state once image is done resizing
            this.saveImageState();
        },
        startMove(e) {
            let container = this.container;

            let changeX = (-1 * (this.startingX - e.clientX));
            let changeY = (-1 * (this.startingY - e.clientY));

            console.log(changeX);

            container.style.left = this.left + changeX + "px";
            container.style.top = this.top + changeY + "px";
        },
        startMovingImage(e) {
            e.preventDefault();
            e.stopPropagation();
            // If image states length is than 0, set initial state
            this.imageStates.length == 0 ? this.saveInitialImageState() : "";

            // !important: Save the starting x and y for doing calculations of transformation
            this.startingX = e.clientX;
            this.startingY = e.clientY;

            this.on(document, 'mousemove', this.startMove);
            this.on(document, 'mouseup', this.endMovingImage);
        },
        endMovingImage(e) {
            e.stopPropagation();

            this.off(document, 'mousemove', this.startMove);
            this.off(document, 'mouseup', this.endMovingImage);
            
            // Save final state once image is done moving
            this.saveImageState();
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
                // Show image container
                this.showImageContainer(true);
                // Initialize start of stack
                // Must be declared here because the next functions check for the length of the imageStates
                this.imageStates = new Array();
                this.container.style.left = "50px";
                this.container.style.top = "50px";
                this.left = 50;
                this.top = 50;
            }
            reader.readAsDataURL(image);
        },
        reset() {
            if(this.imageStates.length == 0) return;
            let dimensions = JSON.parse(JSON.stringify(this.imageStates[0]));
            console.log(dimensions);
            this.container.style.width = dimensions['width'] + "px";
            this.container.style.height = dimensions['height'] + "px";
            this.container.style.left = dimensions['left'] + "px";
            this.container.style.top = dimensions['top'] + "px"; 
            this.container.style.transform = 'rotate(' + dimensions['rotation'] + 'deg)';
            this.left = dimensions['left'] + "px";
            this.top = dimensions['top'] + "px";
            // clear position array
            this.imageStates = new Array();
            this.saveInitialImageState();
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

.editor {
    position: relative;
}

.editor input {
    display: none;
}

.crop-area {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
}

.edit-region {
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    background-color: #FFFFFF;
}

.resize-region {
    position: absolute;
    cursor: move;
    margin: 0 auto;
    border: 1px solid red;
    /* Set element at the top by default if handles were not hidden by default */
    vertical-align: top;
}
.resize-region img {
    display: block;
    /* All width and height calculations are controlled by resize-container and should never be applied to the image */
    width: 100%;
    height: 100%;
}

.resize-handle {
    position: absolute;
    display: block;
    z-index: 999;
}

.top-right-handle {
    top: 0;
    right: 0;
    cursor: ne-resize;
}

.bottom-right-handle {
    bottom: 0;
    right: 0;
    cursor: se-resize;
}

.bottom-left-handle {
    bottom: 0;
    left: 0;
    cursor: sw-resize;
}

.top-left-handle {
    top: 0px;
    left: 0;
    cursor: nw-resize;
}

.functions {
    display: flex;
    flex-wrap: nowrap;
}

.functions * {
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