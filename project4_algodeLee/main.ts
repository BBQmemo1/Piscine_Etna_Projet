const fs = require('fs');

let xStart: number = 0;
let yStart: number = 0;
let xEnd: number = 0;
let yEnd: number = 0;
const circuitNumber: number[][] = [];
// array 2d
function createCircuit(fileMap: string): string[][] {
  const map: string = fs.readFileSync(fileMap, 'utf-8').split('\n');
  const circuit: string[][] = [];
  for (let i: number = 0; i < map.length; i += 1) {
    const line: string[] = [];
    for (let j: number = 0; j < map[i].length; j += 1) {
      line.push(map[i][j]);
    }
    circuit.push(line);
  }
  return circuit;
}
// change to number
function changeCircuit(circuit: string[][]): { startFound: boolean, endFound: boolean } {
  let startFound = false;
  let endFound = false;
  for (let y: number = 0; y < circuit.length; y += 1) {
    const line: number[] = [];
    for (let x: number = 0; x < circuit[y].length; x += 1) {
      if (circuit[y][x] === 'S') {
        xStart = y;
        yStart = x;
        line.push(-2);
        startFound = true;
      }
      if (circuit[y][x] === 'E') {
        line.push(-3);
        xEnd = y;
        yEnd = x;
        endFound = true;
      }
      if (circuit[y][x] === 'o') {
        line.push(-1);
      }
      if (circuit[y][x] === '.') {
        line.push(0);
      }
    }
    circuitNumber.push(line);
  }
  return { startFound, endFound };
}
// chercher end
function leeAlgo(): number {
  let exitFound: boolean = false;
  let queue: { x: number, y: number }[] = [{ x: xStart, y: yStart }];
  let numbLoop: number = 1;

  while (!exitFound) {
    const tmp: { x: number, y: number }[] = [];
    for (let i = 0; i < queue.length; i += 1) {
      const arraySize: number = circuitNumber.length;
      const columnSize: number = circuitNumber[queue[i].x].length;

      // up
      if (queue[i].x - 1 >= 0
        && circuitNumber[queue[i].x - 1][queue[i].y] === 0) {
        tmp.push({ x: queue[i].x - 1, y: queue[i].y });
        circuitNumber[queue[i].x - 1][queue[i].y] = numbLoop;
      }
      // right
      if (queue[i].y + 1 < columnSize
        && circuitNumber[queue[i].x][queue[i].y + 1] === 0) {
        tmp.push({ x: queue[i].x, y: queue[i].y + 1 });
        circuitNumber[queue[i].x][queue[i].y + 1] = numbLoop;
      }
      // down
      if (queue[i].x + 1 < arraySize
        && circuitNumber[queue[i].x + 1][queue[i].y] === 0) {
        tmp.push({ x: queue[i].x + 1, y: queue[i].y });
        circuitNumber[queue[i].x + 1][queue[i].y] = numbLoop;
      }
      // left
      if (queue[i].y - 1 >= 0
        && circuitNumber[queue[i].x][queue[i].y - 1] === 0) {
        tmp.push({ x: queue[i].x, y: queue[i].y - 1 });
        circuitNumber[queue[i].x][queue[i].y - 1] = numbLoop;
      }

      if ((queue[i].x - 1 >= 0 && circuitNumber[queue[i].x - 1][queue[i].y] === -3)
          || (queue[i].y + 1 < columnSize && circuitNumber[queue[i].x][queue[i].y + 1] === -3)
          || (queue[i].x + 1 < arraySize && circuitNumber[queue[i].x + 1][queue[i].y] === -3)
          || (queue[i].y - 1 >= 0 && circuitNumber[queue[i].x][queue[i].y - 1] === -3)) {
        exitFound = true;
      }
    }
    if(queue.length === 0) {
      console.log('no way');
      process.exit(0);
    }
    queue = tmp;
    numbLoop += 1;
  }
  return numbLoop;
}

// retourne start
function fastPath(numbLoop: number) {
  const reversePath = { x: xEnd, y: yEnd };
  const finalPath: number[][] = [[xEnd, yEnd]];
  numbLoop -= 1;

  while (numbLoop > 1) {
    const arraySize: number = circuitNumber.length;
    const columnSize: number = circuitNumber[reversePath.x].length;

    if (reversePath.x - 1 >= 0
      && circuitNumber[reversePath.x - 1][reversePath.y] === numbLoop - 1) {
      finalPath.push([reversePath.x - 1, reversePath.y]);
      reversePath.x -= 1;
      numbLoop -= 1;
    }
    if (reversePath.x + 1 < arraySize
      && circuitNumber[reversePath.x + 1][reversePath.y] === numbLoop - 1) {
      finalPath.push([reversePath.x + 1, reversePath.y]);
      reversePath.x += 1;
      numbLoop -= 1;
    }
    if (reversePath.y + 1 < columnSize
      && circuitNumber[reversePath.x][reversePath.y + 1] === numbLoop - 1) {
      finalPath.push([reversePath.x, reversePath.y + 1]);
      reversePath.y += 1;
      numbLoop -= 1;
    }
    if (reversePath.y - 1 >= 0
      && circuitNumber[reversePath.x][reversePath.y - 1] === numbLoop - 1) {
      finalPath.push([reversePath.x, reversePath.y - 1]);
      reversePath.y -= 1;
      numbLoop -= 1;
    }
  }
  finalPath.push([xStart, yStart]);
  return finalPath.reverse();
}

// main
function parse(fileMap: string): void {
  const circuit = createCircuit(fileMap);
  const { startFound, endFound } = changeCircuit(circuit);
  if (!startFound) {
    console.log('error S not found');
    return;
  }
  if (!endFound) {
    console.log('error E not found');
    return;
  }
  const numbLoop = leeAlgo();
  const finalPath = fastPath(numbLoop);
  console.log(finalPath.join(' ').split(',').join(':'));
}

if(process.argv[2] === undefined) {
  console.log('no map');
  process.exit(0);
}

parse(process.argv[2]);
