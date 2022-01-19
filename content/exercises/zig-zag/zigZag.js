let cnv;
let slider;

function setup() {
    // here goes the code executed just once
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');

    slider = createSlider(1, width, 50);
    slider.parent('sketch-holder');
    slider.attribute('class', 'w-full mt-4');

    stroke(0);
    strokeWeight(2);
}

function draw() {
    background(255);
    let val = slider.value();
    for (let xx = 0; xx <= width; xx += val) {
        if (xx/val % 2 == 0) {
            line(xx, 0, xx+val, height);
        } else {
            line(xx, height, xx+val, 0);
        }
    }
}