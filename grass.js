const LivingBeing = require("./livingbeing");
const Empty = require("./empty");
const {matrix, findNeighbours, random, statistics} = require("./utils");

module.exports = class Grass extends LivingBeing{
    constructor(color, energy, row, col) {
        super(color, energy, row, col)
        this.color = "green";
        this.energy = 0;
        this.row;
        this.col;
    }

    step() {
        this.energy++;
        if (this.energy >= 6) {
            this.multiply();
        }
    }

    multiply() {
        let elems = findNeighbours(this.row, this.col, 1, Empty)
        if (elems.length > 0) {
            statistics.grass1++
            let free = random(elems);
            let row = free[0];
            let col = free[1];
            matrix[row][col] = new Grass();
            this.energy = 0;
        }
    }
}