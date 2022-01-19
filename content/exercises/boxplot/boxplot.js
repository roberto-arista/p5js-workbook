let cnv;
let table;
let captionFont;

let variableSelect;
let whichVariable;

let leftSelect;
let leftStyle;

let rightSelect;
let rightStyle;

const textOffset = 4;

let STYLES_MAP = {
  'Regular': ['Regular', 'Book', 'Normal', 'Text'],
  'Bold': ['Bold'],
};

const yMargin = 50;

const BLACK = 'rgba(0, 0, 0, 1)';
const RED = 'rgba(255, 0, 0, 1)';
const BLUE = 'rgba(0, 0, 255, 1)';
const DOTS = 'rgba(0, 0, 0, .2)';

function calcMean(values) {
  let sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

function calcQuantile(values, ratio) {
  values.sort();
  const floatIndex = (values.length-1)*ratio;
  const high = Math.ceil(floatIndex);
  const low = Math.floor(floatIndex);
  const decimals = floatIndex % 1;
  return lerp(values[low], values[high], decimals);
}

function hollow(clr, thickness=1) {
  noFill();
  stroke(clr);
  strokeWeight(thickness);
}

function solid(clr) {
  noStroke();
  fill(clr);
}

function getFactor(aa, bb, innerValue) {
  return (innerValue-aa)/(bb-aa);
}

function drawCaption(value, clr, alignment, refPoint) {
  [xxCap, yyCap] = refPoint;
  solid(clr);
  textFont(captionFont);
  textAlign(alignment, CENTER);
  text(value.toFixed(2), xxCap, yyCap);
}

function calcAbsPosition(value, extremes, refQuota, hgt) {
  let minVal = extremes[0];
  let maxVal = extremes[1];
  factor = getFactor(minVal, maxVal, value);
  quota = (refQuota + hgt) - factor * hgt;
  return quota;
}

function drawBoxPlot(values, bbox, extremes) {
  let minRef = extremes[0];
  let maxRef = extremes[1];

  let factor;
  [xx, yy, wdt, hgt] = bbox;

  for (let val of values) {
    let quota = calcAbsPosition(val, [minRef, maxRef], yy, hgt);
    solid(DOTS);
    ellipse(xx + wdt/2, quota, 8, 8);
  }

  // statistics
  // mean
  let mean = calcMean(values);
  let meanQuota = calcAbsPosition(mean, [minRef, maxRef], yy, hgt);
  hollow(RED);
  line(xx, meanQuota, xx+wdt, meanQuota);
  drawCaption(mean, RED, RIGHT, [xx-textOffset, meanQuota]);

  // median
  let median = calcQuantile(values, 0.5);
  let medianQuota = calcAbsPosition(median, [minRef, maxRef], yy, hgt);
  hollow(BLACK);
  line(xx, medianQuota, xx+wdt, medianQuota);
  drawCaption(median, BLACK, LEFT, [xx+wdt+textOffset, medianQuota]);

  // quartile box
  // low
  let lowQuartile = calcQuantile(values, 0.25);
  let lowQuartileQuota = calcAbsPosition(lowQuartile, [minRef, maxRef], yy, hgt);
  drawCaption(lowQuartile, BLACK, LEFT, [xx+wdt+textOffset, lowQuartileQuota]);

  // high
  let highQuartile = calcQuantile(values, 0.75);
  let highQuartileQuota = calcAbsPosition(highQuartile, [minRef, maxRef], yy, hgt);
  drawCaption(highQuartile, BLACK, LEFT, [xx+wdt+textOffset, highQuartileQuota]);

  hollow(BLACK);
  rect(xx, lowQuartileQuota, wdt, highQuartileQuota-lowQuartileQuota);

  // whiskers
  hollow(BLACK);
  maxVal = Math.max(...values);
  let maxValQuota = calcAbsPosition(maxVal, [minRef, maxRef], yy, hgt);
  line(xx, maxValQuota, xx+wdt, maxValQuota);
  drawCaption(maxVal, BLACK, LEFT, [xx+wdt+textOffset, maxValQuota]);

  hollow(BLACK);
  minVal = Math.min(...values);
  let minValQuota = calcAbsPosition(minVal, [minRef, maxRef], yy, hgt);
  line(xx, minValQuota, xx+wdt, minValQuota);
  drawCaption(minVal, BLACK, LEFT, [xx+wdt+textOffset, minValQuota]);
}

function extractDataFromTable(variableName, groupName) {
  let values = [];
  for (let eachRow of table.rows) {
    if (STYLES_MAP[groupName].includes(eachRow.get('StyleName'))) {
      values.push(+eachRow.get(variableName));
    }
  }
  return values;
}

function createGraphSelect(labelTxt, options, callback) {
  let container = createDiv();
  container.parent('ctrls');

  // <select></select> <label></label>     this is for purgeCSS
  let label = createElement('label', labelTxt);
  label.parent(container);

  sel = createSelect();
  sel.changed(callback);
  sel.parent(container);

  for (let kk of options) {
    sel.option(kk);
  }

  return sel;
}

function preload() {
  table = loadTable('typemetrics.tsv', 'tsv', 'header');
  captionFont = loadFont('../../static/fonts/IBMPlexMono-Regular.ttf');
}

function setup() {
  // <canvas></canvas>      this is for purgeCSS
  cnv = createCanvas(600, 600);
  cnv.parent('sketch-holder');

  // ctrls
  header = table.columns;
  let variableNames = header.filter(name => name != 'FamilyName' && name != 'StyleName');
  variableSelect = createGraphSelect('variable', variableNames, variableSelectCallback);
  whichVariable = variableSelect.value();

  leftSelect = createGraphSelect('left', ['Regular', 'Bold'], leftSelectCallback);
  leftStyle = leftSelect.value();

  rightSelect = createGraphSelect('right', ['Regular', 'Bold'], rightSelectCallback);
  rightStyle = rightSelect.value();
}

function draw() {
  background(255);

  let bbox;
  let graphWdt = 30;
  let graphHgt = height - yMargin*2;

  let leftValues = extractDataFromTable(whichVariable, leftStyle);
  let rightValues = extractDataFromTable(whichVariable, rightStyle);
  let merged = leftValues.concat(rightValues);
  let extremes = [Math.min(...merged), Math.max(...merged)];

  bbox = [width/3 - graphWdt/2, yMargin, graphWdt, graphHgt];
  drawBoxPlot(leftValues, bbox, extremes);

  bbox = [width/3*2 - graphWdt/2, yMargin, graphWdt, graphHgt];
  drawBoxPlot(rightValues, bbox, extremes);

  noLoop();
}

// callbacks
function variableSelectCallback() {
  whichVariable = variableSelect.value();
  redraw(1);
}
function leftSelectCallback() {
  leftStyle = leftSelect.value();
  redraw(1);
}
function rightSelectCallback() {
  rightStyle = rightSelect.value();
  redraw(1);
}
