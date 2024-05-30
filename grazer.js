const LivingBeing = require("./livingbeing");
const Grass = require("./grass");
const Empty = require("./empty");
const {matrix, updatePosition, findNeighbours, random} = require("./utils");

module.exports = class Grazer extends LivingBeing {
    constructor(color, energy, row, col) {
        super(color, energy, row, col);
        this.color = "yellow";
        this.energy = 5;
        this.row;
        this.col;
    }

    eat() {
        let food = findNeighbours(this.row, this.col, 1, Grass)
        if (food.length > 0) {
            let grassField = random(food);
            updatePosition(this, grassField);
            this.energy++;
        } else {
            let others = findNeighbours(this.row, this.col, 1, Empty)
            if (others.length > 0) {
                let emptyField = random(others);
                updatePosition(this, emptyField);
            }
            this.energy--;
        }
    }

    mul() {
        let spawnElems = findNeighbours(this.row, this.col, 1, Empty)
        if (spawnElems.length > 0) {
            let spawnField = random(spawnElems);
            matrix[spawnField[0]][spawnField[1]] = new Grazer();
            this.energy -= 5;
        }
    }

    step() {
        this.eat()
        if (this.energy >= 10) {
            this.mul();
        } else if (this.energy <= 0) {
            matrix[this.row][this.col] = new Empty();
        }
    }
}