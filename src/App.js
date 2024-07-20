import React, { } from 'react';
import PassphraseGenerator from './PassphraseGenerator.js';
import './App.css';
import { RiShieldKeyholeLine } from "react-icons/ri";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";



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


          <div className="card lg:card-side flex flex-row bg-slate-100 shadow-xl mt-12 password-scheme">
            <div className="flex-none w-1/2 relative card-body">
              <h2 className="card-title"><HiOutlineChatBubbleOvalLeftEllipsis className="text-3xl" />Use a <u>passphrase</u> for...</h2>
              <p>Use randomly-generated pass<strong className="italic">phrase</strong> for each of your most important accounts that you type often:</p>
              <ul className="list-disc ml-8">
                <li>Your master password for your password manager</li>
                <li>Laptop</li>
                <li>Google / Apple account</li>
                <li>Wi-fi</li>
              </ul>

              <p className="example-label">Examples:</p>
              <ul className="list-disc ml-8">
                <li><code>dynamic mutt eats 250 deformed worms</code></li>
                <li><code>cruel major and vocal cop fashion petty bedbug</code></li>
              </ul>
            </div>
            
            <div className="border-r border-gray-200"></div>

            <div className="flex-grow card-body flex flex-col">
              
                <h2 className="card-title"><RiShieldKeyholeLine className="text-3xl" />And a <u>password manager</u> for...</h2>
                <p>Use a <strong>password manager</strong> with <strong>unqiue, randomly-generated</strong> passwords for everything else. It will generate random passwords for each website and automatically fill them for you each time you log-in, so you don't have to type them. (We suggest <a href="https://1password.com/" className="link" target="_blank" rel="noreferrer">1Password</a>).</p>
                <p className="mb-2 example-label">Examples:</p>
                <ul className="list-disc ml-8">
                  <li><code>7ZuNburjjGmme-MDuE*</code></li>
                  <li><code>3@Y@qXWb@LKnd7qCfsd</code></li>
                </ul>
              
              <div className="card-actions justify-end">
                <a className="btn btn-secondary text-white" href="https://1password.com" target="_blank" rel="noreferrer">Get 1Password</a>
              </div>
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
            To be extra safe, you can generate a passphase entirely offline <a href="https://www.eff.org/dice" className="link" target="_blank" rel="noreferrer">using dice</a>.
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