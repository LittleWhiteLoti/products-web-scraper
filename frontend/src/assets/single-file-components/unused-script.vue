        // Probably can be reused with some minor adjustments
        calculateElementOffsets(e, callback) {
            let documentBounds = document.body.getBoundingClientRect();
            let docLeft = Math.abs(Math.ceil(documentBounds.left));
            let docTop = Math.abs(Math.ceil(documentBounds.top));
            let elementBounds = e.getBoundingClientRect();
            let elLeft = Math.abs(Math.ceil(elementBounds.left));
            let elTop = Math.abs(Math.ceil(elementBounds.top));
            let leftOffset = (docLeft >= elLeft) ? docLeft - elLeft : elLeft - docLeft;
            let topOffset = (docTop >= elTop) ? docTop - elTop : elTop - docTop;
          s  if(typeof(callback) != 'undefined')
            {
                callback['leftOffset'] = leftOffset;
                callback['topOffset'] = topOffset;
            }
            else
            {
                return { 'leftOffset': leftOffset, 'topOffset': topOffset };
            }
        },
        calculateEditorOffset() {
            let obj = Object.create(null);
            obj['leftOffset'] = 0;
            obj['topOffset'] = 0;
            // Using a callback return value to retrieve the 
            this.on(document, 'resize', this.calculateElementOffsets(this.editor, obj));
            this.editorLeftOffset = obj['leftOffset'];
            this.editorTopOffset = obj['topOffset'];
            console.log(obj['leftOffset'], obj['topOffset']);
        },