let colorOne;
let colorTwo;
let colorPickerOne;
let colorPickerTwo;
let stepsCtrl;

let steps = 20;

function fromRGBtoHEX(clr) {
    [rr, gg, bb, aa] = clr.levels;
    return `#${rr.toString(16).padStart(2, '0')}${gg.toString(16).padStart(2, '0')}${bb.toString(16).padStart(2, '0')}`;
}

function createCustomColorPicker(clr, callback) {
    const hexClr = fromRGBtoHEX(clr);
    const clrPicker = createColorPicker(hexClr);
    clrPicker.attribute('class', 'border border-black');
    clrPicker.input(callback);
    return clrPicker;
}

function createInputNumber(value, parentID, minValue, maxValue, callback) {
    let numImp = createInput(value);
    numImp.parent(parentID);
    numImp.attribute('class', 'border border-black py-3 px-3 mr-2 rounded');
    numImp.attribute('type', 'number');
    numImp.attribute('name', 'step');
    numImp.attribute('min', minValue);
    numImp.attribute('max', maxValue);
    numImp.input(callback);
    return numImp;
}

function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');
    noStroke();

    const container = createDiv();
    container.parent('ctrls');
    container.attribute('class', 'flex flex-row justify-between');

    colorOne = color(255, 0, 0);
    colorPickerOne = createCustomColorPicker(colorOne, pickerCallback);
    colorPickerOne.parent(container);

    colorTwo = color(0, 0, 255);
    colorPickerTwo = createCustomColorPicker(colorTwo, pickerCallback);
    colorPickerTwo.parent(container);

    const label = createElement('label', 'Steps:');
    label.parent('ctrls');
    label.attribute('class', 'block ml-0 mr-4 mt-8 normal-case');
    stepsCtrl = createInputNumber(steps, 'ctrls', 2, 100, stepsCtrlCallback);

    noLoop();
}

function draw() {
    let thisColor;
    stepWdt = width / steps;
    for (let i = 0; i < steps; i++) {
        thisColor = lerpColor(colorPickerOne.color(), colorPickerTwo.color(), i/steps);
        fill(thisColor);
        rect(i*stepWdt, 0, stepWdt, height);
    }
}

function stepsCtrlCallback() {
    steps = parseInt(stepsCtrl.value());
    redraw(1);
}

function pickerCallback() {
    redraw(1);
}