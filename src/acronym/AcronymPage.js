import PropTypes from 'prop-types';
import { PhraseGeneratorParent } from '../PassphraseGenerator.js';

import { calculatePassphraseAndAcronymEntropy } from './acronymEntropyUtils.js';
import { FaRegCopy, FaCheck } from "react-icons/fa";

const acronymGrammarLabels = {
  90: "Medium",
  110: "Long",
}


const makeAcronymPassphrase = (passphrase) => {
  // Split the passphrase into words
  return passphrase.split(" ")
    .map(word => {
      // Check if the word is 'and' and replace it with '&'
      if (word.toLowerCase() === 'and') {
        return '&';
      }
      // Check if the word is a number and return the full number
      else if (!isNaN(word)) {
        return word;
      }
      // For other words, return the first character
      return word[0];
    })
    .join("");  // Join all the processed words into a single string
};



const AcronymLabeler = ({ passphrase, copyToClipboard, copiedBits, grammarBits }) => {
  if(!passphrase) {
    return null;
  }

  console.log("AcronymLabeler grammarBits:", grammarBits);

  const [acronym, acronymEntropy] = calculatePassphraseAndAcronymEntropy(passphrase, grammarBits);
  const acronymOnClipobard = `${acronym} (${passphrase})`;

  // const wordListEntropies = calculateWordListEntropy();
  // console.log("Word List Entropies:", wordListEntropies);

  // const totalEntropy = calculateAcronymEntropy(grammars[bits]);
  // console.log("Total Entropy of Acronym Password:", totalEntropy, "bits");
  
  // const acronymEntropy = calculatePassphraseSpecificAcronymEntropy(acronym, bits);
  console.log("Entropy of Specific Acronym:", acronymEntropy);

  return (
    <div className="relative passphrase-content mb-6" onClick={() => copyToClipboard(acronymOnClipobard, grammarBits)}>
      {passphrase}

      <div className="flex items-center font-bold mt-2">
        <span className="font-body text-sm uppercase mr-3">Acronym to use as password:</span> { acronym }
      </div>

      <span className="copy-button" >
        {copiedBits === grammarBits ? <FaCheck /> : <FaRegCopy />} {copiedBits === grammarBits ? 'Copied!' : 'Copy'}
      </span>
    </div>
  );
}

const AcronymPage = () => {
  return(
    <div className="container mx-auto p-4">
      <h2 className="page-title">Passphrase Acronym Generator</h2>

      <PhraseGeneratorParent
        type="acronym"
        base_grammar_labels={acronymGrammarLabels}
        Labeler={AcronymLabeler}
       />
    
  </div>
  )
}



AcronymLabeler.propTypes = {
  passphrase: PropTypes.string.isRequired,
  copyToClipboard: PropTypes.func.isRequired,
  copiedBits: PropTypes.number,
  bits: PropTypes.number.isRequired,
};

export default AcronymPage;