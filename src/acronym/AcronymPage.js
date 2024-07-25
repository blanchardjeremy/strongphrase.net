import { PhraseGeneratorParent } from '../PassphraseGenerator.js'
import { FaRegCopy, FaCheck } from "react-icons/fa";

const acronymGrammarLabels = {
  110: "Baseline",
}

const makeAcronymPassphrase = (passphrase) => {
  return passphrase.split(" ").map(word => word[0]).join("");
}


const AcronymLabel = ({ passphrase, copyToClipboard, copiedBits, bits }) => {
  return (
    <div className="relative passphrase-content mb-6" onClick={() => copyToClipboard(passphrase, bits)}>
      {passphrase}

      <div className="flex items-center font-bold">
        <span className="font-body text-sm uppercase mr-3">Aconrym:</span> { makeAcronymPassphrase(passphrase) }
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
        Labeler={AcronymLabel}
       />
    
  </div>
  )
}


export default AcronymPage;