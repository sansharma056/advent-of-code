import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

function areRangesOverlapping(ranges: string[]): boolean {
	const parsedRanges = ranges.map((range) =>
		range.split("-").map((v) => +v)
	) as [number, number][];

	const [r1, r2] = parsedRanges;

	// return (
	// 	(r1[0] <= r2[0] && r2[0] <= r1[1]) || (r2[0] <= r1[0] && r2[1] <= r1[1])
	// );

	return (
		(r1[0] < r2[0] && r2[0] <= r1[1]) ||
		(r1[0] > r2[0] && r1[0] <= r2[1]) ||
		r1[0] === r2[0]
	);
}

function solve(input: string): number {
	const pairs: string[] = input.split("\n");
	const overLappingPairs = pairs.filter((pair) => {
		const ranges: string[] = pair.split(",");
		console.log(ranges, areRangesOverlapping(ranges));
		return areRangesOverlapping(ranges);
	});

	return overLappingPairs.length;
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString().trim();
	console.log(solve(input));
});
