class Trie {
  private root: TrieNode | null;

  constructor() {
    this.root = null;
  }

  public add(word: string): void {
    let cur: TrieNode | null = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const charCode = char.charCodeAt(0);

      if (!this.root) {
        this.root = new TrieNode(false);
        cur = this.root;
      }

      if (!cur!.children[charCode - 97]) {
        cur!.children[charCode - 97] = new TrieNode(i === word.length - 1);
      }

      cur = cur!.children[charCode - 97];
    }
  }

  public genericSearch(value: string): TrieNode | null {
    if (!this.root) {
      return null;
    }

    let cur = this.root!;

    for (const char of value) {
      const charCode = char.charCodeAt(0);

      if (!cur.children[charCode - 97]) {
        return null;
      }

      cur = cur.children[charCode - 97]!;
    }

    return cur;
  }
}

class TrieNode {
  public children: (TrieNode | null)[];
  public end: boolean;

  constructor(end: boolean) {
    this.end = end;
    this.children = Array(26).fill(null);
  }
}

const numberFrontMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numberBackMap: Record<string, number> = {
  eno: 1,
  owt: 2,
  eerht: 3,
  ruof: 4,
  evif: 5,
  xis: 6,
  neves: 7,
  thgie: 8,
  enin: 9,
};

const numberFrontTrie = new Trie();
Object.keys(numberFrontMap).forEach((k) => numberFrontTrie.add(k));

const numberBackTrie = new Trie();
Object.keys(numberBackMap).forEach((k) => numberBackTrie.add(k));

function isNumber(x: string): boolean {
  return +x === +x;
}

function getCalibrationNumber(calibrationString: string): number {
  let frStart = 0;
  let frEnd = 0;

  let seStart = calibrationString.length - 1;
  let seEnd = calibrationString.length - 1;

  let firstDigit = 0;
  let secondDigit = 0;

  while (!firstDigit || !secondDigit) {
    const frChar = calibrationString[frEnd];
    const seChar = calibrationString[seEnd];

    if (!firstDigit) {
      if (isNumber(frChar)) {
        firstDigit = +frChar;
      } else {
        const substr = calibrationString.slice(frStart, frEnd + 1);

        const trieNode = numberFrontTrie.genericSearch(substr);

        if (trieNode === null) {
          frEnd = ++frStart;
        } else if (trieNode.end) {
          firstDigit = numberFrontMap[substr];
        } else {
          frEnd++;
        }
      }
    }

    if (!secondDigit) {
      if (isNumber(seChar)) {
        secondDigit = +seChar;
      } else {
        const substr = calibrationString
          .slice(seEnd, seStart + 1)
          .split("")
          .reverse()
          .join("");

        const trieNode = numberBackTrie.genericSearch(substr);

        if (trieNode === null) {
          seEnd = --seStart;
        } else if (trieNode.end) {
          secondDigit = numberBackMap[substr];
        } else {
          seEnd--;
        }
      }
    }
  }

  return firstDigit * 10 + secondDigit;
}

function solve(lines: string[]): number {
  return lines.reduce((prev, cur) => prev + getCalibrationNumber(cur), 0);
}

function main() {
  console.log(solve(Deno.readTextFileSync("input/pi").trim().split("\n")));
}

if (import.meta.main) {
  main();
}
