let canvas;

let ellipseR = 100;

function setup() {
    canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');

    // diagonals
    line(0, 0, width, height);
    line(0, height, width, 0);

    // corners
    ellipse(0, 0, ellipseR*2);
    ellipse(width, 0, ellipseR*2);
    ellipse(width, height, ellipseR*2);
    ellipse(0, height, ellipseR*2);

    // lozange
    line(0, height/2, width/2, height);
    line(width/2, height, width, height/2);
    line(width, height/2, width/2, 0);
    line(width/2, 0, 0, height/2);

    // center
    rectMode(CENTER);
    rect(width/2, height/2, width*.3, height*.3);
    rect(width/2, height/2, width*.1, height*.1);
}