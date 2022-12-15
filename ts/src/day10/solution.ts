import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

type ExecutionData = {
	triggerCycle: number;
	instruction: Instruction;
};

type Instruction = { type: "noop" } | { type: "addx"; value: number };

type SignalStrength = {
	[key: number]: number;
};

function solve(input: string): number {
	const signalStrengthCycle: SignalStrength = {};

	let x = 1;
	let curCycle = 1;

	let signalStrengthIdx = 1;

	let pendingExecution: ExecutionData | null = null;

	const instructions = input.split("\n");
	let completedExecutionCount = 0;

	let i = 0;
	while (completedExecutionCount < instructions.length) {
		if (curCycle === signalStrengthIdx * 20) {
			signalStrengthCycle[curCycle] = x * curCycle;
			signalStrengthIdx += 2;
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

	return Object.values(signalStrengthCycle).reduce(
		(prev, cur) => prev + cur,
		0
	);
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString().trimEnd();
	console.log(solve(input));
});
