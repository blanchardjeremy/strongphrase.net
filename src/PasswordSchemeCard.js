import React from 'react';
import { RiShieldKeyholeLine } from "react-icons/ri";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const PasswordSchemeCard = () => {
  return (
    <div className="card lg:card-side flex flex-row bg-slate-100 shadow-lg mt-20 password-scheme">
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
        <p>Use a <strong>password manager</strong> with <strong>unique, randomly-generated</strong> passwords for everything else. It will generate random passwords for each website and automatically fill them for you each time you log-in, so you don't have to type them. (We suggest <a href="https://1password.com/" className="link" target="_blank" rel="noreferrer">1Password</a>).</p>
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
  );
};

export default PasswordSchemeCard;
