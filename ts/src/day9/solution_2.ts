import { readFile } from "fs";
import { argv } from "process";

const KNOTS_NUM = 10;

const path = argv[2];

type Direction = "U" | "R" | "D" | "L";

function calcDistance(knot1: Knot, knot2: Knot): number {
	const [x1, y1] = knot1.position;
	const [x2, y2] = knot2.position;

	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

class Knot {
	position: [number, number];

	constructor() {
		this.position = [0, 0];
	}
}

function adjustKnot(knots: Knot[], i: number, visited: Set<string>) {
	if (i === KNOTS_NUM - 1) {
		return;
	}

	const cur = knots[i];
	const next = knots[i + 1];

	const distance = calcDistance(cur, next);

	if (distance <= Math.SQRT2) {
		return;
	}

	let [x1, y1] = cur.position;
	const [x2, y2] = next.position;

	if (x1 === x2) {
		if (y1 > y2) {
			y1--;
		} else if (y1 < y2) {
			y1++;
		}
	} else if (y1 === y2) {
		if (x1 > x2) {
			x1--;
		} else if (x1 < x2) {
			x1++;
		}
	} else if (x2 > x1 && y2 > y1) {
		x1++;
		y1++;
	} else if (x1 > x2 && y1 > y2) {
		x1--;
		y1--;
	} else if (x2 > x1 && y1 > y2) {
		x1++;
		y1--;
	} else if (x1 > x2 && y2 > y1) {
		x1--;
		y1++;
	}

	const newPosition: [number, number] = [x1, y1];
	cur.position = newPosition;

	if (i === 0) {
		visited.add(newPosition.join(" "));
		return;
	}

	adjustKnot(knots, i - 1, visited);
}

function moveHead(
	knots: Knot[],
	direction: Direction,
	units: number,
	visited: Set<string>
) {
	const headIdx = KNOTS_NUM - 1;
	const head = knots[headIdx];
	let [x, y] = head.position;

	for (let i = 0; i < units; i++) {
		switch (direction) {
			case "U":
				y++;
				break;
			case "R":
				x++;
				break;
			case "L":
				x--;
				break;
			case "D":
				y--;
				break;
		}

		head.position = [x, y];
		adjustKnot(knots, headIdx - 1, visited);
	}
}

function getNumOfVisitedPositions(instructions: string[]): number {
	const knots: Knot[] = [];
	const visited = new Set<string>();

	for (let i = 0; i < KNOTS_NUM; i++) {
		const knot = new Knot();
		knots.push(knot);
	}

	for (const instruction of instructions) {
		const [direction, units] = instruction.split(" ");
		moveHead(knots, direction as Direction, +units, visited);
	}

	return visited.size + 1;
}

function solve(input: string): number {
	const instructions = input.split("\n");

	return getNumOfVisitedPositions(instructions);
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString().trimEnd();
	console.log(solve(input));
});
