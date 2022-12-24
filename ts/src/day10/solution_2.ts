import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

type ExecutionData = {
  triggerCycle: number;
  instruction: Instruction;
};

type Pixel = "#" | ".";

type Instruction = { type: "noop" } | { type: "addx"; value: number };

function renderScreen(screenData: Pixel[]) {
  const WIDTH = 40;
  const HEIGHT = 6;

  let curPixelIdx = 0;

  for (let i = 0; i < HEIGHT; i++) {
    let row = "";
    for (let j = 0; j < WIDTH; j++) {
      row += screenData[curPixelIdx++];
    }
    console.log(row);
  }
}

function solve(input: string): void {
  const screen: Pixel[] = [];
  let x = 1;
  let curCycle = 1;

  let pendingExecution: ExecutionData | null = null;

  const instructions = input.split("\n");
  let completedExecutionCount = 0;

  let i = 0;
  while (completedExecutionCount < instructions.length) {

    const pixelBeingDrawn = curCycle - 1;
    const pixelIdx = pixelBeingDrawn % 40;
    if (pixelIdx >= x - 1 && pixelIdx <= x + 1) {
      screen[pixelBeingDrawn] = "#";
    } else {
      screen[pixelBeingDrawn] = ".";
    }

    if (pendingExecution === null && i < instructions.length) {
      const instruction = instructions[i];
      const [type, value] = instruction.split(" ");

      const triggerCycle = type === "noop" ? curCycle + 0 : curCycle + 1;

      if (type === "noop") {
        pendingExecution = { triggerCycle, instruction: { type } };
      } else if (type === "addx") {
        pendingExecution = {
          triggerCycle,
          instruction: { type, value: +value },
        };
      }

      i++;
    }

    if (pendingExecution && pendingExecution.triggerCycle === curCycle) {
      const instruction = pendingExecution.instruction;

      if (instruction.type === "addx") {
        x += instruction.value;
      }

      pendingExecution = null;
      completedExecutionCount++;
    }

    curCycle++;
  }

  renderScreen(screen);
}

readFile(path, (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  const input = data.toString().trimEnd();
  solve(input);
});
