import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { timeToCrack, convertTimeToReadableFormat, getPassphrase } from './utils.js';
import './PassphraseGenerator.css';

const PassphraseGenerator = () => {
  const [passphrases, setPassphrases] = useState({});
  const [practiceInput, setPracticeInput] = useState('');
  const [copiedBits, setCopiedBits] = useState(null);
  const [hashRate, setHashRate] = useState(1e12);

  const generatePassphrases = useCallback(() => {
    const newPassphrases = {};
    [46, 54, 58, 66, 70, 80].forEach(bits => {
      newPassphrases[bits] = getPassphrase(bits);
    });
    setPassphrases(newPassphrases);
    setCopiedBits(null); // Reset the copiedBits state
  }, []);
  
  const crackTimes = useMemo(() => {
    return [46, 54, 58, 66, 70, 80].map(bits => ({
      bits,
      time: convertTimeToReadableFormat(timeToCrack(bits, hashRate))
    }));
  }, [hashRate]);

  const copyToClipboard = useCallback((text, bits) => {
    navigator.clipboard.writeText(text);
    setCopiedBits(bits);
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
          className="btn btn-success btn-outline btn-lg"
        >
          ♻️ Refresh!
        </button>

        <div className="dropdown-container">
          <label htmlFor="hashRateSelect" className="mb-2 mr-3 block">Select attacker's computing power (2024 estimates):</label>
          <select
            id="hashRateSelect"
            value={hashRate}
            onChange={(e) => setHashRate(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={1e2}>Online attack (10 guesses/second)</option>
            <option value={1e6}>Slow attack (1 million guesses/second)</option>
            <option value={1e10}>Standard Consumer GPU (10 billion guesses/second)</option>
            <option value={1e11}>High-end GPU (100 billion guesses/second)</option>
            <option value={1e12}>Best Available Hardware (1 trillion guesses/second)</option>
            <option value={1e14}>Nation State Attacker (100 trillion guesses/second)</option>
          </select>
        </div>
      </div>
      {crackTimes.map(({ bits, time }) => (
        <div key={bits} className="passphrase-block mb-8">
          <label className="block mb-1 tracking-wide uppercase">
            <span className="font-bold inline-block w-52">{bits} bits of entropy</span>
            <span className="crack-time">Avg time to crack = <em>{time}</em></span>
          </label>
          <div className="relative passphrase-content" onClick={() => copyToClipboard(passphrases[bits], bits)}>
            {passphrases[bits]}
            <span className="copy-button" >
              {copiedBits === bits ? '✅ Copied!' : '📋 Copy'}
            </span>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <label className="block font-bold mb-1">Practice typing the phrase:</label>
        <input
          type="text"
          value={practiceInput}
          onChange={(e) => setPracticeInput(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
    </section>
  );
};

export default PassphraseGenerator;