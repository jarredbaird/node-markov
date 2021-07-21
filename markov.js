/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    this.words.reduce((chain, cur, i, words) => {
      // console.log(i, " cur: ", cur);
      // console.log(i, " chain: ", chain);
      // console.log(i, " words: ", words);
      if (cur in chain) {
        if (words[i + 1]) {
          chain[cur].push(words[i + 1]);
        } else {
          chain[cur].push(null);
        }
      } else {
        if (words[i + 1]) {
          chain[cur] = [words[i + 1]];
        } else {
          chain[cur] = [null];
        }
      }
      this.chain = chain;
      return chain;
    }, {});
  }

  /** return random text from chains */

  static getRandomWord(arr) {
    return arr[Math.floor(arr.length * Math.random())];
  }

  makeText(numWords = 100) {
    // TODO
    let markovText = [];
    let keys = Object.keys(this.chain);
    let randomVal = MarkovMachine.getRandomWord(keys);
    for (let i = 0; i < numWords; i++) {
      if (randomVal === null) {
        return markovText.join(" ");
      }
      markovText.push(randomVal);
      randomVal = MarkovMachine.getRandomWord(this.chain[randomVal]);
    }
    return markovText.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
