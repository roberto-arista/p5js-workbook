let canvas;
let color1;
let color2;
let bgSwitch = true;

function setup() {
    // here goes the code executed just once
    canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    noStroke();
    background(200);

    color1 = color(255, 0, 0);
    color2 = color(0, 0, 255);
}

function draw() {
    if (bgSwitch) { background(200); }

    pointerColor = lerpColor(color1, color2, mouseX/width);
    fill(pointerColor);
    ellipse(mouseX, mouseY, 20, 20);

    fill(color1);
    rect(0, 0, 20, height);

    fill(color2);
    rect(width, 0, -20, height);
}

function keyTyped() {
    if (key === ' ') {
        bgSwitch = !bgSwitch;
    }
}