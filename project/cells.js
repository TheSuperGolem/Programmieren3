class Empty { }

class Grass {
    constructor() {
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
            let free = random(elems);
            let row = free[0];
            let col = free[1];
            matrix[row][col] = new Grass();
            this.energy = 0;
        }
    }
}

class Grazer {
    constructor() {
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

class Tyrant {
    constructor() {
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

let matrix = [];
let size = 50;
let blockSize = 15;

let creatureAmounts = [
    [Grass, 0.2],
    [Grazer, 0.05],
    [Tyrant, 0.03],
]

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

// randomly fill the matrix with creatures
function fillMatrix() {
    for (let row = 0; row < size; row++) {
        matrix.push([])
        for (let col = 0; col < size; col++) {
            let cls = getRandomCreature();
            matrix[row][col] = new cls();
        }
    }
}


// update the position of an object in the matrix and set the old position to Empty
function updatePosition(obj, newPos) {
    let [newRow, newCol] = newPos;
    matrix[newRow][newCol] = obj;
    matrix[obj.row][obj.col] = new Empty();
    obj.row = newRow;
    obj.col = newCol;
}


// find all neighbours of a certain creature type in a certain radius
function findNeighbours(row, col, n, cls) {
    let fields = []
    for (let nCol = col - n; nCol <= col + n; nCol++) {
        for (let nRow = row - n; nRow <= row + n; nRow++) {
            if (nCol >= 0 && nCol < size && nRow >= 0 && nRow < size && (matrix[nRow][nCol] instanceof cls)) {
                fields.push([nRow, nCol])
            }
        }
    }
    return fields
}

function setup() {
    createCanvas(size * blockSize, size * blockSize);
    fillMatrix();
    noStroke();
    frameRate(30);
}

function draw() {
    background(200)
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            let obj = matrix[row][col];
            if (obj instanceof Empty) continue;
            obj.row = row;
            obj.col = col;
            fill(obj.color)
            rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize);

            // this prevents newly created objects from being updated in the same step
            // you can also create objects that get "activated" only after a certain number of steps after creation
            if (obj.stepCount === frameCount) {
                obj.step();
                obj.stepCount++;
            } else if (isNaN(obj.stepCount)) {
                obj.stepCount = frameCount + 1;
            }
        }
    }
}