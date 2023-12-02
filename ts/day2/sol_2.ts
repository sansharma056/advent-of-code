function max(nums: number[]): number {
  return nums.reduce((prev, cur) => Math.max(prev, cur));
}

function getGameRecordValue(gameRecord: string): number {
  const red = max(
    gameRecord.match(/\d+ red/g)?.map((x) => +x.split(" ")[0]) ?? [0],
  );
  const green = max(
    gameRecord.match(/\d+ green/g)?.map((x) => +x.split(" ")[0]) ?? [0],
  );
  const blue = max(
    gameRecord.match(/\d+ blue/g)?.map((x) => +x.split(" ")[0]) ?? [0],
  );

  return red * green * blue;
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
