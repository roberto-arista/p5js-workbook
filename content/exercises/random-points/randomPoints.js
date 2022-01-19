let cnv;
let pointsInput;
let button;
let points;

let pointsAmount = 400;

let RED;
let BLUE;

function calcMean(values) {
  let sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

function hollow(clr) {
    stroke(clr);
    noFill();
}

function solid(clr) {
    noStroke();
    fill(clr);
}

function generateRandomPoints(amount, scale) {
    points = [];
    for (let ii = 0; ii < amount; ii++) {
        points.push([scale*Math.random(), scale*Math.random()]);
    }
    return points;
}

function createNumberInput(value, parentID, minValue, maxValue, callback, utilityClasses='') {
    let numberInput = createInput(value);
    numberInput.parent(parentID);
    numberInput.attribute('class', utilityClasses);
    numberInput.attribute('type', 'number');
    numberInput.attribute('name', 'step');
    numberInput.attribute('min', minValue);
    numberInput.attribute('max', maxValue);
    numberInput.input(callback);
    return numberInput;
}

function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');

    const inputUtilityClasses = 'border border-black py-3 px-3 mt-2 mr-2 rounded';
    pointsInput = createNumberInput(pointsAmount, 'ctrls', 20, 1000,
                                    pointsInputCallback, inputUtilityClasses);

    button = createButton('Refresh');
    button.parent('ctrls');
    button.attribute('class', 'py-3 px-4 mt-4');
    button.mousePressed(buttonCallback);

    points = generateRandomPoints(pointsAmount, width);

    RED = color(255, 0, 0);
    BLUE = color(0, 0, 255);

    noLoop();
}

function drawMeans(points) {
    const abscissas = points.map(pt => pt[0]);
    xMean = calcMean(abscissas);
    hollow(RED);
    line(xMean, 0, xMean, height);
    solid(RED);
    text(xMean.toFixed(2), xMean + 5, 50);

    const quotas = points.map(pt => pt[1]);
    yMean = calcMean(quotas);
    hollow(BLUE);
    line(0, yMean, width, yMean);
    solid(BLUE);
    text(yMean.toFixed(2), 50, yMean - 5);
}

function draw() {
    background(255);
    stroke(0);
    for (let pt of points) {
        [xx, yy] = pt;
        point(xx, yy);
    }
    drawMeans(points);
}

function pointsInputCallback() {
    pointsAmount = parseInt(pointsInput.value());
    points = generateRandomPoints(pointsAmount, width);
    redraw(1);
}

function buttonCallback() {
    points = generateRandomPoints(pointsAmount, width);
    redraw(1);
}