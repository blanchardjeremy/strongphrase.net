import React, { } from 'react';
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
      <section className="content">
        <div className="card bg-slate-100 w-full shadow-xl mt-12">
          <div className="card-body">
            <h2 className="card-title">When to use passphrases</h2>
            <p>Here is the password system we recommend</p>
            <ol className="list-decimal ml-8">
              <li>Use a strong, randomly-generated pass<strong class="italic">phrase</strong> (like the ones offered on this site) for each of your most important accounts that you type often: Your password manager, Google, Apple iCloud, laptop login</li>
              <li>Use a <strong>password manager</strong> with <strong>unqiue, randomly-generated</strong> passwords for everything else. (We suggest <a href="https://1password.com/" target="_blank" rel="noreferrer">1Password</a>.)</li>
            </ol>
          </div>
        </div>
      </section>
      <section className="mt-8 content">
        <h2 className="text-2xl font-bold my-4">How does it work?</h2>
        <p>
          This website randomly selects words from predefined lists and arranges them into meaningful sentences.
          These passphrases are millions of times stronger than most humanly-generated passwords, but reasonably easy to memorize, making them ideal for protecting your most important accounts.
        </p>
        <h2 className="text-2xl font-bold my-4">Is it safe to generate my password online?</h2>
        <p>
          Yes (relatively). This website runs entirely on your browser. There's no server that genereates the password. You can turn off your wifi and the site will still work!
        </p>
        <p>
          To be extra safe, you can generate a passphase entirely offline <a href="https://www.eff.org/dice" target="_blank" rel="noreferrer">using 6-sided dice</a>.
        </p>
      </section>
      <footer className="mt-8">
        <p>This site collects no data. All interactions happen directly in your browser and stay entirely on your computer.</p>
        <p>Find the <a href="https://github.com/blanchardjeremy/getapassphrase">source code on GitHub</a>. You can also <a href="https://github.com/blanchardjeremy/getapassphrase/issues">report a bug or offer feedback</a>. Original code by Ryan Foster.</p>
      </footer>
    </div>
  );
};

export default App;