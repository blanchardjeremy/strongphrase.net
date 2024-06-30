import React, { useState, useCallback, useEffect } from 'react';
import { getPassphrase } from './utils.js';
import './PassphraseGenerator.css';

const PassphraseGenerator = () => {
  const [passphrases, setPassphrases] = useState({});
  const [practiceInput, setPracticeInput] = useState('');

  
  const generatePassphrases = useCallback(() => {
    const newPassphrases = {};
    [46, 54, 58, 66, 70, 80].forEach(bits => {
      newPassphrases[bits] = getPassphrase(bits);
    });
    setPassphrases(newPassphrases);
  }, []);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
  }, []);

  // Use the useEffect hook to generate the passphrases when the component is first loaded
  useEffect(() => {
    generatePassphrases();
  }, [generatePassphrases]);
  
  

  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Get a random passphrase:</h3>
        <button
          onClick={generatePassphrases}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ♻️ Refresh!
        </button>
      </div>
      {Object.entries(passphrases).map(([bits, passphrase]) => (
        <div key={bits} className="mb-4">
          <label className="block font-bold mb-1">{bits} bits:</label>
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded flex-grow passphrase-content">{passphrase}</div>
            <button
              onClick={() => copyToClipboard(passphrase)}
              className="ml-2 bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
            >
              📋 Copy
            </button>
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