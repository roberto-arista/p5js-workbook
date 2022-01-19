let table;
const header = ['swatch', 'colorName', 'hexCode'];

function preload() {
    table = loadTable('webcolors.tsv', 'tsv', 'header');
}

function setup() {
    noCanvas();

    // table container
    tableTag = createElement('table');
    tableTag.style('width', '600px');
    tableTag.attribute('class', 'py-2 px-3');
    tableTag.parent('sketch-holder');

    // table header
    theadTag = createElement('thead');
    theadTag.parent(tableTag);
    trTag = createElement('tr');
    trTag.parent(theadTag);

    for (let eachCell of header) {
        thTag = createElement('th', eachCell);
        thTag.style('text-align', 'left');
        thTag.attribute('class', 'px-2');
        thTag.parent(trTag);
    }

    // table body
    tbodyTag = createElement('tbody');
    tbodyTag.parent(tableTag);

    for (let eachRow of table.rows) {
        trTag = createElement('tr');
        trTag.attribute('class', 'py-1');
        trTag.parent(tbodyTag);

        for (let key of ['swatch', 'colorName', 'hexCode']) {
            tdTag = createElement('td');
            tdTag.attribute('class', 'px-2');
            tdTag.parent(trTag);

            if (key !== 'swatch') {
                tdTag.html(eachRow.get(key));
            } else {
                tdTag.html('&nbsp;');
                tdTag.style('background', `#${eachRow.get('hexCode')}`);
                tdTag.style('width', '20px');
            }
        }
    }
}