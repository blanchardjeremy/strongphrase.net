const { words, grammars } = require('../words.js');
const componentLetterEntropies = require('./letterEntropies').default;

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
function calculatePassphraseAndAcronymEntropy(passphrase, grammarId) {
  console.log('Passphrase:', passphrase);
  console.log('grammarId:', grammarId);

  const grammarString = grammars[grammarId];
  
  if (!grammarString) {
    throw new Error(`Grammar ID ${grammarId} not found`);
  }

  const components = grammarString.split('|').map(comp => comp.split(':')[0].trim());
  const passphraseWords = passphrase.split(' ');
  let totalEntropy = 0;
  let acronym = '';
  let wordIndex = 0;

  components.forEach((component) => {
    const skipList = ['', ' ', 'and', 'in'];

    if (skipList.includes(component)) {
      // Skip zero entropy components and corresponding word
      if (component === 'and') {
        acronym += '&';
        wordIndex++;
      } else if (component === 'in') {
        acronym += 'i';
        wordIndex++;
      }
      return;
    }

    // If the component is 'number', treat it as one unit of entropy
    if (component === 'number') {
      const number = passphraseWords[wordIndex];
      acronym += number;
      totalEntropy += 10; // Always add 10 bits of entropy for numbers
      wordIndex++;
      return;
    }

    const word = passphraseWords[wordIndex];
    const wordParts = word.split(/[\s-]+/); // Split by spaces or hyphens
    wordParts.forEach((part, partIndex) => {
      const letter = part[0];
      acronym += letter;
      if (partIndex === 0) { // Only add entropy for the first part
        const letterEntropy = componentLetterEntropies[component]?.letterEntropies[letter];
        console.log(`Letter '${letter}' in component '${component}' has entropy of ${letterEntropy}`);

        if (letterEntropy !== undefined) {
          totalEntropy += letterEntropy;
        } else {
          console.warn(`Letter '${letter}' in component '${component}' not found in letterEntropies`);
        }
      }
    });

    wordIndex++;
  });

  console.log('Acronym:', acronym);
  return [acronym, totalEntropy];
}




// Export functions
module.exports = {
  calculateWordListEntropy,
  calculateAcronymEntropy,
  calculatePassphraseAndAcronymEntropy
};