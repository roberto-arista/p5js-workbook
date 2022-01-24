let canvas;
let slider;
let horSelect;
let verSelect;

let shapeFunc;
let char = 'a';
let bodySize = 20;
let verticalAlignment;
let horizontalAlignment;

let alignmentsMap;

function preload() {
    cursorFont = loadFont('../../static/fonts/IBMPlexMono-Regular.ttf');
}

function setup() {
    canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');

    verticalAlignment = BASELINE;
    horizontalAlignment = LEFT;

    const selectsLabel = createElement('label', 'Alignments:');
    selectsLabel.parent('ctrls');
    selectsLabel.attribute('class', 'block ml-0 mr-4 normal-case');

    const selectsContainter = createDiv();
    selectsContainter.parent('ctrls');

    horSelect = createSelect();
    horSelect.changed(horSelectCallback);
    horSelect.attribute('class', 'inline mr-4');
    horSelect.parent(selectsContainter);
    horSelect.option('LEFT');
    horSelect.option('CENTER');
    horSelect.option('RIGHT');

    verSelect = createSelect();
    verSelect.changed(verSelectCallback);
    verSelect.parent(selectsContainter);
    verSelect.attribute('class', 'inline');
    verSelect.option('TOP');
    verSelect.option('CENTER');
    verSelect.option('BASELINE');
    verSelect.option('BOTTOM');

    alignmentsMap = {
        'LEFT': LEFT,
        'CENTER': CENTER,
        'RIGHT': RIGHT,
        'TOP': TOP,
        'BASELINE': BASELINE,
        'BOTTOM': BOTTOM,
    };

    const sliderLabel = createElement('label', 'Bodysize:');
    sliderLabel.parent('ctrls');
    sliderLabel.attribute('class', 'block ml-0 mr-4 mt-4 normal-case');

    slider = createSlider(4, 100, bodySize);
    slider.parent('ctrls');
    slider.changed(sliderCallback);
}

function draw() {
    fill('rgba(0, 0, 0, .2)');
    textFont(cursorFont);
    textSize(bodySize);
    textAlign(horizontalAlignment, verticalAlignment);
    text(char, mouseX, mouseY);
}

function mouseClicked() {
    background(255);
}

function keyTyped() {
  char = key;
}

function sliderCallback() {
    bodySize = slider.value();
}

function horSelectCallback() {
    horizontalAlignment = alignmentsMap[horSelect.value()];
}
function verSelectCallback() {
    verticalAlignment = alignmentsMap[verSelect.value()];
}
