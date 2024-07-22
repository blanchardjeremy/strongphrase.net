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

            This site was inspired by other passphrase generates like [diceware](https://www.eff.org/dice), but designed to generate phrases that are **easier to visualize and remember**.
          `} 
        />
        
        <FAQItem 
          question="Wait, is it safe to generate a passphrase from a website?" 
          answer={stripIndent`
            Yes (relatively). This website runs entirely on your browser. There's no server that generates the passphrase. You can turn off your wifi and the site will still work!

            For the extra paranoid, you can generate a "[diceware](https://www.eff.org/dice)" passphrase entirely offline.
          `} 
        />

        <FAQItem 
          question="Where does the list of words come from?" 
          answer={stripIndent`
            You can find the full word lists [here](https://github.com/blanchardjeremy/strongphrase.net/blob/main/src/utils.js#L136). They were chosen to be common enough words that they would be easy to remember and type.

            If you encounter words that you think should be removed, [we'd love to hear the feedback](https://github.com/blanchardjeremy/strongphrase.net/issues).
          `} 
        />
        
        <FAQItem 
          question="Where does the list of words come from?" 
          answer={stripIndent`
            You can find the full word lists [here](https://github.com/blanchardjeremy/strongphrase.net/blob/main/src/utils.js#L136). They were chosen to be common enough words that they would be easy to remember and type

            If you find words that you think should be removed, [I'd love to hear the feedback](https://forms.gle/pu1vqi8Mc1VYirGz6).
          `} 
        />

        <FAQItem 
          question="What is password 'entropy'?"
          answer={stripIndent`
            **Entropy** is a technical term that refers to how hard a password is to crack.

            Instead of saying "A 10-character password word made up of of random lowercase letters (26 characters) has a  26<sup>10</sup> = 141,167,095,653,376 (144 trillion) possible combinations. It's cumbersome to write really long numbres, so we instead write it as "2 to the power of X" (2<sup>X</sup>). In our exmaple, 26<sup>10</sup> is about equal to **2<sup>47</sup>**. So we say this password has **"47 bits of entropy"**.
            
            Some examples: 

            | Type                                 | # of characters | Example        | Entropy for a <br>10-character password |
            |--------------------------------------|-----------------|----------------|-----------------------------------------|
            | Lower                                | 26              | \`bddacsvxmh\` | log<sub>2</sub>(26)*10 = **47 bits**    |
            | Lower + upper                        | 52              | \`cExNefEMVI\` | log<sub>2</sub>(52)*10 = **57 bits**    |
            | Lower + upper + num + common symbols | 70              | \`7gT2K8wqCB\` | log<sub>2</sub>(70)*10 = **61 bits**    |

          `} 
        />
      </div>
    </section>
  );
};

export default Faq;
