let cnv;
let button;

let side = 250;
let shapeFunc;

function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');

    button = createButton('swap!');
    button.parent('ctrls');
    button.attribute('class', 'py-3 px-4 mb-4');
    button.mousePressed(buttonCallback);

    shapeFunc = rect;
}

function draw() {
    background(255);
    fill(0);
    noStroke();
    rectMode(CENTER);

    shapeFunc(width/2, height/2, side, side);
    noLoop();
}

function buttonCallback() {
    if (shapeFunc === rect) {
        shapeFunc = ellipse;
    } else {
        shapeFunc = rect;
    }
    redraw(1);
}