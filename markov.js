/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    this.words.forEach(function(value, index, arr) {

      let word = value;
      let nextWord = arr[index+1];

      if (!(word in chains)) {
        if(nextWord) {
          chains[word] = [nextWord];
        }
        else {
          chains[word] = [null];
        }
      }

      else {
        if(nextWord) {
          chains[word].push(nextWord);
        }
        else {
          chains[word].push(null);
        }
      }
    })
    
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let text = [];
    let wordIdx, word, chainIdx, chainWord;
    let count=numWords;
    let state = "start";

    for(let i=numWords; i>0; i--) {
      if(state == "start") {
        //choose new random word
        wordIdx = Math.floor(Math.random() * this.words.length);
        word = this.words[wordIdx];
        text.push(word);
        state = "chain";
        count--;
      }

      else {
        //choose random next word from chains for first word
        chainIdx = Math.floor(Math.random() * this.chains[word].length);
        chainWord = this.chains[word][chainIdx];
        if(chainWord) {
          word = chainWord;
          text.push(chainWord);
        }
        else {
          text.push(".");
          state = "start";
        }
        count--;
      }
      
    }
    let output = text.join(' ');
    console.log(output);
  }
}
 