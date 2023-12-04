const NUMBER_REGEX = /\d+/g;

function getCardPointValue(card: string): number {
  const [_gameInfo, numbersString] = card.split(":");
  const [winningNumbersString, playerNumbersStrings] = numbersString.split("|");

  const winningNumbers = new Set(winningNumbersString.match(NUMBER_REGEX));
  const playerNumbers = playerNumbersStrings.match(NUMBER_REGEX) ?? [];

  let isFirstPoint = true;
  let points = 0;

  for (const playerNumber of playerNumbers) {
    if (!winningNumbers.has(playerNumber)) {
      continue;
    }

    if (isFirstPoint) {
      points = 1;
      isFirstPoint = false;
    } else {
      points *= 2;
    }
  }

  return points;
}

function solve(cards: string[]): number {
  return cards.reduce((prev, cur) => prev + getCardPointValue(cur), 0);
}

if (import.meta.main) {
  console.log(solve(Deno.readTextFileSync("input/pi").trim().split("\n")));
}
