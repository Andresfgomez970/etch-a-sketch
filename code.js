DEFAULT_STATE = 0;
RAINBOW_STATE = 1;
GREY_STATE = 2;

color_state = 0;
jamboardState = 0;
clickState = 0;
permanentState = 0;

function updateJamboardState(){
    jamboardState = !jamboardState;
}

function updateClickState(){
    clickState = !clickState;
}

function updatePermanentState(){
    permanentState = !permanentState;
}

// Indert just after the element of interest
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function hoverEffect(event, time=500){
    if (time < Infinity && ~event.target.classList.toString().includes("hover-effect") ){
        event.target.style["background-color"] = "orange";
        
        // event.target.classList.add("hover-effect");
    }

    if (time < Infinity){
        setTimeout(function() {
            event.target.classList.remove("hover-effect"); 
        }, time);
    } 
    else{
        event.target.classList.add("permanent-effect");
    }

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function rainbowEffect(event){
    let min = 0; let max = 259.9999;
    let r = randomIntFromInterval(min, max);
    let g = randomIntFromInterval(min, max);
    let b = randomIntFromInterval(min, max);


    // if (event.target.style["background-color"] == ""){
    //     if (event.target.classList.toString().includes("permanent-effect")){
    //         color_before = "orange";
    //     }
    //     else{
    //         color_before = "white";
    //     }
    // }

    // console.log(event.target.style["background-color"]);
    // if (time < Infinity && ~event.target.classList.toString().includes("hover-effect") ){
    //     event.target.classList.add("hover-effect");
    // }

    // if (time < Infinity){
    //     setTimeout(function() {
    //         event.target.classList.remove("hover-effect"); 
    //     }, time);
    // } 
    // else{
    //     event.target.classList.add("permanent-effect");
    // }


    event.target.style["background-color"] = "rgb("+r+","+g+","+b+")";
    setTimeout(function() {
        event.target.style["background-color"]  = color_before;
    }, 500);


}



function changeColor(event){
    
    // default hover writing
    if (jamboardState == 0 && permanentState == 0){
        if (color_state == RAINBOW_STATE){
            return rainbowEffect(event);
        }
        else{
            return hoverEffect(event);
        }
    }

    // default hover writing, but permanent
    else if (jamboardState == 0 && permanentState){
        if (color_state == RAINBOW_STATE){
            return rainbowEffect(event);
        }
        else{
            return hoverEffect(event, Infinity);
        }
    }

    // default jamboard writing but not permanent 
    else if (color_state == DEFAULT_STATE && jamboardState && clickState && permanentState == 0){
        return hoverEffect(event);
    }

    // jamboard writing, but permanent
    else if (color_state == DEFAULT_STATE && jamboardState && clickState && permanentState){
        return hoverEffect(event, Infinity);
    }


    // else if (color_state == RAINBOW_STATE && jamboardState && clickState){
    //     return rainbowEffect(event);
    // }


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

    names = ["Jamboard mode", "Rainbow mode", "Grey mode", "Permanent pen", "Eraser", "Clean"]
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

    permanentModeButton = document.querySelector(names[3]);
    permanentModeButton.addEventListener("click", activatePermanentMode);    
    activatePermanentMode.buttonState = 0;

    color_state = 0;
    jamboardState = 0;
    clickState = 0;
    permanentState = 0;

    // create and add principal container of the pad grid, just after the header
    pad = document.createElement("div");
    pad.classList.add("pad");
    content.append(pad);

    min_width = 960/ numberOfElements;
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
createGridElements(10)


// listen to mouse movement just after creating new blank pad

// add button to reset grid
resetButton = document.querySelector(".header button");

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

        pad_elements = document.querySelectorAll(".pad-element");
        pad_elements.forEach(element => {
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
        color_state = RAINBOW_STATE;
        rainbowModeButton.classList.add("pressed-button");
    }
    else{
        color_state = DEFAULT_STATE;
        rainbowModeButton.classList.remove("pressed-button");
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


