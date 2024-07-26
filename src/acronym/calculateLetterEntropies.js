const { grammars } = require('../words.js');
const { calculateWordListEntropy } = require('./acronymEntropyUtils.js')
const fs = require('fs');
const path = require('path');

// USAGE: npm run calculate-letter-entropies

function extractComponentEntropies(wordListEntropies) {
  const componentEntropies = {};

  Object.entries(wordListEntropies).forEach(([component, data]) => {
    componentEntropies[component] = {
      entropy: data.entropy,
      letterEntropies: {}
    };


    
    if (component === 'number') {
      // Skip letter by letter
    } else {
      Object.entries(data.probabilities).forEach(([letter, probability]) => {
        const entropy = -Math.log2(probability);
        componentEntropies[component].letterEntropies[letter] = entropy;
      });
    }
  });

  return componentEntropies;
}

function printAllCalculatedEntropies(grammars, componentEntropies) {
  const result = {};

  Object.entries(grammars).forEach(([grammarId, grammar]) => {
    if (grammar.includes('number')) {
      return; // Skip grammarIDs that include 'number'
    }
    result[grammarId] = {
      grammar,
      components: {},
      totalEntropy: 0
    };

    const components = grammar.split('|').map(comp => comp.split(':')[0].trim());
    let totalEntropy = 0;

    components.forEach((component) => {
      if (component === 'number') {
        const numbersEntropy = 10; // 1024 unique values => 10 bits of entropy
        result[grammarId].components[component] = {
          entropy: numbersEntropy,
          letterEntropies: {} // No need for letter entropies
        };
        totalEntropy += numbersEntropy;
      } else if (componentEntropies[component]) {
        result[grammarId].components[component] = {
          entropy: componentEntropies[component].entropy,
          letterEntropies: componentEntropies[component].letterEntropies
        };
        totalEntropy += componentEntropies[component].entropy;
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

const wordListEntropies = calculateWordListEntropy();
const componentEntropies = extractComponentEntropies(wordListEntropies);

const componentEntropiesString = JSON.stringify(componentEntropies, null, 2);

const fileContent = `
const componentLetterEntropies = ${componentEntropiesString};
`;

const filePath = path.join(__dirname, 'letterEntropies.js');
fs.writeFileSync(filePath, fileContent, 'utf8');
console.log(`Entropies have been written to ${filePath}`);
