import React, { } from 'react';
import PassphraseGenerator from './PassphraseGenerator.js';
import './App.css';


const App = () => {
  return (
    <div className="font-body">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-header mb-2">Get a Passphrase</h1>
          <p className="text-xl">Cryptographically Secure Passphrase Generator</p>
        </header>
        <PassphraseGenerator />
        <section className="content">
          <div className="card bg-slate-100 w-full shadow-xl mt-12 password-scheme">
            <div className="card-body">
              <h2 className="card-title font-header font-extrabold">When to use passphrases</h2>
              <p>Here is the password system we recommend</p>
              <ol className="list-decimal ml-8">
                <li>
                  <p>Use a strong, randomly-generated pass<strong class="italic">phrase</strong> (like the ones offered on this site) for each of your most important accounts that you type often: Your password manager, Google, Apple iCloud, laptop login. Examples:</p>
                  <ul className="list-disc ml-8">
                    <li><code>dynamic mutt eats 250 deformed worms</code></li>
                    <li><code>cruel major and vocal cop fashion petty bedbug</code></li>
                  </ul>
                </li>
                <li>
                  <p>Use a <strong>password manager</strong> with <strong>unqiue, randomly-generated</strong> passwords for everything else. (We suggest <a href="https://1password.com/" target="_blank" rel="noreferrer">1Password</a>.) Examples:</p>
                  <ul className="list-disc ml-8">
                    <li><code>7ZuNburjjGmme-MDuE*</code></li>
                    <li><code>3@Y@qXWb@LKnd7qCfsd</code></li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </section>
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
            To be extra safe, you can generate a passphase entirely offline <a href="https://www.eff.org/dice" target="_blank" rel="noreferrer">using 6-sided dice</a>.
          </p>
        </section>
      </div>

      <footer className="footer footer-center bg-neutral text-neutral-content p-10">
        <aside>
          <p>
            <strong>Get a Passphrase</strong> - Create a strong, memorable passphrase
          </p>
          <p>This site collects no data. All interactions happen directly in your browser and stay entirely on your computer.</p>
        </aside>
        <nav className="grid grid-flow-col gap-7">
          <a className="link" href="https://github.com/blanchardjeremy/getapassphrase">Code on GitHub</a>
          <a className="link" href="https://github.com/blanchardjeremy/getapassphrase/issues">Submit feedback or a bug</a>
        </nav>
      </footer>
    </div>
  );
};

export default App;