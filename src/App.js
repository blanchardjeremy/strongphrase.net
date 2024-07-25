import React, { } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PassphraseGenerator from './PassphraseGenerator.js';
import PasswordSchemeCard from './PasswordSchemeCard.js';
import PasscodeDisplay from './passcode/PasscodeDisplay.js';
import PassphraseFAQ from './PassphraseFAQ.js';
import logo from './img/logo.png';
import EntropyCrackTimeTable from './EntropyCrackTable';
import ScrollToTop from './helpers/ScrollToTop';


const Home = () => (
  <>
    <PassphraseGenerator />
    <PasswordSchemeCard />
    <PassphraseFAQ />
  </>
);

const PasscodePage = () => (
  <>
    <PasscodeDisplay />
  </>
);



const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="font-body">
        <div className="max-w-screen-lg mx-auto px-4 py-8">

          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li><Link to="/">Passphrase</Link></li>
                  <li><Link to="/table">Passcode</Link></li>
                  <li><Link to="/table">Crack Time/Cost Table</Link></li>
                </ul>
              </div>
              <Link to="/" className="btn btn-ghost text-xl">StrongPhrase.net</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li><Link to="/">Passphrase</Link></li>
                <li><Link to="/table">Passcode</Link></li>
                <li><Link to="/table">Crack Time/Cost Table</Link></li>
              </ul>
            </div>
          </div>

          <header className="mb-8">
            <img className="float-start max-w-16 mr-4" alt="Lock icon" src={logo} />
            <h1 className="text-4xl font-header mb-2">StrongPhrase.net</h1>
            <p className="text-xl">Create strong, memorable passphrases</p>
          </header>


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/passcode" element={<PasscodePage />} />
            <Route path="/table" element={<EntropyCrackTimeTable />} />
          </Routes>

        </div>

        <div className="bg-blue-950 text-neutral-content p-10 w-full">
          <footer className="footer max-w-screen-lg mx-auto py-4">
            <aside className="flex items-start space-x-2">
              <img className="float-left max-w-10" alt="Lock icon" src={logo} />
              <div>
                <h6 className="font-header text-xl">StrongPhrase.net</h6>
                <p><em>Create a memorable passphrase to use as your master password</em></p>
                <p className="mt-4">This site does not collect any data. The server we host on <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection" target="_blank" rel="noreferrer">stores only your IP address</a> for security purposes. There are no trackers or calls to external services/sites. All interactions and passphrase generation happen directly in your browser and stay on your computer.</p>
                <p className="mt-4">Originally created by Ryan Foster. Re-written by Jeremy Blanchard.</p>
              </div>
            </aside>
            <nav className="">
            <h6 className="footer-title">Navigation</h6>
              <Link className="link link-hover" to="/">Home</Link>
              <Link className="link link-hover" to="/table">Time/cost to crack table</Link>
              <a className="link link-hover" href="https://github.com/blanchardjeremy/strongphrase.net" target="_blank" rel="noreferrer">Code on GitHub</a>
              <a className="link link-hover" href="https://github.com/blanchardjeremy/strongphrase.net/issues" target="_blank" rel="noreferrer">Submit a bug or request</a>
              <a className="link link-hover" href="https://forms.gle/pu1vqi8Mc1VYirGz6" target="_blank" rel="noreferrer">Contact</a>
            </nav>
          </footer>
        </div>

      </div>
    </Router>
  );
};

export default App;