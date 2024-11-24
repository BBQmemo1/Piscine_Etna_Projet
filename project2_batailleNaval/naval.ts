const matrix: string[][] = [
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
const hiddenShipP1: string[][] = [
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
const hiddenShipP2: string[][] = [
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
const hiddenShipP11: string[][] = [
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
const hiddenShipP22: string[][] = [
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
const numbShip: number = parseInt(process.argv[2], 10);
const readlineSync = require('readline-sync');

let countP1: number = 0;
let countP2: number = 0;

function loopGame(player: string) {
  for (let i: number = 0; i < matrix.length; i += 1) {
    switch (player) {
      case 'player1':
        console.log(`${hiddenShipP1[i].join(' ')}`);
        break;
      case 'player2':
        console.log(`${hiddenShipP2[i].join(' ')}`);
        break;
      case 'player11':
        console.log(`${hiddenShipP11[i].join(' ')}`);
        break;
        case 'player22':
        console.log(`${hiddenShipP22[i].join(' ')}`);
        break;
      default:
        console.log(`${matrix[i].join(' ')}`);
    }
  }
}

function placeShip(numb: number, player: string) {
  for (let i: number = 0; i < numb; i += 1) {
    const quest1: string = readlineSync.question(`${player} --- Select ships positions : `);
    
    const rowsPos: number = parseInt(quest1[0], 10);
    const colsPos: number = quest1[1].toUpperCase().charCodeAt(0) - 64;
    // matrix[rowsPos][colsPos] ='0';
    if (player === 'player1') {
      hiddenShipP1[rowsPos][colsPos] = '0';
    }
    if (player === 'player2') {
      hiddenShipP2[rowsPos][colsPos] = '0';
    }
  }
  console.log(`All ship placed ! --- ${player}`);
}

function shotShip(player: string) {
  const quest2: string = readlineSync.question(`${player} --- Take your shot : `);
  const rowsPos: number = parseInt(quest2[0], 10);
  const colsPos: number = quest2[1].toUpperCase().charCodeAt(0) - 64;
  // matrix[rowsPos][colsPos] ='X';
  if (player === 'player1') {
    if (hiddenShipP2[rowsPos][colsPos] === '0') {
      hiddenShipP22[rowsPos][colsPos] = 'X';
      console.log('Hit!');
      loopGame('player22');
      countP1 += 1;
    } else if (hiddenShipP2[rowsPos][colsPos] === '.') {
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
    } else if (hiddenShipP1[rowsPos][colsPos] === '.') {
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
  if (countP1 === numbShip ) {
    console.log('Player 1 win');
    process.exit(0);
  }
  shotShip('player2');
  if (countP2 === numbShip) {
    console.log('Player 2 win');
    process.exit(0);
  }
}
