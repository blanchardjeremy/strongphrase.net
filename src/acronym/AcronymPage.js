import { PhraseGeneratorParent } from '../PassphraseGenerator.js';
import { calculatePassphraseAndAcronymEntropy } from './acronymEntropyUtils.js';
import { PassphraseItem } from '../PassphraseGenerator.js';


const acronymGrammarLabels = {
  90: "Medium",
  110: "Long",
}


const AcronymItem = (props) => {
  const { passphrase, grammarBits, label } = props;
  if(!passphrase) {
    return null;
  }

  console.log("AcronymItem grammarBits:", grammarBits);
  console.log(props);

  const [acronym, acronymEntropy] = calculatePassphraseAndAcronymEntropy(passphrase, grammarBits);
  const acronymEntropyRounded = Number(acronymEntropy.toPrecision(2))
  const acronymOnClipobard = `${acronym} (${passphrase})`;

  console.log("Entropy of Specific Acronym:", acronymEntropy);

  return (
    <PassphraseItem 
        {...props}
        label={`${label} (${acronymEntropyRounded} bits)`}
        entropy={acronymEntropyRounded}
        clipboardVersion={acronymOnClipobard}
        grammarBits={grammarBits}
    >
      <div className="flex items-center font-bold mt-2">
        <span className="font-body text-sm uppercase mr-3">Acronym to use as password:</span> { acronym }
      </div>
    </PassphraseItem>
  )
}

const AcronymPage = () => {
  return(
    <div className="container mx-auto p-4">
      <h2 className="page-title">Passphrase Acronym Generator</h2>

      <PhraseGeneratorParent
        type="acronym"
        base_grammar_labels={acronymGrammarLabels}
        ItemComponent={AcronymItem}
      />
    
  </div>
  )
}



export default AcronymPage;