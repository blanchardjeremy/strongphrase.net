const { filteredPasscodes } = require('../scripts/wordlists/filtered_passcodes_six.js');

const calculateEntropy = (numDigits, filteredPasscodesLength) => {
  let totalPossiblePasscodes = 10 ** numDigits;
  
  if (numDigits === 6) {
    totalPossiblePasscodes -= filteredPasscodesLength;
  }

  return Math.log2(totalPossiblePasscodes);
};

export const getPasscodeAndEntropy = (numDigits) => {
  const passcode = generateSecurePasscode(numDigits) || '';
  const entropy = calculateEntropy(numDigits, filteredPasscodes.length) || 0;

  const result = {
    passcode,
    entropy,
  };

  return result;
};

export const generateSecurePasscode = (numDigits) => {
  if (!cryptoAvailable()) {
    return "Error: Your browser does not support secure cryptographic operations.";
  }

  if (numDigits <= 0) {
    return "Error: Number of digits must be greater than zero.";
  }

  let passcode;
  let needToContinue;
  if(numDigits === 6) {
    do {
      passcode = generateRandomPasscode(numDigits);
      needToContinue = filteredPasscodes.includes(passcode);
      if(needToContinue) {
        console.log('Skipping a filtered 6-digit passcode: ', passcode);
      }
    } while (needToContinue);
  } else {
    passcode = generateRandomPasscode(numDigits);
  }

  return passcode;
};

const generateRandomPasscode = (numDigits) => {
  let randomValues = new Uint8Array(numDigits); // Array to hold random bytes
  (window.crypto || window.msCrypto).getRandomValues(randomValues); // Populate array with secure random bytes
  let passcode = "";

  for (let i = 0; i < numDigits; i++) {
    // Each byte can be from 0 to 255, so we take it modulo 10 to get a single digit (0-9)
    passcode += (randomValues[i] % 10).toString();
  }

  return passcode;
};

const cryptoAvailable = function() {
  var crypto = window.crypto || window.msCrypto;
  var typedArr = Uint16Array;
  return (typedArr && crypto && typeof crypto.getRandomValues == "function");
};
