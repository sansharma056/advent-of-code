import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

type Direction = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";
const DIRECTIONS: Direction[] = ["TOP", "RIGHT", "BOTTOM", "LEFT"];

type VisibilityInfo = {
	isEdge: boolean;
	directions: Direction[];
} | null;

function generateGridFromString(input: string): number[][] {
	const grid: number[][] = [];

	const lines = input.split("\n");

	for (const line of lines) {
		grid.push(line.split("").map((x) => +x));
	}

	return grid;
}

function isVisibleInSpecificDirection(
	forest: number[][],
	pos: [number, number],
	direction: Direction,
	parentHeight: number
): boolean {
	const ROW_NUM = forest.length;
	const COL_NUM = forest[0].length;

	const [x, y] = pos;

	if (x === 0 || x === ROW_NUM - 1 || y === 0 || y === COL_NUM - 1) {
		return true;
	}

	let result = false;
	switch (direction) {
		case "TOP": {
			const nextHeight = forest[x - 1][y];

			result =
				parentHeight > nextHeight &&
				isVisibleInSpecificDirection(
					forest,
					[x - 1, y],
					direction,
					parentHeight
				);
			break;
		}
		case "RIGHT": {
			const nextHeight = forest[x][y + 1];

			result =
				parentHeight > nextHeight &&
				isVisibleInSpecificDirection(
					forest,
					[x, y + 1],
					direction,
					parentHeight
				);
			break;
		}
		case "BOTTOM": {
			const nextHeight = forest[x + 1][y];

			result =
				parentHeight > nextHeight &&
				isVisibleInSpecificDirection(
					forest,
					[x + 1, y],
					direction,
					parentHeight
				);
			break;
		}
		case "LEFT": {
			const nextHeight = forest[x][y - 1];

			result =
				parentHeight > nextHeight &&
				isVisibleInSpecificDirection(
					forest,
					[x, y - 1],
					direction,
					parentHeight
				);
			break;
		}
	}

	return result;
}

function getNumberOfVisibleTrees(forest: number[][]): number {
	const ROW_NUM = forest.length;
	const COL_NUM = forest[0].length;

	const visibilityCache: VisibilityInfo[][] = [];

	for (let i = 0; i < ROW_NUM; i++) {
		const row: VisibilityInfo[] = [];

		for (let j = 0; j < COL_NUM; j++) {
			row.push(null);
		}

		visibilityCache.push(row);
	}

	let count = 0;

	for (let i = 0; i < ROW_NUM; i++) {
		for (let j = 0; j < COL_NUM; j++) {
			let isVisible = false;
			DIRECTIONS.forEach((direction) => {
				if (
					isVisibleInSpecificDirection(forest, [i, j], direction, forest[i][j])
				) {
					isVisible = true;
				}
			});

			count += isVisible ? 1 : 0;
		}
	}

	return count;
}

function solve(input: string): number {
	const forest = generateGridFromString(input);

	return getNumberOfVisibleTrees(forest);
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString().trimEnd();
	console.log(solve(input));
});
