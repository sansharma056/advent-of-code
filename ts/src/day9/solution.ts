import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

function getNumOfVisitedPositions(instructions: string[]): number {
	const visited = new Set<string>();

	const head = [0, 0];
	const tail = [0, 0];

	for (const instruction of instructions) {
		const [direction, units] = instruction.split(" ");

		switch (direction) {
			case "D": {
				head[1] -= +units;

				while (tail[1] - 1 > head[1]) {
					tail[1]--;

					const horizontalDiff = head[0] - tail[0];
					if (horizontalDiff > 0) {
						tail[0]++;
					} else if (horizontalDiff < 0) {
						tail[0]--;
					}
					const position = tail[0] + " " + tail[1];
					visited.add(position);
				}
				break;
			}

			case "U": {
				head[1] += +units;

				while (tail[1] + 1 < head[1]) {
					tail[1]++;

					const horizontalDiff = head[0] - tail[0];
					if (horizontalDiff > 0) {
						tail[0]++;
					} else if (horizontalDiff < 0) {
						tail[0]--;
					}
					const position = tail[0] + " " + tail[1];
					visited.add(position);
				}
				break;
			}

			case "R": {
				head[0] += +units;

				while (tail[0] + 1 < head[0]) {
					tail[0]++;

					const verticalDiff = head[1] - tail[1];
					if (verticalDiff > 0) {
						tail[1]++;
					} else if (verticalDiff < 0) {
						tail[1]--;
					}
					const position = tail[0] + " " + tail[1];
					visited.add(position);
				}
				break;
			}

			case "L": {
				head[0] -= +units;

				while (tail[0] - 1 > head[0]) {
					tail[0]--;

					const verticalDiff = head[1] - tail[1];
					if (verticalDiff > 0) {
						tail[1]++;
					} else if (verticalDiff < 0) {
						tail[1]--;
					}
					const position = tail[0] + " " + tail[1];
					visited.add(position);
				}
				break;
			}
		}
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
