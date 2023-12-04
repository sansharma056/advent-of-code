const NUMBER_REGEX = /\d+/g;

function getCardMatchedValue(card: string): number {
  const [_gameInfo, numbersString] = card.split(":");
  const [winningNumbersString, playerNumbersStrings] = numbersString.split("|");

  const winningNumbers = new Set(winningNumbersString.match(NUMBER_REGEX));
  const playerNumbers = playerNumbersStrings.match(NUMBER_REGEX) ?? [];
  let matched = 0;

  for (const playerNumber of playerNumbers) {
    if (!winningNumbers.has(playerNumber)) {
      continue;
    }

    matched++;
  }

  return matched;
}

function solve(cards: string[]): number {
  const instances = Array(cards.length).fill(1);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const matched = getCardMatchedValue(card);

    for (let j = 1; j <= matched; j++) {
      instances[i + j] += instances[i] * 1;
    }
  }

  return instances.reduce((prev, cur) => prev + cur, 0);
}

if (import.meta.main) {
  console.log(solve(Deno.readTextFileSync("input/pi").trim().split("\n")));
}
