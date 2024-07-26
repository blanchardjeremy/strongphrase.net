import React, { } from 'react';
import { HashRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import './App.css';
import PassphraseGenerator from './PassphraseGenerator.js';
import PasswordSchemeCard from './PasswordSchemeCard.js';
import PasscodePage from './passcode/PasscodePage.js';
import AcronymPage from './acronym/AcronymPage.js';
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



const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="font-body">
        <div className="max-w-screen-lg mx-auto px-4 py-8">

          <header className="mb-2">
            <div className="title flex-col flex-initial w-1/">
              <img className="float-start max-w-16 mr-4" alt="Lock icon" src={logo} />
              <h1 className="text-4xl font-header mb-2">StrongPhrase.net</h1>
              <p className="text-xl">Create strong, memorable passphrases</p>
            </div>

            <div className="navbar bg-slate-100 rounded-xl mt-3">
              <div className="navbar-start flex w-full">
                <ul className="menu menu-horizontal px-1">
                  <li><NavLink activeClassName="active" to="/">Passphrase</NavLink></li>
                  {/* <li><NavLink activeClassName="active" to="/acronym">Acronym Passphrase</NavLink></li> */}
                  <li><NavLink activeClassName="active" to="/passcode">Phone Passcode</NavLink></li>
                  <li><NavLink activeClassName="active" to="/table">Crack Time/Cost Table</NavLink></li>
                </ul>
              </div>
            </div>
          </header>





          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acronym" element={<AcronymPage />} />
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
            <h6 className="footer-title">Connect</h6>
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