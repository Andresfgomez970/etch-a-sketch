DEFAULT_STATE = 0;
RAINBOW_STATE = 1;
GREY_STATE = 2;

color_state = 0;
jamboardState = 0;
clickState = 0;
permanentState = 0;
eraserState = 0;
greyState = 0;

function updateJamboardState(){
    jamboardState = !jamboardState;
}

function updateClickState(){
    clickState = !clickState;
}

function updatePermanentState(){
    permanentState = !permanentState;
}

function updateEraserState(){
    eraserState = !eraserState;
}


// Indert just after the element of interest
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function hoverEffect(event, time=500, color="orange"){
    
    if (time < Infinity){
        // Get actual color before transition
        if (!event.target.classList.toString().includes("transition")){
            if (event.target.style["background-color"] == ""){
                event.target.setAttribute("color-before", "white");
            }
            else{
                event.target.setAttribute("color-before", String(event.target.style["background-color"]));
            }
            event.target.style["background-color"] = color;
            event.target.classList.add("transition");
        }

        // Do transition and go to original color
        if (event.target.classList.toString().includes("transition")){
            setTimeout(function() {
                event.target.style["background-color"] = event.target.getAttribute("color-before"); 
                event.target.classList.remove("transition");
            }, time);
        }
    }
    
    else{
        event.target.style["background-color"] = color;
    }


}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function rainbowEffect(event, time=500){
    let min = 0; let max = 259.9999;
    let r = randomIntFromInterval(min, max);
    let g = randomIntFromInterval(min, max);
    let b = randomIntFromInterval(min, max);

    if (time < Infinity){
        // Get actual color before transition
        if (!event.target.classList.toString().includes("transition")){
            if (event.target.style["background-color"] == ""){
                event.target.setAttribute("color-before", "white");
            }
            else{
                event.target.setAttribute("color-before", String(event.target.style["background-color"]));
            }
            event.target.style["background-color"] = "rgb("+r+","+g+","+b+")";
            event.target.classList.add("transition");
        }

        // Do transition and go to original color
        if (event.target.classList.toString().includes("transition")){
            setTimeout(function() {
                event.target.style["background-color"] = event.target.getAttribute("color-before"); 
                event.target.classList.remove("transition");
            }, time);
        }
    }
    
    else{
        event.target.style["background-color"] = "rgb("+r+","+g+","+b+")";
    }

}

function greyEffect(event, time=500){
    let step = 254.99999 * 0.1;
    let result;
    let rgb = "rgb(255, 255, 255)";
    
    if (time < Infinity){
        // Get actual color before transition
        if (!event.target.classList.toString().includes("transition-grey")){
            if (event.target.style["background-color"] == ""){
                event.target.setAttribute("color-before", "rgb("+255+","+255+","+255+")");
                rgb = event.target.getAttribute("color-before"); 
            }
            else{
                event.target.setAttribute("color-before", String(event.target.style["background-color"]));

                if (event.target.getAttribute("color-before").substring(0, 3) != "rgb"){
                    rgb = "rgb("+255+","+255+","+255+")";
                }
            }

            rgb = event.target.getAttribute("color-before").substring(4, rgb.length-1).replace(")", "").replace(/ /g, '').split(',');

            if (rgb[0] == rgb[1] && rgb[1] == rgb[2]){
                result = +rgb[0] - step;
            }
            else{
                result = 255 - step;
            }

            event.target.style["background-color"] = "rgb("+result+","+result+","+result+")";
            event.target.setAttribute("color-grey", String(event.target.style["background-color"]));
            event.target.classList.add("transition-grey");
        }

        // Do transition and go to original color
        if (event.target.classList.toString().includes("transition-grey")){

            rgb = event.target.getAttribute("color-grey").substring(4, rgb.length-1).replace(")", "").replace(/ /g, '').split(',');

            if (rgb[0] == rgb[1] && rgb[1] == rgb[2]){
                result = +rgb[0] - step;
            }
            else{
                result = 255 - step;
            }

            event.target.style["background-color"] = "rgb("+result+","+result+","+result+")";
            event.target.setAttribute("color-grey", String(event.target.style["background-color"]));

            setTimeout(function() {
                event.target.style["background-color"] = event.target.getAttribute("color-before"); 
                event.target.classList.remove("transition-grey");
            }, time);
        }
    }
    
    else{
        if (event.target.getAttribute("color-grey") == ""){
            result = 255 - step;
            rgb =  "rgb("+result+","+result+","+result+")";
        }
        else if (event.target.classList.toString().includes("transition-grey")){
            result = 255 - step;
            rgb =  "rgb("+result+","+result+","+result+")";
        }
        else{
            rgb = event.target.getAttribute("color-grey").substring(4, rgb.length-1).replace(")", "").replace(/ /g, '').split(',');

            if (rgb[0] == rgb[1] && rgb[1] == rgb[2]){
                result = +rgb[0] - step;
            }
            else{
                result = 255 - step;
            }

            rgb =  "rgb("+result+","+result+","+result+")";
        }


        event.target.style["background-color"] = rgb;
        event.target.setAttribute("color-grey", String(event.target.style["background-color"]));
    }


}


function changeColor(event){
    
    if (eraserState){
        return hoverEffect(event, Infinity, "white");
    }

    // hover, not permanent
    else if (jamboardState == 0 && permanentState == 0){
        if (color_state == RAINBOW_STATE){
            return rainbowEffect(event);
        }
        else if (color_state == GREY_STATE){
            return greyEffect(event, 5000);
        }
        else{
            return hoverEffect(event);
        }
    }

    // hover, but permanent
    else if (jamboardState == 0 && permanentState){
        if (color_state == RAINBOW_STATE){
            return rainbowEffect(event, Infinity);
        }
        else if (color_state == GREY_STATE){
            return greyEffect(event, Infinity);
        }
        else{
            return hoverEffect(event, Infinity);
        }
    }

    // jamboard, not permanent 
    else if (jamboardState && clickState && permanentState == 0){
        if (color_state == RAINBOW_STATE){
            return rainbowEffect(event);
        }
        else if (color_state == GREY_STATE){
            return greyEffect(event, 5000);
        }
        else{
            return hoverEffect(event);
        }    
    }

    // jamboard, but permanent
    else if (jamboardState && clickState && permanentState){
        if (color_state == RAINBOW_STATE){
            return rainbowEffect(event, Infinity);
        }
        else if (color_state == GREY_STATE){
            return greyEffect(event, Infinity);
        }
        else{
            return hoverEffect(event, Infinity);
        }
    }


}

function createGridElements(numberOfElements=16){
    // create content element
    header = document.querySelector(".header");
    content = document.createElement("div");
    content.classList.add("content");
    insertAfter(header, content);

    // Add buttons functions (click mode, rainbow, grey mode, eraser, clean)
    buttons = document.createElement("div");
    buttons.classList.add("buttons");
    content.append(buttons);

    title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = "Play with it"
    buttons.append(title);    

    names = ["Jamboard mode", "Rainbow mode", "Grey mode", "Permanent pen", "Eraser", "Clean", "Reset pad and choose grid size"]
    for (let i = 0; i < names.length; i++){
        button = document.createElement("button");
        button.textContent = names[i];
        button.classList.add(names[i].replace(/ /g, "-"));
        buttons.append(button);
    }

    names = [".Jamboard-mode", ".Rainbow-mode", ".Grey-mode", ".Permanent-pen", ".Eraser", ".Clean"]
    jamboardModeButton = document.querySelector(names[0]);
    jamboardModeButton.addEventListener("click", activateJamboardMode)
    activateJamboardMode.buttonState = 0;

    rainbowModeButton = document.querySelector(names[1]);
    rainbowModeButton.addEventListener("click", activateRainbowMode);    
    activateRainbowMode.buttonState = 0;

    greyModeButton = document.querySelector(names[2]);
    greyModeButton.addEventListener("click", activateGreyMode);    
    activateGreyMode.buttonState = 0;

    permanentModeButton = document.querySelector(names[3]);
    permanentModeButton.addEventListener("click", activatePermanentMode);    
    activatePermanentMode.buttonState = 0;

    eraserModeButton = document.querySelector(names[4]);
    eraserModeButton.addEventListener("click", activateEraserMode);    
    activateEraserMode.buttonState = 0;

    cleanModeButton = document.querySelector(names[5]);
    cleanModeButton.addEventListener("click", activateCleanMode);    
    activateCleanMode.buttonState = 0;

    color_state = 0;
    jamboardState = 0;
    clickState = 0;
    permanentState = 0;
    eraserState = 0;
    greyState = 0;

    // create and add principal container of the pad grid, just after the header
    pad = document.createElement("div");
    pad.classList.add("pad");
    content.append(pad);

    min_width = 700 / numberOfElements;
    pad = document.querySelector(".pad");
    for (let i = 0; i < numberOfElements; i++){
        pad_line = document.createElement("div");
        pad_line.classList.add("pad-line");
        pad.append(pad_line);
        for (let j = 0; j < numberOfElements; j++){
            pad_element = document.createElement("div");
            pad_element.classList.add("pad-element");
            pad_element.style["min-width"] = min_width + "px"; 
            pad_element.style["min-height"] = min_width + "px";
            pad_element.setAttribute("color-before", "");
            pad_element.setAttribute("color-grey", "");
            pad_line.append(pad_element);
        }
    }

    // Listener to change color
    pad_elements = document.querySelectorAll(".pad-element");
    pad_elements.forEach(element => {
        element.addEventListener("mouseover", changeColor, false);
    });
}


// create all the elements inside the path with the input of the user 
numberPerSide = 10;
createGridElements(numberPerSide)


// listen to mouse movement just after creating new blank pad

// add button to reset grid
resetButton = document.querySelector(".Reset-pad-and-choose-grid-size");

// listener of the reset button to choose the number
resetButton.addEventListener("click", function (){
    let numberPerSide = prompt("Enter the number of square per side that you desire between 1 and 100");
    
    while(numberPerSide < 1  || numberPerSide > 100){
        numberPerSide = prompt("Enter a valid option: a number between 1 and 100");
    }
    
    pad = document.querySelector(".content"); 
    content.remove();
    createGridElements(numberPerSide);
});


// add listener to jamboard mode
names = [".Jamboard-mode", ".Rainbow-mode", ".Grey-mode", ".Permanent-pen", ".Eraser", ".Clean"]
jamboardModeButton = document.querySelector(names[0]);

function activateJamboardMode(){
    activateJamboardMode.buttonState = ~activateJamboardMode.buttonState;
    updateJamboardState();

    if (activateJamboardMode.buttonState){
        jamboardModeButton.classList.add("pressed-button");

        html_elements = document.querySelectorAll("html");
        
        html_elements.forEach(element => {
            // add new listaners
            element.addEventListener("mousedown", updateClickState);
            element.addEventListener("mouseup", updateClickState);
        });
    }

    else{
        jamboardModeButton.classList.remove("pressed-button");
    }

}

// add listener to rainbow mode
rainbowModeButton = document.querySelector(names[1]);

function activateRainbowMode(){
    activateRainbowMode.buttonState = ~activateRainbowMode.buttonState;

    if (activateRainbowMode.buttonState){
        if (activateGreyMode.buttonState){
            activateGreyMode();
        }

        color_state = RAINBOW_STATE;
        rainbowModeButton.classList.add("pressed-button");
    }
    else{
        color_state = DEFAULT_STATE;
        rainbowModeButton.classList.remove("pressed-button");
    }
}


greyModeButton = document.querySelector(names[2]);

function activateGreyMode(){
    activateGreyMode.buttonState = ~activateGreyMode.buttonState;

    if (activateGreyMode.buttonState){
        if (activateRainbowMode.buttonState){
            activateRainbowMode();
        }

        color_state= GREY_STATE;
        greyModeButton.classList.add("pressed-button");
    }
    else{
        color_state = DEFAULT_STATE;
        greyModeButton.classList.remove("pressed-button");
    }
}


permanentModeButton = document.querySelector(names[3]);

function activatePermanentMode(){
    activatePermanentMode.buttonState = ~activatePermanentMode.buttonState;
    updatePermanentState();

    if (activatePermanentMode.buttonState){
        permanentModeButton.classList.add("pressed-button");
    }
    else{
        permanentModeButton.classList.remove("pressed-button");
    }
}

eraserModeButton = document.querySelector(names[4]);

function activateEraserMode(){
    activateEraserMode.buttonState = ~activateEraserMode.buttonState;
    updateEraserState();

    if (activateEraserMode.buttonState){
        eraserModeButton.classList.add("pressed-button");
    }
    else{
        eraserModeButton.classList.remove("pressed-button");
    }
}


cleanModeButton = document.querySelector(names[5]);

function activateCleanMode(){
    activateCleanMode.buttonState = ~activateCleanMode.buttonState;

    pad = document.querySelector(".content"); 
    content.remove();
    createGridElements(numberPerSide);
    
    if (activateCleanMode.buttonState){
        cleanModeButton.classList.add("pressed-button");
    }
    else{
        cleanModeButton.classList.remove("pressed-button");
    }
}





