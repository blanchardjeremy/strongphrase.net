import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { timeToCrack, convertTimeToReadableFormat, getPassphrase, getPrimaryGrammarLabels, getAllGrammarLabels } from './utils.js';
import { FaRegCopy, FaCheck, FaSyncAlt, FaInfoCircle } from "react-icons/fa";

import './PassphraseGenerator.css';

const PassphraseGenerator = () => {
  const [passphrases, setPassphrases] = useState({});
  const [practiceInput, setPracticeInput] = useState('');
  const [copiedBits, setCopiedBits] = useState(null);
  const [hashRate, setHashRate] = useState(1e12);
  const [showHidden, setShowHidden] = useState(true);
  const [showAllGrammars, setShowAllGrammars] = useState(false);

  const numTotalGrammars = Object.keys(getAllGrammarLabels()).length;
  console.log(numTotalGrammars);

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
  }, [showAllGrammars]);
  
  const crackTimes = useMemo(() => {
    const grammar_labels = showAllGrammars ? getAllGrammarLabels() : getPrimaryGrammarLabels();
    console.log(getAllGrammarLabels);
    const grammar_keys = Object.keys(grammar_labels).map(Number);
    return grammar_keys.map(bits => ({
      bits,
      label: grammar_labels[bits],
      time: convertTimeToReadableFormat(timeToCrack(bits, hashRate))
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
    <section>
      <div className="passphrase-header">
        <button
          onClick={generatePassphrases}
          className="btn btn-primary text-xl text-white"
        >
          <FaSyncAlt /> New passphrases!
        </button>


        <div className="dropdown-container form-control">
          <label htmlFor="hashRateSelect" className="label mb-0 mr-3 text-sm tracking-wide block">Select attacker's computing power (2024 estimates):</label>
          <select
            id="hashRateSelect"
            value={hashRate}
            onChange={(e) => setHashRate(Number(e.target.value))}
            className="p-2 border rounded-lg select select-bordered max-w-px-900 w-full pr-10" 
          >
            {/* <option value={1e2}>Online attack (10 guesses/second)</option> */}
            {/* <option value={1e6}>Slow attack (1 million guesses/second)</option> */}
            <option value={1e10}>Standard consumer hardware (10 billion guesses/second)</option>
            {/* <option value={1e11}>High-end GPU (100 billion guesses/second)</option> */}
            <option value={1e12}>Best available consumer hardware (1 trillion guesses/second)</option>
            <option value={1e14}>Nation State Attacker (100 trillion guesses/second)</option>
          </select>
        </div>

        <button 
          onClick={() => setShowAllGrammars(!showAllGrammars)} 
          className="btn btn-sm mt-4 ml-10"
        >
          {showAllGrammars ? 'Show main formats only' : `Show all ${numTotalGrammars} formats`}
        </button>
      </div>

      <button 
        onClick={() => setShowHidden(true)} 
        className="btn btn-sm mt-4 mb-8"
        style={{ display: showHidden ? 'none' : 'block' }}
      >
        Show Hidden Passphrases
      </button>
      
      {crackTimes.map(({ bits, label, time }) => (
        <div key={bits} 
          className={`passphrase-block mb-6 ${
            copiedBits === bits ? 'copied' : 
            (copiedBits && !showHidden) ? 'hide' : ''
          }`}
        >
          <label className="block mb-1 tracking-wide uppercase">
            <div className="flex items-center">
              <span className={`font-bold inline-block w-30 ${label}`}>{label}</span>
              <span className={`ml-2 relative group ${showAllGrammars ? 'hide' : ''}`}>
                <div class="tooltip" data-tip={`${bits} bits of entropy`}>
                  <FaInfoCircle className="h-5 w-5 text-gray-500 cursor-pointer" />
                </div>
              </span>
              <div className="ml-2 flex-shrink-0">
                <span className="crack-time ml-2">Avg time to crack: <em>{time}</em></span>
              </div>
            </div>
          </label>
          <div className="relative passphrase-content" onClick={() => copyToClipboard(passphrases[bits], bits)}>
            {passphrases[bits]}
            <span className="copy-button" >
              {copiedBits === bits ? <FaCheck /> : <FaRegCopy />} {copiedBits === bits ? 'Copied!' : 'Copy'}
            </span>
          </div>
        </div>
      ))}

      <div className="mt-4 form-control">
        <label className="block font-bold mb-1 text-2xl label label-text">Practice typing the phrase:</label>
        <input
          type="text"
          value={practiceInput}
          onChange={(e) => setPracticeInput(e.target.value)}
          className="w-3/4 p-2 border rounded font-custom text-2xl"
        />
      </div>
    </section>
  );
};

export default PassphraseGenerator;