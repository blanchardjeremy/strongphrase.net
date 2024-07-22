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
    <section className="content faq-overall-container markdown-content" id="FAQ">
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
            You can find the full word lists [here](https://github.com/blanchardjeremy/strongphrase.net/blob/main/src/utils.js#L136). They were chosen to be common enough words that they would be easy to remember and type

            If you find words that you think should be removed, [I'd love to hear the feedback](https://forms.gle/pu1vqi8Mc1VYirGz6).
          `} 
        />

        <FAQItem 
          question="What is password 'entropy'?"
          answer={stripIndent`
            **Entropy** is a technical term that refers to how hard a password is to crack.

            A 10-character password word made up of lowercase letters (26 characters) forms 26<sup>10</sup> = 141,167,095,653,376 (144 trillion) possible different combinations. It's cumbersome to write numbers that long, so we instead write it use exponents like "2 to the power of X" (2<sup>X</sup>). In our exmaple, 26<sup>10</sup> is about equal to **2<sup>47</sup>**. So we say this password has **"47 bits of entropy"**.
            
            Some examples: 

            | Type                                 | Pool of<br>characters | Example        | Entropy for a <br>10-character password |
            |--------------------------------------|-----------------|----------------|-----------------------------------------|
            | Lower                                | 26              | \`bddacsvxmh\` | log<sub>2</sub>(26)*10 = **47 bits**    |
            | Lower + upper                        | 52              | \`cExNefEMVI\` | log<sub>2</sub>(52)*10 = **57 bits**    |
            | Lower + upper + num + common symbols | 70              | \`N7qm!C#9A@\` | log<sub>2</sub>(70)*10 = **61 bits**    |

            But most people don't use 10-character passwords. They use common words that can be easily found on a word list. Or they turn \`dragon\` into something harder like \`dr@g0n123!\`. That's an improvement, but since most attackers will be using a dictionary of common words, and will [expect obvious subtituations](https://blanchardjeremy.github.io/tryzxcvbn/), it doesn't help that much.

            This [classic xkcd comic](https://xkcd.com/936/) about passwords vs passphrases is a good summary of why passphrases are better than passwords.

            <img src="https://imgs.xkcd.com/comics/password_strength_2x.png" alt="xkcd comic about passphrases vs password" width="700" />



            We can achieve much more human-friendly passphrases by using something like [diceware](https://www.eff.org/dice). Diceware draws from a list of 7,776 words. So a phrase with 3 words has 7,776<sup>3</sup> = 479 trillion possible combinations.
            
            | Diceware passphrase                                     | Bits of entropy |
            |---------------------------------------------------------|-----------------|
            | 3 words: \`shading deflected panorama\`                 | **40 bits**     |
            | 4 words: \`country cradle barbecue predator\`           | **52 bits**     |
            | 5 words: \`dyslexia glitter repossess glimpse unrobed\` | **64 bits**     |

            The passphrases we generate on this site offer similar strength, but are easier to visualize and therefore easier to remember.

            | **StrongPhrase.net passphrase**                                              | Bits of entropy |
            |------------------------------------------------------------------------------|-----------------|
            | Strong: \`evil juror obtains thin moths\`                                    | **44 bits**     |
            | Stronger: \`drunk niece and greedy goose clean tall book\`                   | **58 bits**     |
            | Strongst: \`emotional boxer and concerned virus acquire 45 smashed baskets\` | **66 bits**     |


          `} 
        />


        <FAQItem 
          question="How do you calculate the time to crack a passphrase?" 
          answer={stripIndent`
            This is tricky. It requires making a lot of assumptions about how strong the "hash" of the password is and the computing power of the attacker. (In fact, 1Password suggests that it makes more sense to calculate [cost to crack](https://blog.1password.com/cracking-challenge-update/) rather than "time to crack".)

            Estimating the number guesses/second (aka: hashes/second) is challenging because the functions used to encrypt a password vary widely.

            Hive Systems maintains a great [password strength table](https://www.hivesystems.com/blog/are-your-passwords-in-the-green) that shows the time it would take to crack various kinds of passwords. They've put a great deal of thought into their assumptions, so we will use the same assumptions.

            Assumptions:
            * The attacker has access to your hashed password. Either they broke into a database or have access to your physical machine.
            * That password was hashed with bcrypt (at a [work factor](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#using-work-factors) of 32). (Systems like 1Password and MacOS use a hashing approach that [much stronger](https://support.1password.com/pbkdf2/), so the guesses/second below wouuld be much lower than what you see below.)
            * The data below is current as of 2024 and will need updated as the cost of computing power continues to decrease.

            We provide profiles for 3 different levels of computing power:

            |                             | Standard consumer hardware  | Best consumer hardware           | Nation state attacker (NSA, etc.) |
            |-----------------------------|-----------------------------|----------------------------------|-----------------------------------|
            | **Hardware**                    | RTX 4090                    | RTX 4090 x10 (or AWS A100 x16)   | A100 x10,000                      |
            | **Est. Cost**                   | $2,300                      | $64/hour for 2 AWS instances[^2] | $64,000/hour                      |
            | **Crack time for 8 chars**[^1] | 99 years                    | 7 years                          | 5 minutes                         |
            | **Calculation**                 | = 70^8 / (99\\*365\\*24*3600) | = 70^8 / (7\\*365\\*24*3600)   | = 70^8 / (5*60)                   |
            | **Guesses/second**              | = **184,000/sec**           | = **2.6 million/sec**            | = **1.9 trillion/sec**            |

            [^1]: Crack time is based on [hivesystems.com's table](https://www.hivesystems.com/blog/are-your-passwords-in-the-green) for a password with 8 characters, lowercase, uppercase, symbols, and numbers (70 character set).
            [^2]: AWS pricing is based on the [Amazon EC2 P4d](https://aws.amazon.com/ec2/instance-types/p4/) for EC2 P4d.24xlarge instances.

          `} 
        />

      </div>


    </section>
  );
};

export default Faq;
