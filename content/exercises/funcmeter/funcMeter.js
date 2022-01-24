let canvas;
let captionFont;
let prevQuotas = [];
let curveDetail = 2;
let funcScale = 0.05;

let curveDetailSlider;
let funcScaleSlider;
let funcSelect;

let whichFunction = 'sin';
const possibleFunctions = ['sin', 'cos', 'noise'];

function preload() {
    captionFont = loadFont('../../static/fonts/IBMPlexMono-Regular.ttf');
}

function setup() {
    // here goes the code executed just once
    canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    frameRate(24);
    createUI();
}

function createSliderWithLabel(start, end, value, wrapper, labelTxt) {
    let container = createDiv();
    container.style('margin-top', '4px');
    container.style('display', 'flex');
    container.style('justify-content', 'space-between');
    container.parent(wrapper);

    let label = createElement('label', labelTxt);
    label.attribute('class', 'ml-0 normal-case');
    label.parent(container);

    let slider = createSlider(start, end, value, 0);
    slider.style('width', '120px');
    slider.parent(container);

    return slider;
}

function createSelectWithLabel(options, callback, wrapper, labelTxt) {
    let container = createDiv();
    container.attribute('class', 'mt-4');
    container.parent(wrapper);

    let label = createElement('label', labelTxt);
    label.attribute('class', 'ml-0 normal-case');
    label.parent(container);

    sel = createSelect();
    sel.parent(container);
    sel.attribute('class', 'block mt-1');   // tailwind attribute classes
    for (var ii = 0; ii < possibleFunctions.length; ii++) {
        sel.option(possibleFunctions[ii]);
    }
    sel.changed(callback);
    return sel;
}

function createUI() {
    uiContainer = createDiv();
    uiContainer.parent('sketch-holder');
    uiContainer.attribute('class', 'w-1/2 mt-4');

    funcScaleSlider = createSliderWithLabel(0.01, 0.25, funcScale, uiContainer, 'Function Scale: ');
    curveDetailSlider = createSliderWithLabel(0.5, 20, curveDetail, uiContainer, 'Curve Detail: ');
    funcSelect = createSelectWithLabel(possibleFunctions, funcSelectCallback, uiContainer, 'Select Function: ');
}

function funcSelectCallback() {
    whichFunction = this.value();
}

function draw() {
    curveDetail = curveDetailSlider.value();
    funcScale = funcScaleSlider.value();

    background(200);

    // control line
    stroke(0);
    strokeWeight(1);
    line(0, height/2, width, height/2);

    // equalizer
    noStroke();
    fill(0);

    let factor;
    if (whichFunction === 'sin') {
        factor = map(sin(frameCount*funcScale), -1, 1, -0.5, 0.5);
    } else if (whichFunction == 'cos') {
        factor = map(cos(frameCount*funcScale), -1, 1, -0.5, 0.5);
    } else if (whichFunction == 'noise') {
        factor = map(noise(frameCount*funcScale), 0, 1, -0.5, 0.5);
    } else {
        throw "function unknown!";
    }

    let frameY = height/2 - factor*(height/2);
    prevQuotas.push(frameY);

    // text caption
    textFont(captionFont);
    textSize(14);
    text(`Function: ${whichFunction}()`, width*0.65, height/2 - 100);
    text(`Factor: ${round(factor, 3)}`, width*0.65, height/2 - 80);
    text(`Curve Detail: ${round(curveDetail, 3)}`, width*0.65, height/2 - 60);
    text(`Function Scale: ${round(funcScale, 3)}`, width*0.65, height/2 - 40);

    // drawing the "curve"
    for (let ii = prevQuotas.length - 1; ii >= 0; ii--) {
        prevY = prevQuotas[ii];
        rect(width/2, prevY, curveDetail, height);
        translate(-curveDetail, 0);
    }

    // cleaning array from unuseful values
    if (prevQuotas.length > (width/2) / curveDetail) {
        prevQuotas.shift();
    }
}