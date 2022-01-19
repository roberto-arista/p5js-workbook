let cnv;
let angle = 0;
let increment = 1;
let isMoving = true;

function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');

    motionButton = createButton('stop!');
    motionButton.parent('ctrls');
    motionButton.attribute('class', 'py-3 px-4 mb-4');
    motionButton.mousePressed(motionButtonCallback);

    invertButton = createButton('invert!');
    invertButton.parent('ctrls');
    invertButton.attribute('class', 'py-3 px-4 mb-4');
    invertButton.mousePressed(invertButtonCallback);
    angleMode(DEGREES);
}

function draw() {
    background(255);

    translate(width/2, height/2);
    rotate(angle);

    line(0, -height*1/4, 0, +height*1/4);
    line(-width*1/4, 0, +width*1/4, 0);

    angle += increment;
}

function invertButtonCallback() {
    increment *= -1;
}

function motionButtonCallback() {
    if (isMoving) {
        noLoop();
        motionButton.html('resume!');
    } else {
        loop();
        motionButton.html('stop!');
    }
    isMoving = !isMoving;
}