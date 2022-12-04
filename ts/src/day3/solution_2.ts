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

function getGroups(rucksacks: string[]): string[][] {
	const groups: string[][] = [];

	let group: string[] = [];
	for (const rucksack of rucksacks) {
		group.push(rucksack);

		if (group.length === 3) {
			groups.push([...group]);
			group = [];
		}
	}

	return groups;
}

function getCommonItemsInRucksack(
	rucksack1: string,
	rucksack2: string
): string {
	const commonItemsMap = new Map<string, boolean>();
	const rucksack1Map = new Map<string, boolean>();

	for (const item of rucksack1) {
		rucksack1Map.set(item, true);
	}

	for (const item of rucksack2) {
		if (rucksack1Map.get(item)) {
			commonItemsMap.set(item, true);
		}
	}

	return Array.from(commonItemsMap.keys()).join("");
}

function getCommonItemInGroup(group: string[]): string {
	return getCommonItemsInRucksack(
		getCommonItemsInRucksack(group[0], group[1]),
		group[2]
	);
}

function solve(input: string): number {
	const rucksacks = input.split("\n");
	const groups = getGroups(rucksacks);

	let sum = 0;

	for (const group of groups) {
		const itemPriority = getItemPriority(getCommonItemInGroup(group));
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
