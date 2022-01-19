let cnv;
const radius = 8;
let func;

function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');
    func = ellipse;
    stroke(0);
    ellipseMode(CENTER);
    rectMode(CENTER);
    background(200);
}

function draw() {
    func(mouseX, mouseY, radius*2, radius*2);
    func(width-mouseX, mouseY, radius*2, radius*2);
    func(mouseX, height-mouseY, radius*2, radius*2);
    func(width-mouseX, height-mouseY, radius*2, radius*2);
}

function mouseClicked() {
    if (func === rect) {
        func = ellipse;
    } else {
        func = rect;
    }
}

function keyTyped() {
  if (key === ' ') {
    background(200);
  } else if (key === 's') {
    save('kaleidoscope.png');
  }
}