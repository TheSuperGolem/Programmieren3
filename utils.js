const Empty = require("./empty")
const LivingBeing = require("./livingbeing");

let matrix = [];
let size = 50;
let blockSize = 15;

let statistics = {
    "grazer1": 0,
    "grazer2": 0,
    "grass1": 0,
    "grass2": 0,
    "tyrant1": 0,
    "tyrant2": 0,
}

function updatePosition(obj, newPos) {
    let [newRow, newCol] = newPos;
    matrix[newRow][newCol] = obj;
    matrix[obj.row][obj.col] = new Empty();
    obj.row = newRow;
    obj.col = newCol;
}

function findNeighbours(row, col, n, cls = LivingBeing) {
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

function random(...args) {
    if (args.length === 0) {
    return Math.random();
    } else if (args.length === 1 && Array.isArray(args[0])) {
    return args[0][Math.floor(Math.random() * args[0].length)];
    } else if (args.length === 1 && typeof args[0] === 'number') {
    return Math.floor(Math.random() * args[0]);
    } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
    return Math.floor(Math.random() * (args[1] - args[0] + 1) - args[0]);
    } else {
    console.log(args);
    throw new Error('Invalid arguments');
    }
}

module.exports = {
    matrix: matrix,
    size: size,
    blockSize: blockSize,
    updatePosition: updatePosition,
    findNeighbours: findNeighbours,
    random: random,
    statistics: statistics
}