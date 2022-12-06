import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

function findStartOfPacketMarker(packet: string): number {
	const WINDOW_SIZE = 14;
	let windowStart = 0;
	let windowEnd = 0;

	while (windowEnd < packet.length) {
		if (windowEnd - windowStart + 1 === WINDOW_SIZE) {
			const set = new Set(packet.slice(windowStart, windowEnd + 1));
			if (set.size == WINDOW_SIZE) {
				return windowEnd + 1;
			}

			windowStart++;
		}

		windowEnd++;
	}

	return 0;
}

function solve(input: string) {
	for (const t of input.split("\n")) {
		console.log(findStartOfPacketMarker(t));
	}
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString().trimEnd();
	console.log(solve(input));
});
