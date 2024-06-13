// Socket.io: Verbindung zum Server herstellen
// Die socket Variable enthält eine Verbindung zum Server.

const socket = io();
const cellSize = 20;


// setup Funktion von p5.js
function setup() {
    createCanvas(1000, windowHeight);

    let explosionButton = createButton('Create Explosion');
    explosionButton.position(1050, 10);
    explosionButton.mousePressed(() => {
        socket.emit('createExplosion');
    });
}

function drawMatrix(matrix) {
    clear();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let cell = matrix[i][j];
            if (cell) {
                cell.row = i;
                cell.col = j;
                fill(cell.color || "white");
                rect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
}
// Mit socket.on() können wir auf Ereignisse vom Server reagieren.
// Hier reagieren wir auf das Ereignis matrix, das uns die aktuelle Matrix vom Server sendet.
socket.on('matrix', (matrix) => {
    drawMatrix(matrix);
});

socket.on('statistics', (stats) => {
    for (const [key, value] of Object.entries(stats)) {
        let stat = document.getElementById(key);
        stat.innerHTML = value;
    }
});



// wir können hier auch auf andere Ereignisse reagieren, die der Server sendet
// socket.on('someEvent', (data) => {