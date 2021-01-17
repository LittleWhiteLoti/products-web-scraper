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
                <span class="resize-handle top-right-handle" :style="[resizeHandleStyles, topRightHandleStyles]" @mousedown="startResizingImage" @mouseup="endResizingImage"></span>
                <span class="resize-handle bottom-right-handle" :style="[resizeHandleStyles, bottomRightHandleStyles]" @mousedown="startResizingImage" @mouseup="endResizingImage"></span>
                <!-- class moveable-image is used for detection in saving state -->
                <img class="moveable-image" :src="src" ref="image" @mousedown="startMovingImage" @touchstart="startMovingImage" @mouseup="endMovingImage">
                <span class="resize-handle bottom-left-handle" :style="[resizeHandleStyles, bottomLeftHandleStyles]" @mousedown="startResizingImage" @mouseup="endResizingImage"></span>
                <span class="resize-handle top-left-handle" :style="[resizeHandleStyles, topLeftHandleStyles]" @mousedown="startResizingImage" @mouseup="endResizingImage"></span>
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
        let aspectRatio = false;
        //let aspectRatio = true;
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

        // Array of image state: initialLeft, initialTop, width, height, rotation
        let imageStates;

        return {
            container,
            src,
            handleSize,
            handle,
            aspectRatio,
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
        this.showResizeHandles();

        // Used later to prevent image from being shrunk too much
        // Note: Even though the element has display: none the styles are still able
        //       to be recieved because it is an inline style and not removed from DOM
        let handleSize = parseInt(this.container.children[0].style.minWidth);
        this.handleSize = (handleSize * 2);
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
        // Reset the initial width & height 
        saveInitialImageState() {
            let container = JSON.parse(JSON.stringify(this.container.getBoundingClientRect()));

            // The -1 is for the jump bug that occurs when width or height is read as NaN
            this.width = Math.floor(container['width'] -1);
            this.height = Math.floor(container['height'] -1);
            // First state is when image is loaded
            this.imageStates.push({ 'left': 0, 'top': 0, 'width': this.width, 'height': this.height, 'rotation': 0, 'flipped': false });
        },
        // Call saveImageState once on image upload and everytime the endResize
        saveImageState(e) {
            console.log("Saving image state");
            // clear handle
            this.handle = "";
            let container = this.container;
            let dimensions = JSON.parse(JSON.stringify(container.getBoundingClientRect()));
            this.left = Math.floor(dimensions['left']);
            this.top = Math.floor(dimensions['top']);
            this.width = Math.floor(dimensions['width'] - 1);
            this.height = Math.floor(dimensions['height'] - 1);
            this.imageStates.push({ 'left': this.left, 'top': this.top, 'width': this.width, 'height': this.height, 'rotation': this.rotation, 'flipped': this.flipped });
        },
        startResize(e) {
            let editor = JSON.parse(JSON.stringify(this.editor.getBoundingClientRect()));

            // Check for resizing attempts outside of editor region
            //if(e.clientX - editor['left'] < 0) return;
            //if(e.clientX - this.width > this.width) return;

            let changeX = Math.ceil(e.clientX) - editor['left'];
            let changeY = Math.ceil(e.clientY) - editor['top'];
            let mouseX;
            let mouseY;
            let container = this.container;
            let containerDimensions = JSON.parse(JSON.stringify(container.getBoundingClientRect()));
            //console.log(containerDimensions);
            let image = this.image;

            let boundaryX = (this.width - changeX);
            let boundaryY = (this.height - changeY);

            // Algorithm is different for every handle because each one applies a different change
            // Case statement is needed to preserve the height or width based on which handler is used
            switch(this.handle) {
                case 'top-left-handle':
                    // Prevent resizing smaller than image itself
                    if(this.aspectRatio) {
                        container.style.left = (boundaryX >= this.handleSize) ? changeX + 'px' : container.style.left;
                        container.style.width = (boundaryX >= this.handleSize) ? (this.width - changeX) + "px" : container.style.width;
                        //container.style.height = (boundaryX >= this.handleSize) ? (this.width - changeX) + "px" : container.style.width;
                        image.style.width = (boundaryX >= this.handleSize) ? (this.height - changeX) + "px" : image.style.width;
                        image.style.height = (boundaryX >= this.handleSize) ? (this.height - changeX) + "px" : image.style.height;                         
                    }
                    else
                    {
                        container.style.left = (boundaryX >= this.handleSize) ? changeX + 'px' : container.style.left;
                        container.style.width = (boundaryX >= this.handleSize) ? (this.width - changeX) + "px" : container.style.width;
                        image.style.width = (boundaryX >= this.handleSize) ? (this.width - changeX) + "px" : image.style.width;
                        image.style.height = (boundaryX >= this.handleSize) ? this.height + "px" : image.style.height;
                    }
                break;
                case 'bottom-left-handle':
                    if(this.aspectRatio) {
                        container.style.left = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : container.style.left;
                        container.style.width = ((this.width - (this.width - boundaryX)) >= this.handleSize) ? (this.width - (this.width - boundaryX)) + "px" : container.style.width;

                        image.style.width = (boundaryX >= this.handleSize) ? boundaryX + "px" : image.style.width;
                        image.style.height = (boundaryX >= this.handleSize) ? boundaryX + "px" : image.style.height;
                    }
                    else
                    {
                        container.style.left = (boundaryX >= this.handleSize) ? changeX + 'px' : container.style.left;
                        container.style.width = (boundaryX >= this.handleSize) ? (this.width - changeX) + "px" : container.style.width;
                        image.style.width = (boundaryX >= this.handleSize) ? (this.width - changeX) + 'px' : image.style.width;
                        image.style.height = this.height + "px";
                    }
                break;
                case 'bottom-right-handle':
                    if(this.aspectRatio) {
                        container.style.width = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : container.style.width;
                        container.style.height = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : container.style.height;
                        image.style.width = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : image.style.width;
                        image.style.height = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : image.style.height;
                    }
                    else
                    {
                        //console.log((this.width - boundaryX));
                        container.style.width = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : container.style.width;
                        container.style.height = this.height + "px";
                        image.style.width = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : image.style.width;
                        image.style.height = this.height + "px";
                    }
                break;
                case 'top-right-handle':
                    if(this.aspectRatio) {
                        container.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width;
                        //container.style.height = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width;
                        image.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : image.style.width;
                        image.style.height = (changeX >= this.handleSize) ? (changeX) + "px" : image.style.height; 
                    }
                    else
                    {
                        container.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width;
                        container.style.height = this.height + "px";
                        image.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width; 
                        image.style.height = this.height + "px";
                    }
                break;
            }

            /*
            // Algorithm needs to be adjusted for every handle
            // Algorithm for handle bottom right
            if(this.aspectRatio) {

                let editor = JSON.parse(JSON.stringify(this.container.parentNode.getBoundingClientRect()));

                // Get all changex in X
                let changeX = e.clientX - this.initialLeft;
                let newWidth = this.width + changeX;
                let dimensions = this.container.getBoundingClientRect();
                // Top position needs to be subtracted from clientY to get the real clientY
                let top = dimensions['top'];
                if(this.width - changeX >= 0) {
                    if(dimensions['width'] - newWidth >= 0)
                    {
                        this.container.style.width = newWidth + 'px';
                        this.container.style.height = newWidth + 'px';                        
                    }
                    else
                    {
                        changeX = Math.abs(dimensions['width'] - Math.abs(newWidth));
                        this.container.style.width = dimensions['width'] + changeX + 'px';
                        this.container.style.height = dimensions['width'] + changeX + 'px';
                    }
                }

                dimensions = this.container.getBoundingClientRect();
                // Apply Y changes 

            }
            */
        },
        startResizingImage(e) {
            e.preventDefault();
            e.stopPropagation();
            // If image state 0 it needs to save the initial state
            this.imageStates.length == 0 ? this.saveInitialImageState() : "";
            // Save handle that initiated the resize
            let classes = e.target.classList;
            this.handle = classes.contains('top-right-handle') ? 'top-right-handle' : this.handle;
            this.handle = classes.contains('bottom-right-handle') ? 'bottom-right-handle' : this.handle;
            this.handle = classes.contains('bottom-left-handle') ? 'bottom-left-handle' : this.handle;
            this.handle = classes.contains('top-left-handle') ? 'top-left-handle' : this.handle;
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

            // Save state once the mouse is released
            this.saveImageState();
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
                // Triggers saving initial state
                this.imageStates = new Array();

                this.container.style.top = "0px";
                this.container.style.left = "0px";
                this.rotation = 0;
                this.flipped = false;
            }
            reader.readAsDataURL(image);
        },
        reset() {
            if(this.imageStates.length == 0) return;
            let dimensions = JSON.parse(JSON.stringify(this.imageStates[0])); 
            this.container.style.width = dimensions['width'] + "px";
            this.container.style.height = dimensions['height'] + "px";
            this.container.style.left = dimensions['left'] + "px";
            this.container.style.top = dimensions['top'] + "px"; 
            this.container.style.transform = 'rotate(' + dimensions['rotation'] + 'deg)';
            this.image.style.width = dimensions['width'] + "px";
            this.image.style.height = dimensions['height'] + "px";
            this.left = dimensions['left'] + "px";
            this.top = dimensions['top'] + "px";
  
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
    border: 1px solid red;
    /* Set element at the top by default if handles were not hidden by default */
    vertical-align: top;
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