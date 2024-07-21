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

      <div className="bg-blue-950 text-neutral-content p-10 w-full">
        <footer className="footer max-w-screen-lg mx-auto py-4">
          <aside className="flex items-start space-x-2">
            <img className="float-left max-w-10" alt="Lock icon" src={logo} />
            <div>
              <h6 className="font-header text-xl">StrongPhrase.net</h6>
              <p><em>Create a strong, memorable passphrase to use as your master password.</em></p>
              <p>This site collects no data. There are no trackers or calls to external services/sites. All interactions and passphrase generation happen directly in your browser and stay on your computer.</p>
              <p>Originally created by Ryan Foster. Re-written by Jeremy Blanchard.</p>
            </div>
          </aside>
          <nav className="">
          <h6 className="footer-title">Connect</h6>
            <a className="link link-hover" href="https://github.com/blanchardjeremy/getapassphrase">Code on GitHub</a>
            <a className="link link-hover" href="https://github.com/blanchardjeremy/getapassphrase/issues">Submit feedback or a bug</a>
          </nav>
        </footer>
      </div>

    </div>
  );
};

export default App;