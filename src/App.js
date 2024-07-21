import React, { } from 'react';
import './App.css';
import PassphraseGenerator from './PassphraseGenerator.js';
import PasswordSchemeCard from './PasswordSchemeCard.js';
import Faq from './Faq.js';
import logo from './img/logo.png';



const App = () => {
  return (
    <div className="font-body">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <header className="mb-8">
          <img className="float-start max-w-16 mr-4" alt="Lock icon" src={logo} />
          <h1 className="text-4xl font-header mb-2">StrongPhrase.net</h1>
          <p className="text-xl">Create strong, memorable passphrases</p>
        </header>
        <PassphraseGenerator />
        
        <PasswordSchemeCard />

        <Faq />
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