const DIR_X = [1, -1, 0, 0, -1, 1, 1, -1];
const DIR_Y = [0, 0, 1, -1, -1, 1, -1, 1];

function isSymbol(x: string): boolean {
  return !isNum(x) && x !== ".";
}

function hasNeighboursWithSymbols(grid: string[], x: number, y: number) {
  const ROW = grid.length;
  const COL = grid[0].length;

  for (let i = 0; i < DIR_X.length; i++) {
    const x1 = x + DIR_X[i];
    const y1 = y + DIR_Y[i];

    if (x1 < 0 || x1 >= ROW || y1 < 0 || y1 >= COL) {
      continue;
    }

    if (isSymbol(grid[x1][y1])) {
      return true;
    }
  }

  return false;
}

function isNum(x: string): boolean {
  return +x === +x;
}

function identify(
  grid: string[],
  x: number,
  y: number,
):
  | {
      isNum: true;
      partNumber: number;
      endIdx: number;
      hasSymbolAdjacent: boolean;
    }
  | { isNum: false } {
  const char = grid[x][y];

  if (!isNum(char)) {
    return { isNum: false };
  }

  const partNumberArr: string[] = [];
  let hasSymbolAdjacent = false;

  while (y < grid[x].length && isNum(grid[x][y])) {
    partNumberArr.push(grid[x][y]);
    if (hasNeighboursWithSymbols(grid, x, y)) {
      hasSymbolAdjacent = true;
    }

    y++;
  }

  return {
    isNum: true,
    partNumber: +partNumberArr.join(""),
    endIdx: y,
    hasSymbolAdjacent: hasSymbolAdjacent,
  };
}

function solve(grid: string[]): number {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  let sum = 0;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const info = identify(grid, i, j);
      if (info.isNum && info.hasSymbolAdjacent) {
        sum += info.partNumber;
        j = info.endIdx;
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
