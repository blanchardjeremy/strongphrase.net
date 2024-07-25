

export const getPasscodeAndEntropy = (numDigits) => {
  const result = {
    passcode: generateSecurePasscode(numDigits) || '',
    entropy: Math.log2(10 ** numDigits) || 0,
  }
  return result;
}


export const generateSecurePasscode = (numDigits) => {
  if (!cryptoAvailable()) {
      return "Error: Your browser does not support secure cryptographic operations.";
  }
  
  if (numDigits <= 0) {
      return "Error: Number of digits must be greater than zero.";
  }
  
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
  var crypto   = window.crypto || window.msCrypto;
  var typedArr = Uint16Array;
  return (typedArr && crypto && typeof crypto.getRandomValues == "function");
}


 