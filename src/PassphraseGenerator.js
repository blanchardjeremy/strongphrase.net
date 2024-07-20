import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { timeToCrack, convertTimeToReadableFormat, getPassphrase, getPrimaryGrammarLabels, getAllGrammarLabels } from './utils.js';
import { FaRegCopy, FaCheck, FaSyncAlt, FaInfoCircle, FaKey } from "react-icons/fa";

import './PassphraseGenerator.css';

const PassphraseGenerator = () => {
  const [passphrases, setPassphrases] = useState({});
  const [practiceInput, setPracticeInput] = useState('');
  const [copiedBits, setCopiedBits] = useState(null);
  const [hashRate, setHashRate] = useState(1e10);
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
    setPracticeInput('');
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
      <div className="flex flex-col md:flex-row gap-3 items-end justify-start mb-10">
        <button
          onClick={generatePassphrases}
          className="btn btn-primary text-base md:text-xl text-white mb-2 md:mb-0"
        >
          <FaSyncAlt /> New passphrases!
        </button>
        
        <div className="dropdown-container form-control mb-2 md:mb-0">
          <label htmlFor="hashRateSelect" className="label text-xs font-bold tracking-wide block">Select attacker's power (2024 estimates):</label>
          <select
            id="hashRateSelect"
            value={hashRate}
            onChange={(e) => setHashRate(Number(e.target.value))}
            className="border rounded-lg select select-bordered select-sm w-full"
          >
            {/* <option value={1e2}>Online attack [10 guesses/sec]</option> */}
            {/* <option value={1e6}>Slow attack [1 million guesses/sec]</option> */}
            <option value={1e10}>Standard consumer hardware [10 billion guesses/sec]</option>
            {/* <option value={1e11}>High-end GPU [100 billion guesses/sec]</option> */}
            <option value={1e12}>Best available consumer hardware [1 trillion guesses/sec]</option>
            <option value={1e14}>Nation state (NSA, etc.) [100 trillion guesses/sec]</option>
          </select>
        </div>

        <button 
          onClick={() => setShowAllGrammars(!showAllGrammars)} 
          className="btn btn-sm btn-outline"
        >
          {showAllGrammars ? 'Show main formats only' : `Show all ${numTotalGrammars} formats`}
        </button>

        <button 
          onClick={() => setShowHidden(true)} 
          className="btn btn-sm btn-outline"
          style={{ display: showHidden ? 'none' : 'block' }}
        >
          Show hidden passphrases
        </button>
        
      </div>

      
      {crackTimes.map(({ bits, label, time }) => (
        <div key={bits} 
          className={`passphrase-block mb-6 ${
            copiedBits === bits ? 'copied' : 
            (copiedBits && !showHidden) ? 'hide' : ''
          }`}
        >
          <label className="block mb-1 tracking-wide uppercase">
            <div className="flex items-center">
              <span className={`font-header font-extrabold text-xl inline-block w-30 ${label}`}>{label}</span>
              <span className={`ml-2 group  ${showAllGrammars ? 'hide' : ''}`}>
                <div className="tooltip mt-1" data-tip={`${bits} bits of entropy`}>
                  <FaInfoCircle className=" text-gray-500 cursor-pointer text-base" />
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

      <div className="mt-12 form-control text-secondary">
        <span className="block font-header font-extrabold mb-1 text-2xl label label-text text-secondary">Practice typing the phrase</span>
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
    </section>
  );
};

export default PassphraseGenerator;