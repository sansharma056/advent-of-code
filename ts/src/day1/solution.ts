import { readFile } from "fs";

const args = process.argv;
const path = args[2];

function solve(input: string): number {
	const inventory = input.split("\n");

	const maxElfCalories = [-1, -1, -1]; // small, mid, large

	let calories = 0;
	for (let i = 0; i < inventory.length; i++) {
		const calorie = parseInt(inventory[i]);

		if (Number.isNaN(calorie)) {
			if (calories > maxElfCalories[2]) {
				maxElfCalories[0] = maxElfCalories[1];
				maxElfCalories[1] = maxElfCalories[2];
				maxElfCalories[2] = calories;
			} else if (calories > maxElfCalories[1]) {
				maxElfCalories[0] = maxElfCalories[1];
				maxElfCalories[1] = calories;
			} else if (calories > maxElfCalories[0]) {
				maxElfCalories[0] = calories;
			}

			calories = 0;
		} else {
			calories += calorie;
		}
	}

	if (calories > maxElfCalories[2]) {
		maxElfCalories[0] = maxElfCalories[1];
		maxElfCalories[1] = maxElfCalories[2];
		maxElfCalories[2] = calories;
	} else if (calories > maxElfCalories[1]) {
		maxElfCalories[0] = maxElfCalories[1];
		maxElfCalories[1] = calories;
	} else if (calories > maxElfCalories[0]) {
		maxElfCalories[0] = calories;
	}

	return maxElfCalories.reduce((prev, sum) => prev + sum, 0);
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString();
	console.log(solve(input));
});
