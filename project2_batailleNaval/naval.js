var matrix = [
    [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
];
var hiddenShipP1 = [
    [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
];
var hiddenShipP2 = [
    [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
];
var hiddenShipP11 = [
    [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
];
var hiddenShipP22 = [
    [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
];
var numbShip = parseInt(process.argv[2], 10);
var readlineSync = require('readline-sync');
var countP1 = 0;
var countP2 = 0;
function loopGame(player) {
    for (var i = 0; i < matrix.length; i += 1) {
        switch (player) {
            case 'player1':
                console.log("".concat(hiddenShipP1[i].join(' ')));
                break;
            case 'player2':
                console.log("".concat(hiddenShipP2[i].join(' ')));
                break;
            case 'player11':
                console.log("".concat(hiddenShipP11[i].join(' ')));
                break;
            case 'player22':
                console.log("".concat(hiddenShipP22[i].join(' ')));
                break;
            default:
                console.log("".concat(matrix[i].join(' ')));
        }
    }
}
function placeShip(numb, player) {
    for (var i = 0; i < numb; i += 1) {
        var quest1 = readlineSync.question("".concat(player, " --- Select ships positions : "));
        var rowsPos = parseInt(quest1[0], 10);
        var colsPos = quest1[1].toUpperCase().charCodeAt(0) - 64;
        // matrix[rowsPos][colsPos] ='0';
        if (player === 'player1') {
            hiddenShipP1[rowsPos][colsPos] = '0';
        }
        if (player === 'player2') {
            hiddenShipP2[rowsPos][colsPos] = '0';
        }
    }
    console.log("All ship placed ! --- ".concat(player));
}
function shotShip(player) {
    var quest2 = readlineSync.question("".concat(player, " --- Take your shot : "));
    var rowsPos = parseInt(quest2[0], 10);
    var colsPos = quest2[1].toUpperCase().charCodeAt(0) - 64;
    // matrix[rowsPos][colsPos] ='X';
    if (player === 'player1') {
        if (hiddenShipP2[rowsPos][colsPos] === '0') {
            hiddenShipP22[rowsPos][colsPos] = 'X';
            console.log('Hit!');
            loopGame('player22');
            countP1 += 1;
        }
        else if (hiddenShipP2[rowsPos][colsPos] === '.') {
            hiddenShipP22[rowsPos][colsPos] = 'M';
            console.log('Miss!');
            loopGame('player22');
        }
    }
    if (player === 'player2') {
        if (hiddenShipP1[rowsPos][colsPos] === '0') {
            hiddenShipP11[rowsPos][colsPos] = 'X';
            console.log('Hit!');
            loopGame('player11');
            countP2 += 1;
        }
        else if (hiddenShipP1[rowsPos][colsPos] === '.') {
            hiddenShipP11[rowsPos][colsPos] = 'M';
            console.log('Miss!');
            loopGame('player11');
        }
    }
}
loopGame('default');
placeShip(numbShip, 'player1');
placeShip(numbShip, 'player2');
while (countP1 <= numbShip || countP2 <= numbShip) {
    shotShip('player1');
    if (countP1 === numbShip) {
        console.log('Player 1 win');
        process.exit(0);
    }
    shotShip('player2');
    if (countP2 === numbShip) {
        console.log('Player 2 win');
        process.exit(0);
    }
}
