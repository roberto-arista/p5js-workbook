let canvas;
let slider1;
let slider2;
let slider3;

const overlap = 0;

function setup() {
    // here goes the code executed just once
    canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');

    slider1 = createSliderWithLabel('Top:', 1, 100, 5, 'sketch-holder');
    slider2 = createSliderWithLabel('Middle:', 1, 100, 10, 'sketch-holder');
    slider3 = createSliderWithLabel('Bottom:', 1, 100, 15, 'sketch-holder');
}

function createSliderWithLabel(labelTxt, start, end, value, parentName) {
    let container = createDiv();
    container.attribute('class', 'flex flex-row justify-between w-56 h-12');
    container.parent(parentName);

    label = createElement('label', labelTxt);
    label.attribute('class', 'my-auto normal-case');
    label.parent(container);

    let slider = createSlider(start, end, value);
    slider.parent(container);

    return slider;
}

function draw() {
    background(200);

    step1 = slider1.value();
    for (let xx = 0; xx < width; xx += step1) {
        line(xx, 0, xx, height/3+overlap);
    }

    step2 = slider2.value();
    for (let xx = 0; xx < width; xx += step2) {
        line(xx, height/3-overlap, xx, height/3*2+overlap);
    }

    step3 = slider3.value();
    for (let xx = 0; xx < width; xx += step3) {
        line(xx, height/3*2-overlap, xx, height);
    }

}