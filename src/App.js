import React from 'react';
import PassphraseGenerator from './PassphraseGenerator.js';
import './App.css';
import { Container, Typography, Link, Box } from '@mui/joy';

const App = () => {
  return (
    <Container>
      <header>
        <Typography level="h1">Get a Passphrase</Typography>
        <Typography level="h2">Cryptographically Secure Passphrase Generator</Typography>
      </header>
      <PassphraseGenerator />
      <section>
        <Typography level="h2">How does it work?</Typography>
        <Typography>
          This website randomly selects words from predefined lists and arranges them into meaningful sentences.
          These passphrases are millions of times stronger than most humanly-generated passwords, but reasonably easy to memorize, making them ideal for protecting your most important accounts.
        </Typography>
      </section>
      <footer>
        <Typography>
          Find the <Link href="https://github.com/blanchardjeremy/getapassphrase" className="text-blue-500 hover:underline">source code on GitHub</Link>.
        </Typography>
      </footer>
    </Container>
  );
};

export default App;