let cnv;
let xx, yy;
let captionFont;

let step = 50;
let showCoordinates = true;

function preload() {
    captionFont = loadFont('../../static/fonts/IBMPlexMono-Regular.ttf');
}

function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');

    checkbox = createCheckbox('show coordinates', showCoordinates);
    checkbox.parent('ctrls');
    checkbox.changed(checkboxCallback);

    stepInput = createInput(step);
    stepInput.parent('ctrls');
    stepInput.attribute('class', 'border border-black py-3 px-3 mt-2 rounded');
    stepInput.attribute('type', 'number');
    stepInput.attribute('name', 'step');
    stepInput.attribute('min', '1');
    stepInput.attribute('max', '100');
    stepInput.input(stepInputCallback);

    noLoop();
}

function draw() {
    background(255);
    textFont(captionFont);

    for (let yy = step; yy < height; yy += step) {
        for (let xx = step; xx < width; xx += step) {
            point(xx, yy);
            if (showCoordinates && xx/step % 2 === 0 && yy/step % 2 === 0) {
                text(`x${xx}\ny${yy}`, xx+5, yy-2);
            }
        }
    }
}

function checkboxCallback() {
    showCoordinates = checkbox.checked();
    redraw(1);
}

function stepInputCallback() {
    step = parseInt(stepInput.value());
    redraw(1);
}