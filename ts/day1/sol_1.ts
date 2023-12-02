function isNumber(x: string): boolean {
  return +x === +x;
}

function getCalibrationNumber(calibrationString: string): number {
  let calibrationNumber = 0;
  let start = 0;
  let end = calibrationString.length - 1;

  let firstDigitFound = false;
  let secondDigitFound = false;

  while (!firstDigitFound || !secondDigitFound) {
    if (!firstDigitFound && isNumber(calibrationString[end])) {
      firstDigitFound = true;
      calibrationNumber += +calibrationString[end];
    } else {
      end--;
    }

    if (!secondDigitFound && isNumber(calibrationString[start])) {
      secondDigitFound = true;
      calibrationNumber += +calibrationString[start] * 10;
    } else {
      start++;
    }
  }

  return calibrationNumber;
}

function solve(input: string[]): number {
  return input.reduce((prev, cur) => prev + getCalibrationNumber(cur), 0);
}

function main() {
  console.log(solve(Deno.readTextFileSync("input/pi").trim().split("\n")));
}

if (import.meta.main) {
  main();
}
