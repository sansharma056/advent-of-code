import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

type OppMoves = "A" | "B" | "C";
type YourMoves = "X" | "Y" | "Z";

type MoveCounter = Record<OppMoves, YourMoves>;

const WIN_MOVE: MoveCounter = {
	A: "Y",
	B: "Z",
	C: "X",
};

const LOSS_MOVE: MoveCounter = {
	A: "Z",
	B: "X",
	C: "Y",
};

const DRAW_MOVE: MoveCounter = {
	A: "X",
	B: "Y",
	C: "Z",
};

function getScoreBasedOnRules(opp: OppMoves, you: YourMoves): number {
	if (you === "X") {
		you = LOSS_MOVE[opp];
	} else if (you === "Y") {
		you = DRAW_MOVE[opp];
	} else {
		you = WIN_MOVE[opp];
	}

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
		const moves = round.split(" ") as [OppMoves, YourMoves];
		const [opp, you]: [OppMoves, YourMoves] = moves;
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
