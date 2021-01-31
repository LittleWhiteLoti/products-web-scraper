            // Problem: The width and height get reset on resize

            // Algorithm is different for every handle because each one applies a different change
            // Case statement is needed to preserve the height or width based on which handler is used
            switch(this.handle) {
                case 'top-left-handle':
                    // Position isn't correct for initial start
                    // Prevent resizing smaller than image itself
                    if(this.aspectRatio) {
                        console.log("Current Width: " + this.width + " Measurement width " + (this.width - (this.width - boundaryX)));
                        container.style.width = (boundaryX >= this.handleSize) ? this.width - (this.width - boundaryX) + "px" : container.style.width;
                        container.style.height = (boundaryX >= this.handleSize) ? (this.height - (this.height - boundaryX)) + "px" : container.style.height;

                        container.style.left = (boundaryX >= this.handleSize) ? (this.width - boundaryX) + "px" : container.style.left;
                        container.style.top = (boundaryX >= this.handleSize) ? (this.height - boundaryX) + "px" : container.style.top;
                        image.style.width = (boundaryX >= this.handleSize) ? this.width - (this.width - boundaryX) + "px" : image.style.width;
                        image.style.height = (boundaryX >= this.handleSize) ? this.height - (this.height - boundaryX) + "px" : image.style.height;
                        
                        

                        //console.log("Left: " + (this.width - boundaryX));
                        //console.log("Width: " + (this.width - (this.width - boundaryX)));


                        //container.style.top = (boundaryX >= this.handleSize) ? boundaryX + this.height + "px" : container.style.top;


                        /*
                        container.style.left = (boundaryX >= this.handleSize) ? changeX + 'px' : container.style.left;
                        container.style.width = (boundaryX >= this.handleSize) ? (this.width - changeX) + "px" : container.style.width;
                        container.style.height = (boundaryX >= this.handleSize) ? (this.width - changeX) + "px" : container.style.width;
                        image.style.width = (boundaryX >= this.handleSize) ? (this.height - changeX) + "px" : image.style.width;
                        image.style.height = (boundaryX >= this.handleSize) ? (this.height - changeX) + "px" : image.style.height;
                        */                         
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
                        // Figure out which has the bigger change, x-axis or y-axis
                        if(changeX >= changeY) {
                            container.style.width = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : container.style.width;
                            // Needed to maintain consistent width and height on container otherwise the image resizes at different times before correcting itself
                            container.style.height = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : container.style.height;
                            image.style.width = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : image.style.width;
                            image.style.height = ((this.width - boundaryX) >= this.handleSize) ? (this.width - boundaryX) + "px" : image.style.height;
                        }
                        else
                        {
                            container.style.width = ((this.width - boundaryY) >= this.handleSize) ? (this.width - boundaryY) + "px" : container.style.width;
                            // Needed to maintain consistent width and height on container otherwise the image resizes at different times before correcting itself
                            container.style.height = ((this.width - boundaryY) >= this.handleSize) ? (this.width - boundaryY) + "px" : container.style.height;
                            image.style.width = ((this.width - boundaryY) >= this.handleSize) ? (this.width - boundaryY) + "px" : image.style.width;
                            image.style.height = ((this.width - boundaryY) >= this.handleSize) ? (this.width - boundaryY) + "px" : image.style.height;
                        }
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
                            container.style.width = (boundaryX <= (this.width - this.handleSize)) ? (this.width - boundaryX) + "px" : container.style.width;
                            //container.style.height = (boundaryX <= (this.width - this.handleSize)) ? (this.height - boundaryX) + " px" : container.style.height;
                            container.style.height = (boundaryX <= (this.width - this.handleSize)) ? (this.height - boundaryX) + "px" : container.style.height;
                            container.style.top = (boundaryX <= (this.width - this.handleSize)) ? (this.height - (this.height - boundaryX)) + "px" : container.style.top;
                            console.log(container.style.top);
                            image.style.width = (boundaryX <= (this.width - this.handleSize)) ? (this.width - boundaryX) + "px" : image.style.width;
                            image.style.height = (boundaryX <= (this.width - this.handleSize)) ? (this.height - boundaryX) + "px" : image.style.height;
                            
                            if(boundaryX <= (this.width)) {
                                /*
                                console.log("Keep minimizing: " + boundaryX);
                                container.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width;
                                container.style.height = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width;
                                // Algorithm: The push from the top needs to be whatever is removed from the width needs to be added to the top as long as it does not exceed the top
                                container.style.top = (changeX >= this.handleSize) ? (this.height - changeX) + "px" : container.style.top;
                                console.log(this.height - changeX);
                                image.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : image.style.width;
                                image.style.height = (changeX >= this.handleSize) ? (changeX) + "px" : image.style.height;
                                */
                            }
                            else
                            {
                                console.log("Stop minimizing");                                
                            }
                            //console.log(boundaryX);
                            //container.style.width = (boundaryX >= (this.handleSize * 2)) ? (changeX) + "px" : container.style.width;
                            /*
                            container.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width;
                            container.style.height = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width;
                            // Algorithm: The push from the top needs to be whatever is removed from the width needs to be added to the top as long as it does not exceed the top
                            container.style.top = (changeX >= this.handleSize) ? (this.height - changeX) + "px" : container.style.top;
                            container.style.top = (changeX >= this.handleSize) ? console.log(boundaryX) : console.log("Stopped");
                            image.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : image.style.width;
                            image.style.height = (changeX >= this.handleSize) ? (changeX) + "px" : image.style.height;
                        // Algorithm is wrong, it needs to shrink from the top right but maintain position at bottom left
                            */          
                    }
                    else
                    {
                        /*
                        container.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width;
                        container.style.height = this.height + "px";
                        image.style.width = (changeX >= this.handleSize) ? (changeX) + "px" : container.style.width; 
                        image.style.height = this.height + "px";
                        */
                    }
                break;
            }