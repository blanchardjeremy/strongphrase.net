import React, { useState } from "react";
import { convertTimeToReadableFormat, timeToCrackAvg, avgCostToCrack } from "./utils.js";
import HashRateSelector, { defaultHashRate } from './HashRateSelector';
import { Link } from "react-router-dom";

const costOptions = {
  "$0.001": 0.001,
  "$0.01": 0.01,
  "$0.25 (Best-case cloud scenario bcrypt)": 0.25,
  "$1.00": 1,
  "$6.00 (1Password scenario)": 6,
};

const formatNumber = (number) => {
  let rounded = Number(number.toPrecision(3));
  return rounded.toLocaleString();
};

const EntropyCrackTimeTable = () => {
  const [hashRate, setHashRate] = useState(defaultHashRate);
  const [costPerGuess32, setCostPerGuess32] = useState(0.25);

  const handleCostChange = (event) => {
      setCostPerGuess32(Number(event.target.value));
  };

  const generateTableData = () => {
    let data = [];
    for (let bits = 5; bits <= 100; bits += 5) {
      const numberOfGuesses = 2 ** bits;
      // const avgCost = (numberOfGuesses) * (costPerGuess32/ (2 ** 32)) / 2 ;
      const avgCost = avgCostToCrack(bits, costPerGuess32);
      const roundedCost = Math.floor(Number(avgCost.toPrecision(2)));
      const avgTime = timeToCrackAvg(bits, hashRate);
      const maxTime = avgTime*2;
      data.push({
        bits,
        guesses: formatNumber(numberOfGuesses),
        avgtime: convertTimeToReadableFormat(avgTime),
        maxtime: convertTimeToReadableFormat(maxTime),
        cost: roundedCost.toLocaleString()
      });
    }
    return data;
  };

  const tableData = generateTableData();

  return (
    <div className="container mx-auto p-4">
        <div className="mb-6">
          <p>
            <Link className="link link-hover mr-4" to="/">← Go back home</Link>
          </p>
        </div>

        <h2 className="font-header text-3xl">Time and cost to crack</h2>

        <div className="flex flex-row gap-4">
          <HashRateSelector setHashRate={setHashRate} hashRate={hashRate} />
          
          <div>
            <label className="label label-text">$ Cost per 2^32 guesses:</label>
            <select 
                value={costPerGuess32} 
                onChange={handleCostChange} 
                className="select select-bordered w-auto max-w-xs select-sm"
            >
                {Object.entries(costOptions).map(([label, value]) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
          </div>
        </div>

        <div className="card card-body p-6 bg-gray-100 mt-4 flex flex-grow max-w-3xl text-sm">
          <p className="mt-0">
            The folks at 1Password estimate that it <a href="https://blog.1password.com/cracking-challenge-update/" className="link link-hover">costs $6 per 2<sup>32</sup> guesses</a> to crack their system. Their password hashing is much more complex than the hashing assumptions on the main page (bcrypt). bcrypt with simpler configurations, so the cost in our scenario is likely much less. And it is only going to go down in the future.
          </p>
        </div>

        <div className="card card-body p-6 bg-green-100 mt-4 flex flex-grow max-w-3xl text-sm">
          <p className="mt-0">
            <strong>Takeaway:</strong> 45 bits should be your minimum and most people don't need more than 60 bits.
          </p>
        </div>

        <div className="overflow-x-auto mt-8">
            <table className="table table-zebra w-auto">
              <thead>
                <tr>
                  <th>Bits</th>
                  <th>Pool of possible guesses</th>
                  <th>Avg. Crack Time</th>
                  <th>Max Crack Time (double)</th>
                  <th>Avg cost to crack</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.bits}>
                    <td>{row.bits}</td>
                    <td>{row.guesses}</td>
                    <td>{row.avgtime}</td>
                    <td>{row.maxtime}</td>
                    <td>{`$${row.cost}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    </div>
  );
};

export default EntropyCrackTimeTable;
