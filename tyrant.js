const LivingBeing = require("./livingbeing");
const Grazer = require("./grazer");
const Empty = require("./empty");
const {matrix, updatePosition, findNeighbours, random} = require("./utils");

module.exports = class Tyrant extends LivingBeing{
    constructor(color, energy, row, col) {
        super(color, energy, row, col)
        this.color = "red";
        this.energy = 80;
        this.row;
        this.col;
    }

    eat() {
        let food = findNeighbours(this.row, this.col, 1, Grazer)
        if (food.length > 0) {
            let grazerField = random(food);
            updatePosition(this, grazerField);
            this.energy += 10;
        } else {
            this.energy--;
        }
    }

    mul() {
        let spawnElems = findNeighbours(this.row, this.col, 1, Empty)
        if (spawnElems.length > 0) {
            let emptyField = random(spawnElems);
            matrix[emptyField[0]][emptyField[1]] = new Tyrant();
            this.energy -= 100;
        }
    }

    step() {
        this.eat()
        if (this.energy >= 130) {
            this.mul();
        } else if (this.energy <= 0) {
            matrix[this.row][this.col] = new Empty();
        }
    }
}