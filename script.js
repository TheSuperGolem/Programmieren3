const Grass = require("./grass");
const Grazer = require("./grazer");
const Tyrant = require("./tyrant");
const Empty = require("./empty");

const {matrix, size, random, statistics} = require("./utils");

let frameCount = 0

let creatureAmounts = [
    [Grass, 0.2],
    [Grazer, 0.05],
    [Tyrant, 0.01],
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
            if (cls == Grass){
                statistics.grass1++;
            } else if (cls == Grazer){
                statistics.grazer1++;
            } else if (cls == Tyrant){
                statistics.tyrant1++;
            }
        }
    }
}

function draw() {
    for (let col = 0; col < matrix.length; col++) {
        for (let row = 0; row < matrix[col].length; row++) {
            element = matrix[row][col]
            
            if (!element) continue;
            element.row = row
            element.col = col

            if (element instanceof Empty)continue
            
            if (element.stepCount === frameCount) {
                element.step();
                element.stepCount++;
            } else if (isNaN(element.stepCount)) {
                element.stepCount = frameCount + 1;
            }
        }
    }
    frameCount++;
}

module.exports = {setup, draw, frameCount};

setup();
setInterval(draw, 1000);