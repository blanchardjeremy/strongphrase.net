import React from 'react';
import './Faq.css';

const FAQItem = ({ question, answer }) => {
  return (
    <div className="faq-item">
      <h2 className="faq-question">{question}</h2>
      <div className="faq-answer">{answer}</div>
    </div>
  );
};

const Faq = () => {
  return (
    <section className="content faq-overall-container">
      <h1 className="section-header">Frequently Asked Questions</h1>

      <div className="faq-container">
        <FAQItem 
          question="What is this tool? How does it help me?" 
          answer={
            <>
              <p>Use this site to create strong passphrases that are easy to remember.</p>
              <p><strong>Passphrases are much stronger</strong> than most passwords because they are randomly generated, whereas passwords are often reused, shorter, and easier to guess.</p>
              <p>This site was inspired by <a href="https://www.eff.org/dice" className="link" target="_blank" rel="noreferrer">diceware</a>, but designed to generate sentences that are <strong>easier to visualize and remember</strong> than diceware phrases.</p>
            </>
          } 
        />
        
        <FAQItem 
          question="How does this site generate passphrases?" 
          answer={
            <>
              <p>This website randomly selects words from predefined lists and arranges them into meaningful sentences. These passphrases are much stronger than most humanly-generated passwords, but reasonably easy to memorize, making them ideal for protecting your most important accounts.</p>
            </>
          } 
        />
        
        <FAQItem 
          question="Wait, is it safe to generate a passphrase from a website?" 
          answer={
            <>
              <p>Yes (relatively). This website runs entirely on your browser. There's no server that generates the password. You can turn off your wifi and the site will still work!</p>
              <p>For the extra paranoid, you can generate a "<a href="https://www.eff.org/dice" className="link" target="_blank" rel="noreferrer">diceware</a>" passphrase entirely offline.</p>
            </>
          } 
        />
        
      </div>
    </section>
  );
};

export default Faq;
