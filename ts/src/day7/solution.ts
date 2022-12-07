import { readFile } from "fs";
import { argv } from "process";

const path = argv[2];

class File {
	fileName: string;
	size: number;

	constructor(fileName: string, size: number) {
		this.fileName = fileName;
		this.size = size;
	}
}

class Folder {
	folderName: string;
	children: Map<string, File | Folder>;
	parent: Folder | null;

	constructor(folderName: string, parent: Folder | null) {
		this.folderName = folderName;
		this.children = new Map<string, File | Folder>();
		this.parent = parent;
	}

	getSize(): number {
		let size = 0;

		for (const child of this.children.values()) {
			if (child instanceof File) {
				size += child.size;
			} else {
				size += child.getSize();
			}
		}

		return size;
	}
}

function generateVirtualFilesystem(terminal: string[]): Folder {
	const root = new Folder("/", null);
	let current = root;

	for (let i = 0; i < terminal.length; i++) {
		const line = terminal[i];

		if (line.startsWith("$ cd")) {
			const folderName = line.split(" ")[2];

			if (folderName === "/") {
				current = root;
			} else if (folderName === "..") {
				if (current.parent !== null) {
					current = current.parent;
				}
			} else {
				const next = current.children.get(folderName);

				if (!next || next instanceof File) {
					throw new Error(":-( not a valid directory");
				}

				current = next;
			}
		} else if (line.startsWith("$ ls")) {
			continue;
		} else if (line.startsWith("dir")) {
			const [, folderName] = line.split(" ");
			if (!current.children.has(folderName)) {
				current.children.set(folderName, new Folder(folderName, current));
			}
		} else {
			const [size, fileName] = line.split(" ");
			current.children.set(fileName, new File(fileName, +size));
		}
	}

	return root;
}

function findDirectories(root: Folder): number {
	const size = root.getSize();
	let sum = 0;

	if (size <= 100000) {
		sum += size;
	}

	for (const child of root.children.values()) {
		if (child instanceof Folder) {
			sum += findDirectories(child);
		}
	}

	return sum;
}

function solve(input: string): number {
	const terminal = input.split("\n");

	const root = generateVirtualFilesystem(terminal);

	return findDirectories(root);
}

readFile(path, (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	const input = data.toString().trimEnd();
	console.log(solve(input));
});
