import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

type Direction = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";
const DIRECTIONS: Direction[] = ["TOP", "RIGHT", "BOTTOM", "LEFT"];

function generateGridFromString(input: string): number[][] {
	const grid: number[][] = [];

	const lines = input.split("\n");

	for (const line of lines) {
		grid.push(line.split("").map((x) => +x));
	}

	return grid;
}

function getScenicScore(
	forest: number[][],
	pos: [number, number],
	direction: Direction
): number {
	const ROW_NUM = forest.length;
	const COL_NUM = forest[0].length;

	let [x, y] = pos;
	let distance = 0;
	const cur = forest[x][y];

	switch (direction) {
		case "TOP": {
			while (x > 0) {
				distance++;
				if (cur === forest[x - 1][y]) {
					break;
				}

				x--;
			}
			break;
		}

		case "RIGHT": {
			while (y <= COL_NUM - 2) {
				distance++;
				y++;
				const next = forest[x][y];
				if (cur <= next) {
					break;
				}
			}
			break;
		}

		case "BOTTOM": {
			while (x <= ROW_NUM - 2) {
				distance++;
				x++;
				const next = forest[x][y];
				if (cur <= next) {
					break;
				}
			}
			break;
		}

		case "LEFT": {
			while (y > 0) {
				distance++;
				y--;
				const next = forest[x][y];
				if (cur <= next) {
					break;
				}
			}
			break;
		}
	}

	return distance;
}

function getMaxScenicScore(forest: number[][]): number {
	const ROW_NUM = forest.length;
	const COL_NUM = forest[0].length;

	let max = 0;

	for (let i = 0; i < ROW_NUM; i++) {
		for (let j = 0; j < COL_NUM; j++) {
			if (i === 0 || i === ROW_NUM - 1 || j === 0 || j === COL_NUM - 1) {
				continue;
			}
			const scenicScores = DIRECTIONS.map((direction) =>
				getScenicScore(forest, [i, j], direction)
			);

			max = Math.max(
				max,
				scenicScores.reduce((prev, cur) => prev * cur),
				1
			);
		}
	}

	return max;
}

function solve(input: string): number {
	const forest = generateGridFromString(input);

	return getMaxScenicScore(forest);
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString().trimEnd();
	console.log(solve(input));
});
