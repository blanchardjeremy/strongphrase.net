import React, { useState, useMemo } from 'react';
import { timeToCrack, convertTimeToReadableFormat } from './utils.js';

const CrackTimeTable = () => {
  const [hashRate, setHashRate] = useState(1e12);

  const crackTimes = useMemo(() => {
    return [46, 54, 58, 66, 70, 80].map(bits => ({
      bits,
      time: convertTimeToReadableFormat(timeToCrack(bits, hashRate))
    }));
  }, [hashRate]);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">How long would it take to crack each?</h2>
      <div className="mb-4">
        <label htmlFor="hashRateSelect" className="block mb-2">Select attacker's computing power*:</label>
        <select
          id="hashRateSelect"
          value={hashRate}
          onChange={(e) => setHashRate(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value={1e2}>Online attack (10 guesses/second)</option>
          <option value={1e6}>Slow attack (1 million guesses/second)</option>
          <option value={1e10}>Standard Consumer GPU (10 billion guesses/second)</option>
          <option value={1e11}>High-end GPU (100 billion guesses/second)</option>
          <option value={1e12}>Best Available Hardware (1 trillion guesses/second)</option>
          <option value={1e14}>Nation State Attacker (100 trillion guesses/second)</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Bits of Entropy</th>
            <th className="border p-2">Avg. Time to Crack</th>
          </tr>
        </thead>
        <tbody>
          {crackTimes.map(({ bits, time }) => (
            <tr key={bits}>
              <td className="border p-2">{bits}</td>
              <td className="border p-2">{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-sm italic">* Best guesses as of 2024 computing power</p>
    </section>
  );
};

export default CrackTimeTable;