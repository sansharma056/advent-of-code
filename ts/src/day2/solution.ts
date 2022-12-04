import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

function getScoreBasedOnRules(opp: string, you: string): number {
	const didYouWin =
		(you === "X" && opp === "C") ||
		(you === "Y" && opp === "A") ||
		(you === "Z" && opp === "B");

	const didYouDraw =
		(you === "X" && opp === "A") ||
		(you === "Y" && opp === "B") ||
		(you === "Z" && opp === "C");

	let score = 0;

	if (didYouWin) {
		score += 6;
	} else if (didYouDraw) {
		score += 3;
	}

	if (you === "X") {
		score += 1;
	} else if (you === "Y") {
		score += 2;
	} else {
		score += 3;
	}

	return score;
}

function solve(input: string): number {
	const rounds = input.trim().split("\n");

	const totalScore = rounds.reduce((prev: number, round: string): number => {
		const [opp, you] = round.split(" ");
		const score = getScoreBasedOnRules(opp, you);

		return prev + score;
	}, 0);

	return totalScore;
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString();
	console.log(solve(input));
});
