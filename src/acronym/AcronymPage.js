import { PhraseGeneratorParent } from '../PassphraseGenerator.js'
import { FaRegCopy, FaCheck } from "react-icons/fa";

const acronymGrammarLabels = {
  110: "Baseline",
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

// Test the function
console.log(makeAcronymPassphrase("underage worker and snobbish lemming discover 85 bogus teacups and 1977 crumbly cheetahs in Iowa"));



const AcronymLabeler = ({ passphrase, copyToClipboard, copiedBits, bits }) => {
  const acronym = makeAcronymPassphrase(passphrase);
  const acronymOnClipobard = `${acronym} (${passphrase})`;

  return (
    <div className="relative passphrase-content mb-6" onClick={() => copyToClipboard(acronymOnClipobard, bits)}>
      {passphrase}

      <div className="flex items-center font-bold">
        <span className="font-body text-sm uppercase mr-3">Aconrym:</span> { acronym }
      </div>

      <span className="copy-button" >
        {copiedBits === bits ? <FaCheck /> : <FaRegCopy />} {copiedBits === bits ? 'Copied!' : 'Copy'}
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


export default AcronymPage;