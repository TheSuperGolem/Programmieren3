const LivingBeing = require("./livingbeing");
const Grass = require("./grass");
const Grazer = require("./grazer");
const Tyrant = require("./tyrant");
const Empty = require("./empty");

const {matrix, random, findNeighbours, updatePosition} = require("./utils")

module.exports = class Explosion extends LivingBeing{
    constructor(color, energy, row, col) {
        super(color, energy, row, col)
        this.color = "orange";
        this.energy = 0;
        this.row;
        this.col;
    }

    step() {
        this.energy++;
        if (this.energy <= 2) {
            this.multiply();
        } else if (this.energy >= 3) {
            this.energy = 0;
            matrix[this.row][this.col] = new Empty();
        }
    }

    multiply() {
        let elems = findNeighbours(this.row, this.col, 1, Empty)
        if (elems.length > 0) {
            let free = random(elems);
            let row = free[0];
            let col = free[1];
            matrix[row][col] = new Explosion();
            this.energy = 0;
        }
    }
}