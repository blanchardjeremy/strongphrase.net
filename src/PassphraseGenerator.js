import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { timeToCrack, convertTimeToReadableFormat, getPassphrase } from './utils.js';
import { Container, Button, Select, MenuItem, Typography, Input, Box, Sheet } from '@mui/joy';

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

  useEffect(() => {
    generatePassphrases();
  }, [generatePassphrases]);
  
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Sheet sx={{ mb: 2, p: 2 }}>
        <Typography level="h3" sx={{ mb: 1 }}>Get a random passphrase:</Typography>
        <Button
          onClick={generatePassphrases}
          variant="outlined"
          color="success"
        >
          ♻️ Refresh!
        </Button>
      </Sheet>

      <Sheet sx={{ mb: 2, p: 2 }}>
        <Typography level="body1" sx={{ mb: 1 }}>Select attacker's computing power*:</Typography>
        <Select
          value={hashRate}
          onChange={(e) => {
            if (e && e.target) {
              setHashRate(Number(e.target.value));
            }
          }}
          sx={{ width: 300 }}
        >
          <MenuItem value={1e2}>Online attack (10 guesses/second)</MenuItem>
          <MenuItem value={1e6}>Slow attack (1 million guesses/second)</MenuItem>
          <MenuItem value={1e10}>Standard Consumer GPU (10 billion guesses/second)</MenuItem>
          <MenuItem value={1e11}>High-end GPU (100 billion guesses/second)</MenuItem>
          <MenuItem value={1e12}>Best Available Hardware (1 trillion guesses/second)</MenuItem>
          <MenuItem value={1e14}>Nation State Attacker (100 trillion guesses/second)</MenuItem>
        </Select>
        <Typography level="body2" sx={{ mt: 1, fontStyle: 'italic' }}>* Best guesses as of 2024 computing power</Typography>
      </Sheet>
      {crackTimes.map(({ bits, time }) => (
        <Container key={bits} sx={{ mb: 2, p: 2 }}>
          <Typography level="body1" sx={{ mb: 1 }}>
            <Typography level="body1" fontWeight="bold" sx={{ display: 'inline-block', width: 170 }}>{bits} bits of entropy</Typography> 
            <Typography level="body1" sx={{ display: 'inline' }}>Avg time to crack = &nbsp;<em>{time}</em></Typography>
          </Typography>
          <Sheet sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              level="body1"
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: copiedBits === bits ? 'action.selected' : 'transparent',
                p: 1,
                borderRadius: 1,
                flexGrow: 1,
              }}
              className="passphrase-content"
              onClick={() => copyToClipboard(passphrases[bits], bits)}
            >
              {passphrases[bits]}
            </Typography>
            <Typography level="body1" sx={{ float: 'right' }}>
              {copiedBits === bits ? '✅ Copied!' : '📋 Copy'}
            </Typography>
          </Sheet>
        </Container>
      ))}
      <Sheet sx={{ p: 2 }}>
        <Typography level="body1" fontWeight="bold" sx={{ mb: 1 }}>Practice typing the phrase:</Typography>
        <Input
          value={practiceInput}
          onChange={(e) => setPracticeInput(e.target.value)}
          fullWidth
        />
      </Sheet>
    </Box>
  );
};

export default PassphraseGenerator;