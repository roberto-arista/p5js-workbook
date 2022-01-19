let cnv;
const margin = 20;
const elements = 5;

const rectFactor = 0.75;
const circleFactor = 0.4;
const rectRadius = 10;
const circleRadius = 6;

let netWdt;
let netHgt;
let verStep;
let horStep;
let maxIndexesSum;

const distanceInFrames = 64; // frames
const rectPeriod = 100;   // frames
const circlePeriod = 80;   // frames

function setup() {
    // here goes the code executed just once
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');

    // static settings
    ellipseMode(CENTER);
    rectMode(CENTER);
    noStroke();

    // calcs
    netWdt = width - margin*2;
    netHgt = height - margin*2;
    verStep = netHgt/elements;
    horStep = netWdt/elements;
    maxIndexesSum = elements*2 -2;
}

function draw() {
    background(220);
    push(); // 1
    translate(margin, margin);

    for (let jj = 0; jj < elements; jj++) {
        for (let ii = 0; ii < elements; ii++) {
            push(); // 2
            translate((ii+0.5)*horStep, (jj+0.5)*verStep);

            shiftedFrameCount = frameCount+((ii+jj)/maxIndexesSum)*distanceInFrames;

            push(); // 3
            fill(0);
            rectX = cos(shiftedFrameCount/rectPeriod*TWO_PI)*rectRadius;
            rectY = sin(shiftedFrameCount/rectPeriod*TWO_PI)*rectRadius;
            rect(rectX, rectY, horStep*rectFactor, verStep*rectFactor);
            pop(); // 3

            push(); // 4
            fill(220);
            circleX = cos(-shiftedFrameCount/circlePeriod*TWO_PI)*circleRadius;
            circleY = sin(-shiftedFrameCount/circlePeriod*TWO_PI)*circleRadius;
            ellipse(circleX, circleY, horStep*circleFactor, verStep*circleFactor);
            pop(); // 4

            pop(); // 2
        }
    }
    pop(); // 2
}