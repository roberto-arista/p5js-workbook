let canvas;
let captionFont;

const WHITE = '#ffffff';
const BLACK = '#000000';
const RED = '#ff0000';

const faceRadius = 200;
const CIRCLE_ANGLE = 360;
const MINUTES = 60;
const HOURS = 12;

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function shapeQualities(clr) {
    fill(clr);
    noStroke();
}

function lineQualities(clr, thickness) {
    stroke(clr);
    strokeWeight(thickness);
    noFill();
}

function face() {
    shapeQualities(WHITE);
    ellipse(0, 0, faceRadius*2);

    for (let angle = 0; angle < CIRCLE_ANGLE; angle += CIRCLE_ANGLE/MINUTES) {
        push();
        rotate(radians(angle));

        let tickLen;
        if (angle % (CIRCLE_ANGLE/HOURS) == 0) {
            lineQualities(BLACK, 12);
            tickLen = 35;
        } else {
            lineQualities(BLACK, 3);
            tickLen = 12;
        }
        line(faceRadius, 0, faceRadius-tickLen, 0);
        pop();
    }
    ellipse();
}

function typeQualities(bodySize) {
    shapeQualities(BLACK);
    textFont(captionFont);
    textSize(bodySize);
}

function date() {
    let today = new Date();
    let weekday = WEEKDAYS[today.getDay()];
    let dateX = faceRadius*0.7;
    let dateBodySize = 21;

    typeQualities(dateBodySize);
    let spaceLen = textWidth(' ');
    let weekdayLen = textWidth(` ${weekday}`);
    let dayLen = textWidth(` ${day()}`);

    lineQualities(BLACK, 1);
    rect(dateX+spaceLen/2, -dateBodySize/2, -dayLen, 24);
    rect(dateX-dayLen+spaceLen/2, -dateBodySize/2, -weekdayLen, 24);

    textAlign(RIGHT);
    typeQualities(dateBodySize);
    text(`${weekday} ${day()}`, dateX, 9);
}

function hands() {
    // hour
    push();
    rotate(radians(-90+CIRCLE_ANGLE/HOURS*hour()));
    lineQualities(BLACK, 18);
    line(-faceRadius*0.2, 0, faceRadius*0.7, 0);
    pop();

    // minutes
    push();
    rotate(radians(-90+CIRCLE_ANGLE/MINUTES*minute()));
    lineQualities(BLACK, 8);
    line(-faceRadius*0.15, 0, faceRadius*0.9, 0);
    pop();

    // seconds
    push();
    shapeQualities(RED);
    ellipse(0, 0, 16);

    rotate(radians(-90+CIRCLE_ANGLE/MINUTES*second()));
    lineQualities(RED, 3);
    line(-faceRadius*0.2, 0, faceRadius*0.75, 0);

    shapeQualities(RED);
    ellipse(faceRadius*0.75, 0, 24);

    pop();
}

function preload() {
  captionFont = loadFont('../../static/fonts/IBMPlexMono-Regular.ttf');
}

function setup() {
    // here goes the code executed just once
    canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    background(200);
    strokeCap(SQUARE);
}

function draw() {
    translate(width/2, height/2);
    face();
    date();
    hands();
}