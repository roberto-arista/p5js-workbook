let canvas;

const dotDiam = 60;

let topLft;
let topRgt;
let btmLft;
let btmRgt;

let pickerTopLft;
let pickerTopRgt;
let pickerBtmLft;
let pickerBtmRgt;

let areEdgesActive = false;

function setup() {
    // here goes the code executed just once
    canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');

    bgClr = color(200);
    background(bgClr);

    noStroke();
    createUI();
}

function createColorPickerWithLabel(hexColor, wrapper, label) {
    let container = createDiv();
    container.parent(wrapper);
    container.attribute('class', 'text-center');

    picker = createColorPicker(color(hexColor));
    picker.parent(container);

    labelP = createP(label);
    labelP.attribute('class', 'font-mono');
    labelP.parent(container);

    return picker;
}

function createUI() {
    uiWrapper = createDiv();
    uiWrapper.parent('sketch-holder');
    uiWrapper.attribute('class', 'flex flex-row justify-between mt-4');

    pickerTopLft = createColorPickerWithLabel('#75edfa', uiWrapper, 'top lft');
    pickerTopRgt = createColorPickerWithLabel('#1629ba', uiWrapper, 'top rgt');
    pickerBtmLft = createColorPickerWithLabel('#b02f38', uiWrapper, 'btm lft');
    pickerBtmRgt = createColorPickerWithLabel('#f4c1e1', uiWrapper, 'btm rgt');
}

function draw() {
    let xFactor = mouseX/width;
    let yFactor = mouseY/height;

    topLft = pickerTopLft.color();
    topRgt = pickerTopRgt.color();
    btmLft = pickerBtmLft.color();
    btmRgt = pickerBtmRgt.color();

    let lftClr = lerpColor(topLft, btmLft, yFactor);
    let rgtClr = lerpColor(topRgt, btmRgt, yFactor);

    pointerClr = lerpColor(lftClr, rgtClr, xFactor);
    fill(pointerClr);
    ellipse(mouseX, mouseY, dotDiam);

    if (areEdgesActive) {
        fill(lerpColor(topLft, topRgt, xFactor));
        ellipse(mouseX, 0, dotDiam);

        fill(rgtClr);
        ellipse(width, mouseY, dotDiam);

        fill(lerpColor(btmLft, btmRgt, xFactor));
        ellipse(mouseX, height, dotDiam);

        fill(lftClr);
        ellipse(0, mouseY, dotDiam);
    }


    fill(topLft);
    ellipse(0, 0, dotDiam);

    fill(topRgt);
    ellipse(width, 0, dotDiam);

    fill(btmLft);
    ellipse(0, height, dotDiam);

    fill(btmRgt);
    ellipse(width, height, dotDiam);
}

function keyTyped() {
    if (key === 'i') {
        areEdgesActive = !areEdgesActive;
    } else if (key === ' ') {
        background(bgClr);
    }
}
