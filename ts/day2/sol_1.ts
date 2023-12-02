const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

function max(nums: number[]): number {
  return nums.reduce((prev, cur) => Math.max(prev, cur));
}

function getGameRecordValue(gameRecord: string): number {
  const id = +gameRecord.match(/Game (\d+)/)![1];

  const red = max(
    gameRecord.match(/\d+ red/g)?.map((x) => +x.split(" ")[0]) ?? [0],
  );
  const green = max(
    gameRecord.match(/\d+ green/g)?.map((x) => +x.split(" ")[0]) ?? [0],
  );
  const blue = max(
    gameRecord.match(/\d+ blue/g)?.map((x) => +x.split(" ")[0]) ?? [0],
  );

  return red > MAX_RED_CUBES || green > MAX_GREEN_CUBES || blue > MAX_BLUE_CUBES
    ? 0
    : id;
}

function solve(gameRecords: string[]) {
  return gameRecords.reduce((prev, cur) => prev + getGameRecordValue(cur), 0);
}

export function main() {
  console.log(solve(Deno.readTextFileSync("input/pi").trim().split("\n")));
}

if (import.meta.main) {
  main();
}
