const { words } = require('../words.js');
const grammarLetterEntropies = require('./letterEntropies').default;

// Function to calculate entropy
function calculateEntropy(probabilities) {
  return -probabilities.reduce((entropy, p) => {
    return p > 0 ? entropy + p * Math.log2(p) : entropy;
  }, 0);
}

// Function to count the first letters
function countFirstLetters(wordList) {
  const counts = {};
  wordList.forEach(word => {
    const firstLetter = word.charAt(0);
    if (counts[firstLetter]) {
      counts[firstLetter]++;
    } else {
      counts[firstLetter] = 1;
    }
  });
  return counts;
}

// Function to calculate probabilities
function calculateProbabilities(counts, total) {
  const probabilities = {};
  for (const [letter, count] of Object.entries(counts)) {
    probabilities[letter] = count / total;
  }
  return probabilities;
}

// Function to calculate entropy of each word list
function calculateWordListEntropy() {
  const entropies = {};
  for (const [key, wordList] of Object.entries(words)) {
    if (key === 'number') {
      const totalWords = wordList.length;
      const entropy = Math.log2(totalWords);
      entropies[key] = {
        entropy,
        probabilities: wordList.reduce((acc, num) => {
          acc[num] = 1 / totalWords;
          return acc;
        }, {}),
        counts: wordList.reduce((acc, num) => {
          acc[num] = 1;
          return acc;
        }, {})
      };
    } else {
      const totalWords = wordList.length;
      const firstLetterCounts = countFirstLetters(wordList);
      const probabilities = calculateProbabilities(firstLetterCounts, totalWords);
      const entropy = calculateEntropy(Object.values(probabilities));
      entropies[key] = {
        entropy,
        probabilities,
        counts: firstLetterCounts
      };

    }
  }
  return entropies;
}

// Function to calculate the total average entropy of an acronym password based on the grammar
function calculateAcronymEntropy(grammar) {
  const components = grammar.split('|').map(comp => comp.split(':')[0].trim());
  let totalEntropy = 0;
  const wordListEntropies = calculateWordListEntropy();

  components.forEach(component => {
    if (wordListEntropies[component]) {
      totalEntropy += wordListEntropies[component].entropy;
    }
  });

  return totalEntropy;
}

// Function to calculate the entropy of a specific passphrase-turned-acronym considering the grammar
function calculatePassphraseSpecificAcronymEntropy(passphrase, grammarId) {
  const grammar = grammarLetterEntropies[grammarId];
  
  if (!grammar) {
    throw new Error(`Grammar ID ${grammarId} not found`);
  }

  const components = grammar.components;
  const passphraseLetters = passphrase.split('');
  let totalEntropy = 0;

  passphraseLetters.forEach((letter, index) => {
    const component = components[index];
    const letterEntropy = grammar.components[component]?.letterEntropies[letter];
    
    if (letterEntropy !== undefined) {
      totalEntropy += letterEntropy;
    } else {
      console.warn(`Letter '${letter}' in component '${component}' not found in letterEntropies`);
    }
  });

  return totalEntropy;
}



// Export functions
module.exports = {
  calculateWordListEntropy,
  calculateAcronymEntropy,
  calculatePassphraseSpecificAcronymEntropy
};