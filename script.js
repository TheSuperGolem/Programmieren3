const Grass = require("./grass");
const Grazer = require("./grazer");
const Tyrant = require("./tyrant");
const Empty = require("./empty");

const {matrix, size, random} = require("./utils");

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

            // if (element instanceof Grazer) {
            //     process.stdout.write("Y")
            // } else if (element instanceof Grass) {
            //     process.stdout.write("G")
            // } else if (element instanceof Tyrant) {
            //     process.stdout.write("R")
            // } else if (element instanceof Empty) {
            //     process.stdout.write(" ")
            // }
            if (element instanceof Empty)continue
            
            if (element.stepCount === frameCount) {
                element.step();
                element.stepCount++;
            } else if (isNaN(element.stepCount)) {
                element.stepCount = frameCount + 1;
            }
        }
        // process.stdout.write("\n")
    }
    // process.stdout.write("\u001b[" + matrix.length + "A")
    frameCount++;
}

module.exports = {setup, draw, frameCount};

setup();
setInterval(draw, 1000);