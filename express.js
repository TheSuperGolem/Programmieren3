// import von der setup und draw Funktion und der matrix Variable
// ...

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const {matrix, size, random} = require("./utils");
const {setup, draw} = require("./script");
const Explosion = require("./explosion");

// wir speichern das Ergebnis von der setInterval Funktion in einer Variable,
// damit wir es später stoppen können
let interval;

// wir sagen Express, dass die Dateien im Ordner client statisch sind
// das bedeutet, dass sie direkt an der Browser geschickt werden können
// Der Code für den Client muss also im Ordner client liegen
app.use(express.static('client'));

// wenn ein Benutzer die Seite öffnet, wird er auf die index.html Datei weitergeleitet
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// wir starten den Server auf dem Port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// wenn ein Benutzer eine Verbindung zum Server herstellt, wird diese Funktion ausgeführt
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');

        // wir stoppen das Spiel, wenn der Benutzer die Verbindung trennt
        clearInterval(interval);
    });
    socket.on('createExplosion', () => {
        const row = random(size);
        const col = random(size);
        matrix[row][col] = new Explosion('orange', 0, row, col);
        io.emit('matrix', matrix);
    });

    setup();
    interval = setInterval(() => {
        draw();
        socket.emit('matrix', matrix);
    }, 30);
});


// // Diese Funktion sorgt dafür, dass die Matrix nur noch Strings mit Farben enthält
// function transformMatrix(matrix) {
//     // Wenn ihr Zahlen in der Matrix habt, können sie hier in Farben umgewandelt werden
//     // ...
//     return newMatrix
// }