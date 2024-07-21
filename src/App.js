import React, { } from 'react';
import './App.css';
import PassphraseGenerator from './PassphraseGenerator.js';
import PasswordSchemeCard from './PasswordSchemeCard';
import logo from './img/logo.png';



const App = () => {
  return (
    <div className="font-body">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <header className="mb-8">
          <img className="float-start max-w-16 mr-4" alt="Lock icon" src={logo} />
          <h1 className="text-4xl font-header mb-2">StrongPhrase.net</h1>
          <p className="text-xl">Create a strong, memorable passphrases</p>
        </header>
        <PassphraseGenerator />
        
        <PasswordSchemeCard />

        <section className="mt-8 content">
          <h2 className="text-2xl my-4">How does it work?</h2>
          <p>
            This website randomly selects words from predefined lists and arranges them into meaningful sentences.
            These passphrases are millions of times stronger than most humanly-generated passwords, but reasonably easy to memorize, making them ideal for protecting your most important accounts.
          </p>
          <h2 className="text-2xl my-4">Is it safe to generate my password online?</h2>
          <p>
            Yes (relatively). This website runs entirely on your browser. There's no server that genereates the password. You can turn off your wifi and the site will still work!
          </p>
          <p>
            To be extra safe, you can generate a passphase entirely offline <a href="https://www.eff.org/dice" className="link" target="_blank" rel="noreferrer">using dice</a>.
          </p>
        </section>
      </div>

      <footer className="footer footer-center bg-neutral text-neutral-content p-10">
        <aside className="mb-0">
          <p>
            <strong>StrongPhrase.net</strong> - Create a strong, memorable passphrase to use as your master password
          </p>
          <p>This site collects no data. All interactions happen directly in your browser and stay entirely on your computer.</p>
          <p>Originally created by Ryan Foster. Re-written by Jeremy Blanchard.</p>
        </aside>
        <nav className="grid grid-flow-col gap-8 mt-0">
          <a className="link" href="https://github.com/blanchardjeremy/getapassphrase">Code on GitHub</a>
          <a className="link" href="https://github.com/blanchardjeremy/getapassphrase/issues">Submit feedback or a bug</a>
        </nav>
      </footer>
    </div>
  );
};

export default App;