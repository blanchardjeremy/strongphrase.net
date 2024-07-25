const { grammars } = require('../words.js');
const { calculateWordListEntropy } = require('./acronymEntropyUtils.js')
const fs = require('fs');
const path = require('path');

// USAGE: npm run calculate-letter-entropies


function printAllCalculatedEntropies(grammars) {
  const wordListEntropies = calculateWordListEntropy();
  const result = {};

  Object.entries(grammars).forEach(([grammarId, grammar]) => {
    result[grammarId] = {
      grammar,
      components: {},
      totalEntropy: 0
    };

    const components = grammar.split('|').map(comp => comp.split(':')[0].trim());
    let totalEntropy = 0;

    components.forEach((component, index) => {
      if (component === 'number') {
        const numbersEntropy = 10; // 1024 unique values => 10 bits of entropy
        result[grammarId].components[component] = {
          entropy: numbersEntropy,
          letterEntropies: {} // No need for letter entropies
        };
        totalEntropy += numbersEntropy;
      } else if (wordListEntropies[component]) {
        const componentEntropies = {};
        Object.entries(wordListEntropies[component].probabilities).forEach(([letter, probability]) => {
          const entropy = -Math.log2(probability);
          componentEntropies[letter] = entropy;
        });
        result[grammarId].components[component] = {
          entropy: wordListEntropies[component].entropy,
          letterEntropies: componentEntropies
        };
        totalEntropy += wordListEntropies[component].entropy;
      } else {
        result[grammarId].components[component] = {
          entropy: 0,
          letterEntropies: {}
        };
      }
    });

    result[grammarId].totalEntropy = totalEntropy;
  });

  return result;
}


const calculatedEntropies = printAllCalculatedEntropies(grammars);
const calculatedEntropiesString = JSON.stringify(calculatedEntropies, null, 2);
// console.log(calculatedEntropiesString);


const fileContent = `
const grammarLetterEntropies = ${calculatedEntropiesString}

export default grammarLetterEntropies;`


const filePath = path.join(__dirname, 'letterEntropies.js');
fs.writeFileSync(filePath, fileContent, 'utf8');
console.log(`Entropies have been written to ${filePath}`);