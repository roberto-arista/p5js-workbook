let cnv;
let shapeFunc;
let slider;

let side = 20;

function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');

    sliderLabel = createElement('label', 'Shape Size:');
    sliderLabel.parent('ctrls');
    sliderLabel.attribute('class', 'block ml-0 mr-4 normal-case');

    slider = createSlider(0, 100, side);
    slider.parent('ctrls');
    slider.changed(sliderCallback);

    shapeFunc = rect;
    rectMode(CENTER);
}

function draw() {
    shapeFunc(mouseX, mouseY, side);
}

function mouseClicked() {
    if (shapeFunc === rect) {
        shapeFunc = ellipse;
    } else {
        shapeFunc = rect;
    }
}

function keyPressed() {
  if (key === ' ') {
    background(255);
  }
}

function sliderCallback() {
    side = slider.value();
}