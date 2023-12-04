const DIR_X = [1, -1, 0, 0, -1, 1, 1, -1];
const DIR_Y = [0, 0, 1, -1, -1, 1, -1, 1];

function isNum(x: string): boolean {
  return +x === +x;
}

function findNeighboursWithPartNumber(
  grid: string[],
  x: number,
  y: number,
): number[] {
  const partNumbers: Set<number> = new Set();

  const ROW = grid.length;
  const COL = grid[0].length;

  for (let i = 0; i < DIR_X.length; i++) {
    const x1 = x + DIR_X[i];
    const y1 = y + DIR_Y[i];

    if (x1 < 0 || x1 >= ROW || y1 < 0 || y1 >= COL) {
      continue;
    }

    let y2 = y1;

    if (isNum(grid[x1][y2])) {
      let partNumber = 0;
      let n = 0;

      while (y2 >= 0 && isNum(grid[x1][y2])) {
        partNumber += +grid[x1][y2--] * 10 ** n++;
      }

      y2 = y1 + 1;

      while (y2 < COL && isNum(grid[x1][y2])) {
        partNumber = partNumber * 10 + +grid[x1][y2++];
      }

      partNumbers.add(partNumber);
    }
  }

  return Array.from(partNumbers);
}

function identify(
  grid: string[],
  x: number,
  y: number,
):
  | {
      isGear: true;
      gearRatio: number;
    }
  | { isGear: false } {
  const char = grid[x][y];

  if (char !== "*") {
    return { isGear: false };
  }

  const partNumbers = findNeighboursWithPartNumber(grid, x, y);

  if (partNumbers.length === 2) {
    return {
      isGear: true,
      gearRatio: partNumbers[0] * partNumbers[1],
    };
  }

  return {
    isGear: true,
    gearRatio: 0,
  };
}

function solve(grid: string[]): number {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  let sum = 0;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const info = identify(grid, i, j);

      if (info.isGear) {
        sum += info.gearRatio;
      }
    }
  }

  return sum;
}

function main() {
  console.log(solve(Deno.readTextFileSync("input/pi").trim().split("\n")));
}

if (import.meta.main) {
  main();
}
