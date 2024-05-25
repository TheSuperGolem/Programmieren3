const Grass = require("./grass");
const Grazer = require("./grazer");
const Tyrant = require("./tyrant");
const Empty = require("./empty");

const {matrix, size, frameCount, random} = require("./utils");

let creatureAmounts = [
    [Grass, 0.2],
    [Grazer, 0.05],
    [Tyrant, 0.03],
]

function setup() {
    fillMatrix();
}

function getRandomCreature() {
    let rand = random();
    let sum = 0;
    for (let [cls, prob] of creatureAmounts) {
        sum += prob;
        if (rand < sum) {
            return cls;
        }
    }
    return Empty;
}

function fillMatrix() {
    for (let row = 0; row < size; row++) {
        matrix.push([])
        for (let col = 0; col < size; col++) {
            let cls = getRandomCreature();
            matrix[row][col] = new cls();
        }
    }
}

function draw() {
    console.log("running")
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            let obj = matrix[row][col];
            if (obj instanceof Empty) continue;
                obj.row = row;
                obj.col = col;
                // fill(obj.color)
                // rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize);

            if (obj.stepCount === frameCount) {
                obj.step();
                obj.stepCount++;
            } else if (isNaN(obj.stepCount)) {
                obj.stepCount = frameCount + 1;
            }
        }
    }
}

module.exports = {setup, draw};

setup();
setInterval(draw, 1000);