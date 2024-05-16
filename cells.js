// Committed //

let rows = 50;
let columns = 100;
let cell_size = 20;
let cell_color = 30;

let data = Array2D(rows, columns, 0)

function Array2D(rows, columns, init) {
    return Array.from({ length: columns }, () => Array(rows).fill(init));
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    colorMode(HSL, 100);
    angleMode(DEGREES, 360);
    noStroke();
    rewriteData();
}

function rewriteData() {
    for (let i=0;i<columns;i++) {
        for (let j=0;j<rows;j++) {
            let c = Math.round(Math.random());
            data[i][j] = c
        }
    }
}

function draw(){
    matrix();
    if (frameCount % 10 === 0){
        updateCells();
    }
}

function updateCells() {
    let toggle = 0;
    let newData = Array2D(rows, columns, 0);
    if (mouseIsPressed == true){
        toggle = 1;
    }
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let neighbors = countNeighbors(i, j);
            if (data[i][j] === 1) {
                if (neighbors < 2 || neighbors > 3) {
                    newData[i][j] = toggle;
                } else {
                    newData[i][j] = 1;
                }
            } else {
                if (neighbors === 3) {
                    newData[i][j] = 1;
                }
            }
        }
    }
    data = newData;
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let col = (x + i + columns) % columns;
            let row = (y + j + rows) % rows;
            count += data[col][row];
        }
    }
    count -= data[x][y];
    return count;
}

function matrix() {

  for (let i=0;i<columns;i++) {
    for (let j=0;j<rows;j++) {
        let left = i*cell_size;
        let top = j*cell_size;
        let size = cell_size;
        let c = data[i][j];
        fill(cell_color, 100, c*80);
        rect(left,top,size,size);
    }
  }
}