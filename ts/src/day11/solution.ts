import { readFile } from "fs";

const args = process.argv;
const path = args[2];

class Test {
  divisibleBy: number;
  monkeyToSendToIfTrue: number;
  monkeyToSendToIfFalse: number;

  constructor(
    divisibleBy: number,
    monkeyToSendToIfTrue: number,
    monkeyToSendToIfFalse: number
  ) {
    this.divisibleBy = divisibleBy;
    this.monkeyToSendToIfTrue = monkeyToSendToIfTrue;
    this.monkeyToSendToIfFalse = monkeyToSendToIfFalse;
  }
}

class Monkey {
  items: number[];
  operator: string;
  operand: string;
  test: Test;
  numberOfTimesInspected: number;

  constructor(items: number[], operator: string, operand: string, test: Test) {
    this.items = items;
    this.operator = operator;
    this.operand = operand;
    this.test = test;
    this.numberOfTimesInspected = 0;
  }
}

function createMonkey(rawMonkeyData: string) {
  const monkeyData: string[] = rawMonkeyData.split("\n");
  const items: number[] = [];

  let re = new RegExp(/\d+/g);
  let res = re.exec(monkeyData[1]);
  while (res !== null) {
    items.push(+res[0]);
    res = re.exec(monkeyData[1]);
  }

  re = new RegExp(/(\+|\*)\s(old|\d+)/g);
  res = re.exec(monkeyData[2]);
  if (res === null) {
    return null;
  }
  const [operator, operand] = res[0].split(" ");

  re = new RegExp(/\d+/g);
  res = re.exec(monkeyData[3]);
  if (res === null) {
    return null;
  }
  const divisibleBy = +res[0];

  res = re.exec(monkeyData[4]);
  if (res === null) {
    return null;
  }
  const monkeyToSendToIfTrue = +res[0];

  res = re.exec(monkeyData[5]);
  if (res === null) {
    return null;
  }
  const monkeyToSendToIfFalse = +res[0];

  const test = new Test(
    divisibleBy,
    monkeyToSendToIfTrue,
    monkeyToSendToIfFalse
  );
  return new Monkey(items, operator, operand, test);
}

function inspection(monkey: Monkey, monkeys: Monkey[]) {
  while (monkey.items.length > 0) {
    let item = monkey.items.pop();
    if(!item) {
      break;
    }

    monkey.numberOfTimesInspected++;

    const operand = monkey.operand === "old" ? item : parseInt(monkey.operand);
    switch (monkey.operator) {
      case "+":
        item += operand;
        break;
      case "*":
        item *= operand;
    }

    item = Math.floor(item / 3);

    const idx = item % monkey.test.divisibleBy === 0 ? monkey.test.monkeyToSendToIfTrue : monkey.test.monkeyToSendToIfFalse;
    monkeys[idx].items.push(item);
  }
}

function getTopTwo(monkeys: Monkey[]): [number, number] {
  const res: [number, number] = [0, 0];

  for(const monkey of monkeys) {
    const {numberOfTimesInspected} = monkey;
    if(numberOfTimesInspected > res[0]) {
      res[1] = res[0];
      res[0] = numberOfTimesInspected;
    } else if(numberOfTimesInspected > res[1]) {
      res[1] = numberOfTimesInspected;
    }
  }

  return res;
}

function solve(input: string): number {
  const ROUNDS = 20;

  const rawMonkeysData: string[] = input.split("\n\n");
  const monkeys: Monkey[] = [];
  for (const rawMonkeyData of rawMonkeysData) {
    const monkey = createMonkey(rawMonkeyData);
    if (monkey) {
      monkeys.push(monkey);
    }
  }

  for (let i = 0; i < ROUNDS; i++) {
    for (const monkey of monkeys) {
      inspection(monkey, monkeys);
    }
  }

  const res = getTopTwo(monkeys);
  return res[0] * res[1];
}

readFile(path, (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  const input = data.toString();
  console.log(solve(input));
});
