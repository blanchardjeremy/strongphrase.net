import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { timeToCrackAvg, convertTimeToReadableFormat, formatDollarToScale, avgCostToCrack } from './../passphraseUtils.js';
import { getPasscodeAndEntropy, generateSecurePasscode } from './passcodeUtils.js';
import MarkdownCustom from '../MarkdownCustom.js';
import './PasscodeDisplay.css';
import { FaRegCopy, FaCheck, FaSyncAlt, FaInfoCircle } from "react-icons/fa";

const BASE_HASH_RATE = 250;

const PasscodeDisplay = () => {
  const [passcodes, setPasscodes] = useState({});
  const [copiedBits, setCopiedBits] = useState(null);
  const [hashRate, setHashRate] = useState();

  const generatePasscodes = useCallback(() => {

    const testPasscodes = {
      '6 digits': getPasscodeAndEntropy(6),
      '10 Digits': getPasscodeAndEntropy(10),
      // '11 Digits': getPasscodeAndEntropy(11),
      // '12 Digits': getPasscodeAndEntropy(12),
      // '3 Words': { passcode: 'Cardinal Gainfully Scabby', entropy: 36 }
    };

    setPasscodes(testPasscodes);
  }, []);

  
  const crackTimes = useMemo(() => {
    // Generate crack times based on the current passcodes object
    return Object.entries(passcodes).map(([key, { entropy, passcode }]) => ({
      key: key,
      entropy: Math.round(entropy),
      label: key,
      time: convertTimeToReadableFormat(timeToCrackAvg(entropy, BASE_HASH_RATE)),
      // cost: formatDollarToScale(avgCostToCrack(entropy))
    }));
  }, [passcodes]);

  const copyToClipboard = useCallback((text, bits) => {
    navigator.clipboard.writeText(text);
    setCopiedBits(null); // Reset first to ensure transition can trigger
    setTimeout(() => {
      setCopiedBits(bits); // Then set the new copied bits after a very short delay
    }, 10); // A very short delay
  }, []);

  useEffect(() => {
    generatePasscodes();

  }, [generatePasscodes]);



  return (
    <section className="content">
      <div className="flex flex-col md:flex-row gap-3 items-end justify-start mb-10">
        <button
          onClick={generatePasscodes}
          className="btn btn-primary text-base md:text-xl text-white mb-2 md:mb-0"
        >
          <FaSyncAlt /> New passcodes!
        </button>
      </div>

      
      <div className="card card-body px-6 py-3 bg-green-100 mt-4 mb-8 flex flex-grow max-w-3xl text-sm">
        <MarkdownCustom 
          className="mt-0 markdown-content"
        >
          {`
            **Cracking speed:** We have [evidence from 2018](https://www.komando.com/news/how-your-iphone-can-be-hacked-in-6-minutes/) that law enforcement phone cracking software worked at a rate of 25 guesses/second.
            We assume that the speed is no more than 10x that today, and use **${BASE_HASH_RATE} guesses/second** as our baseline. This assumes your phone is off. If youre phone is on (even if it is locked), a lot of data is already unecrypted and accessible to sophistocated hackers without knowing your passcode.
          `}
        </MarkdownCustom>
      </div>

      {crackTimes.map(({ key, label, entropy, time, cost }) => (
        <div key={key}
          className={`passphrase-block ${copiedBits === key ? 'copied' : ''}`}
        >
          <label className="block mb-1 tracking-wide uppercase">
            <div className="flex items-center">
              <div className="label-container">
                <span className={`font-header font-extrabold text-xl inline-block ${label}`}>{label}</span>
                <span className={`ml-2 group`}>
                  <div className="tooltip mt-1" data-tip={`${entropy} bits of entropy`}>
                    <FaInfoCircle className="text-gray-500 cursor-pointer text-base" />
                  </div>
                </span>
              </div>
              <div className="crack-time-info">
                <div className="crack-stats-container">
                  <span className="crack-time ml-2">Avg time to crack: <em>{time}</em></span>
                </div>
                {/* <div className="crack-stats-container">
                  <span className="crack-time ml-2">Avg cost to crack: <em>{cost}</em></span>
                </div> */}
              </div>
            </div>
          </label>
          <div className="relative passphrase-content mb-6" onClick={() => copyToClipboard(passcodes[key].passcode, key)}>
            {passcodes[key].passcode}
            <span className="copy-button">
              {copiedBits === key ? <FaCheck /> : <FaRegCopy />} {copiedBits === key ? 'Copied!' : 'Copy'}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PasscodeDisplay;
