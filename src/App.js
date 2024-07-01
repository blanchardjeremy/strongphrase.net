import React, { useState, useCallback } from 'react';
import PassphraseGenerator from './PassphraseGenerator.js';
import './App.css';


const App = () => {
  return (
    <div className="sm:container sm:mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Get a Passphrase</h1>
        <p className="text-xl">Cryptographically Secure Passphrase Generator</p>
      </header>
      <PassphraseGenerator />
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">How does it work?</h2>
        <p>
          This website randomly selects words from predefined lists and arranges them into meaningful sentences.
          These passphrases are millions of times stronger than most humanly-generated passwords, but reasonably easy to memorize, making them ideal for protecting your most important accounts.
        </p>
      </section>
      <footer className="mt-8">
        <p>Find the <a href="https://github.com/blanchardjeremy/getapassphrase" className="text-blue-500 hover:underline">source code on GitHub</a>.</p>
      </footer>
    </div>
  );
};

export default App;