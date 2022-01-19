function setup() {
    // here goes the code executed just once
    let cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');
    background(200);
    noStroke();
}

function draw() {
    let xFactor = mouseX/width;
    let yFactor = mouseY/height;

    // here goes the code continously executed
    rectMode(CENTER);
    fill(255*yFactor);
    rect(width/2, height/2, width, height);

    fill(255-255*xFactor);
    rect(width/2, height/2, width*0.75, height*0.75);

    fill(255*yFactor);
    rect(width/2, height/2, width*0.5, height*0.5);

    fill(255-255*xFactor);
    rect(width/2, height/2, width*0.25, height*0.25);
}