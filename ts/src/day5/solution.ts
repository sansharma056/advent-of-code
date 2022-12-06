import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

function solve(input: string): string {
	const [startingStacks, instructions] = input.split("\n\n");

	console.log("-->\n", startingStacks);
	const stacks = generateStacksFromString(startingStacks);

	for (const instruction of instructions.split("\n")) {
		performInstructionOnStacks(instruction, stacks);
	}

	return stacks.reduce((prev, cur) => prev + cur.at(-1), "");
}

function generateStacksFromString(startingStacks: string): string[][] {
	const numOfStacks = startingStacks.at(-1);
	if (!numOfStacks) {
		throw new Error("Can't find number of stacks");
	}

	const stacks: string[][] = [];

	const rows = startingStacks.split("\n");
	const maxRowLength = rows.reduce(
		(prev, cur) => (cur.length > prev ? cur.length : prev),
		0
	);

	for (let i = rows.length - 2; i >= 0; i--) {
		for (let j = 1; j <= maxRowLength; j += 4) {
			const crate = rows[i].at(j);

			if (crate && crate !== " ") {
				const x = (j - 1) / 4;

				if (!stacks[x]) {
					stacks[x] = [];
				}

				stacks[x].push(crate);
			}
		}
	}

	return stacks;
}

function performInstructionOnStacks(instruction: string, stacks: string[][]) {
	const instructionArr = instruction.split(" ");

	const count = +instructionArr[1];
	const sourceStackIdx = +instructionArr[3];
	const targetStackIdx = +instructionArr[5];

	const temp: string[] = [];
	for (let i = 0; i < count; i++) {
		const crate = stacks[sourceStackIdx - 1].pop();

		if (crate) {
			temp.push(crate);
		}
	}

	// part 2 specific condition
	if (count >= 2) {
		temp.reverse();
	}

	stacks[targetStackIdx - 1].push(...temp);
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString().trimEnd();
	console.log(solve(input));
});
