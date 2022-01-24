let canvas;
const margin = 40;
const bigDotRadius = 10;
const smallDotRadius = 3;
const grid = 15;

function createOrbit(distance, angle, radius) {
    xx = cos(angle) * distance;
    yy = sin(angle) * distance;
    ellipse(xx, yy, radius*2, radius*2);
}

function setup() {
    canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    angleMode(DEGREES);
}

function draw() {
    background(255);

    const step = (width-margin*2) / grid;
    translate(margin + step/2, margin + step/2);
    for (let jj=0; jj < grid; jj++) {
        push();
        for (let ii=0; ii < grid; ii++) {
            stroke(0);
            strokeWeight(1);
            noFill();

            push();
            translate(cos(frameCount+(ii+jj)*12)*4, sin(frameCount+(ii+jj)*12)*4);
            ellipse(0, 0, bigDotRadius*2, bigDotRadius*2);

            noStroke();
            fill(255, 0, 0);
            createOrbit(bigDotRadius, (frameCount+ii*8+jj*8)*1.6, smallDotRadius);

            fill(0, 0, 255);
            createOrbit(bigDotRadius, (frameCount+ii*4+jj*4)*2, smallDotRadius);

            fill(0, 255, 0);
            createOrbit(bigDotRadius, (frameCount+ii*6+jj*6)*1.2, smallDotRadius);

            pop();

            translate(step, 0);
        }
        pop();
        translate(0, step);
    }
}