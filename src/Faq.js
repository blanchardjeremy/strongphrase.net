import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { stripIndent } from 'common-tags';
import './Faq.css';

const FAQItem = ({ question, answer }) => {
  return (
    <div className="faq-item">
      <h2 className="faq-question">{question}</h2>
      <ReactMarkdown
        className="faq-answer"
        children={answer}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      />
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
          answer={stripIndent`
            Use this site to create strong passphrases that are easy to remember.

            These passphrases are **much stronger** than most passwords because they are randomly generated, whereas passwords are often reused, shorter, and easier to guess.

            This site was inspired by [diceware](https://www.eff.org/dice), but designed to generate sentences that are **easier to visualize and remember** than diceware phrases.
          `} 
        />
        
        <FAQItem 
          question="How does this site generate passphrases?" 
          answer={stripIndent`
            This website randomly selects words from predefined lists and arranges them into meaningful sentences.
            These passphrases are much stronger than most humanly-generated passwords, but reasonably easy to memorize, making them ideal for protecting your most important accounts.
          `} 
        />
        
        <FAQItem 
          question="Wait, is it safe to generate a passphrase from a website?" 
          answer={stripIndent`
            Yes (relatively). This website runs entirely on your browser. There's no server that generates the password. You can turn off your wifi and the site will still work!

            For the extra paranoid, you can generate a "[diceware](https://www.eff.org/dice)" passphrase entirely offline.
          `} 
        />
        
        {/* Add more FAQItem components here */}
      </div>
    </section>
  );
};

export default Faq;
