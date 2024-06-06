const LivingBeing = require("./livingbeing");
const Empty = require("./empty");
const Grass = require("./grass");
const Grazer = require("./grazer");
const Tyrant = require("./tyrant");
const {matrix, findNeighbours} = require("./utils");

module.exports = class Explosion extends LivingBeing {
    constructor(color, energy, row, col) {
        super(color, energy, row, col);
        this.color = "orange";
        this.energy = 0;
        this.radius = 1;
        this.maxRadius = 6;
        this.expanding = true;
    }

    step() {
        this.energy++;

        if (this.energy >= 1) {
            if (this.expanding) {
                this.explode();
            } else {
                this.vanish();
            }
            this.energy = 0;
        }
    }

    explode() {
        for (let i = this.row - this.radius; i <= this.row + this.radius; i++) {
            for (let j = this.col - this.radius; j <= this.col + this.radius; j++) {
                const distance = Math.sqrt(Math.pow(i - this.row, 2) + Math.pow(j - this.col, 2));
                if (distance <= this.radius) {
                    if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length) {
                        let target = matrix[i][j];
                        if (target instanceof Grass || target instanceof Grazer || target instanceof Tyrant || target instanceof Empty) {
                            matrix[i][j] = new Empty(this.color);
                        }
                    }
                }
            }
        }
        this.radius++;
        if (this.radius > this.maxRadius) {
            this.expanding = false;
        }
    }
    

    vanish() {
        let elems = findNeighbours(this.row, this.col, this.radius - 1, Empty);
        for (let [nRow, nCol] of elems) {
            matrix[nRow][nCol] = new Empty();
        }
        this.radius--;
        if (this.radius <= 0) {
            matrix[this.row][this.col] = new Empty();
        }
    }
};
