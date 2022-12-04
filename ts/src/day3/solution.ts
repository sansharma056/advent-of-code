import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

function getItemPriority(item: string): number {
	if (item >= "a" && item <= "z") {
		const code = item.charCodeAt(0);
		return code - 97 + 1;
	} else if (item >= "A" && item <= "Z") {
		const code = item.charCodeAt(0);
		return code - 65 + 27;
	} else {
		return 0;
	}
}

function getCommonItemInRucksack(rucksack: string): string {
	const length = rucksack.length;
	const firstCompartment = new Map<string, boolean>();

	for (let i = 0; i < length / 2; i++) {
		const item = rucksack[i];
		firstCompartment.set(item, true);
	}

	for (let i = length / 2; i < length; i++) {
		const item = rucksack[i];
		if (firstCompartment.get(item)) {
			return item;
		}
	}

	return "";
}

function solve(input: string): number {
	const rucksacks = input.split("\n");
	let sum = 0;

	for (const rucksack of rucksacks) {
		const itemPriority = getItemPriority(getCommonItemInRucksack(rucksack));
		sum += itemPriority;
	}

	return sum;
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString().trim();
	console.log(solve(input));
});
