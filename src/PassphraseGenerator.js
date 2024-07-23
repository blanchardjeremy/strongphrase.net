import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { timeToCrackAvg, convertTimeToReadableFormat, getPassphrase, getPrimaryGrammarLabels, getAllGrammarLabels, formatDollarToScale, avgCostToCrack } from './utils.js';
import HashRateSelector, { defaultHashRate } from './HashRateSelector';
import { FaRegCopy, FaCheck, FaSyncAlt, FaInfoCircle, FaKey } from "react-icons/fa";

import './PassphraseGenerator.css';


const PassphraseGenerator = () => {
  const [passphrases, setPassphrases] = useState({});
  const [practiceInput, setPracticeInput] = useState('');
  const [copiedBits, setCopiedBits] = useState(null);
  const [hashRate, setHashRate] = useState(defaultHashRate);
  const [showHidden, setShowHidden] = useState(true);
  const [showAllGrammars, setShowAllGrammars] = useState(false);

  const numTotalGrammars = Object.keys(getAllGrammarLabels()).length;

  const generatePassphrases = useCallback(() => {
    const newPassphrases = {};
    const grammar_labels = showAllGrammars ? getAllGrammarLabels() : getPrimaryGrammarLabels();
    const grammar_keys = Object.keys(grammar_labels).map(Number);
    grammar_keys.forEach(bits => {
      newPassphrases[bits] = getPassphrase(bits);
    });
    setPassphrases(newPassphrases);
    // Reset everything 
    setCopiedBits(null);
    setShowHidden(true);
    setPracticeInput('');

  }, [showAllGrammars]);

  
  const crackTimes = useMemo(() => {
    const grammar_labels = showAllGrammars ? getAllGrammarLabels() : getPrimaryGrammarLabels();
    const grammar_keys = Object.keys(grammar_labels).map(Number);
    return grammar_keys.map(bits => ({
      bits,
      label: grammar_labels[bits],
      time: convertTimeToReadableFormat(timeToCrackAvg(bits, hashRate)),
      cost: formatDollarToScale(avgCostToCrack(bits))
    }));
  }, [hashRate, showAllGrammars]);

  const copyToClipboard = useCallback((text, bits) => {
    navigator.clipboard.writeText(text);
    setCopiedBits(null); // Reset first to ensure transition can trigger
    setTimeout(() => {
      setCopiedBits(bits); // Then set the new copied bits after a very short delay
    }, 10); // A very short delay
    setShowHidden(false);
  }, []);

  // Use the useEffect hook to generate the passphrases when the component is first loaded
  useEffect(() => {
    generatePassphrases();
  }, [generatePassphrases]);
  
  

  return (
    <section className="content">
      <div className="flex flex-col md:flex-row gap-3 items-end justify-start mb-10">
        <button
          onClick={generatePassphrases}
          className="btn btn-primary text-base md:text-xl text-white mb-2 md:mb-0"
        >
          <FaSyncAlt /> New passphrases!
        </button>

        <HashRateSelector setHashRate={setHashRate} hashRate={hashRate} />



        <button 
          onClick={() => setShowAllGrammars(!showAllGrammars)} 
          className="btn btn-sm"
        >
          {showAllGrammars ? 'Show main formats only' : `Show all ${numTotalGrammars} formats`}
        </button>

        <button 
          onClick={() => setShowHidden(true)} 
          className="btn btn-sm"
          style={{ display: showHidden ? 'none' : 'block' }}
        >
          Show hidden passphrases
        </button>
        
      </div>

      
      {crackTimes.map(({ bits, label, time, cost }) => (
        <div key={bits} 
          className={`passphrase-block ${
            copiedBits === bits ? 'copied' : 
            (copiedBits && !showHidden) ? 'hide' : ''
          }`}
        >
          <label className="block mb-1 tracking-wide uppercase">
            <div className="flex items-center">
              <div className="label-container">
                <span className={`font-header font-extrabold text-xl inline-block ${label}`}>{label}</span>
                <span className={`ml-2 group  ${showAllGrammars ? 'hide' : ''}`}>
                  <div className="tooltip mt-1" data-tip={`${bits} bits of entropy`}>
                    <FaInfoCircle className=" text-gray-500 cursor-pointer text-base" />
                  </div>
                </span>
              </div>
              <div className="crack-time-info">
                <div className="crack-stats-container">
                  <span className="crack-time ml-2">Avg time to crack: <em>{time}</em></span>
                </div>
                <div className="crack-stats-container">
                  <span className="crack-time ml-2">Avg cost to crack: <em>{cost}</em></span>
                </div>
              </div>
            </div>
          </label>
          <div className="relative passphrase-content mb-6" onClick={() => copyToClipboard(passphrases[bits], bits)}>
            {passphrases[bits]}
            <span className="copy-button" >
              {copiedBits === bits ? <FaCheck /> : <FaRegCopy />} {copiedBits === bits ? 'Copied!' : 'Copy'}
            </span>
          </div>
        </div>
      ))}


      <div className="card bg-blue-100 w-full shadow-xl mt-12">
        <div className="card-body form-control text-secondary">
          <span className="block font-header font-extrabold text-2xl mt-0 pt-0 label label-text text-secondary">Practice typing the phrase</span>
          <label className="input input-bordered flex items-center gap-2 p-2 border rounded font-custom text-xl input-secondary">
          
            <FaKey className="text-base" />
            
            <input
              type="text"
              value={practiceInput}
              onChange={(e) => setPracticeInput(e.target.value)}
              className="grow"
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default PassphraseGenerator;