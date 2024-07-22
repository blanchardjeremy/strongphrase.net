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
    <div className="faq-all">
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
            question="How does this compare with other password schemes?" 
            answer={stripIndent`
              | Password scheme                 | Example                              | Crackable | Easy to remember<br> and type |
              |---------------------------------|--------------------------------------|---------------|-------------------------------|
              | Dictionary word                 | \`dragon\`                            | ❌ Easy            | ✅ Easy                            |
              | Dictionary word <br>with substitutions | \`dr@g0n123!\`                       | ❌ Easy            | ❌ Hard                            |
              | Random characters               | \`N7qm!C#9A@\`                       | ✅ Hard            | ❌ Hard                            |
              | Diceware passphrase             | \`wrangle matter esquire granny\` | ✅ Hard            | ⚠️ Kinda easy                            |
              | **StrongPhrase.net<br> passphrase** | **\`evil juror obtains thin moths\`**| ✅ Hard            | ✅ Easy                            |

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
              They were chosen to be common enough words that they would be easy to remember and type.

              You can find the full list of owrds [here](https://github.com/blanchardjeremy/strongphrase.net/blob/main/src/utils.js#L136). 

              I put some time in filtering out offensive words, but I'm sure I missed some. If you find words that you think should be removed, [I'd love to hear the feedback](https://forms.gle/pu1vqi8Mc1VYirGz6).
            `} 
          />


          <FAQItem 
            question="Should I use strong, stronger, or strongest?" 
            answer={stripIndent`
              .... cite what I came up with on the table
            `} 
          />

        </div>
      </section>
      <section className="content faq-overall-container markdown-content" id="FAQ">
        <h1 className="section-header">🤓🤓 Technical Background 🤓🤓</h1>

        <div className="faq-container">
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

              But most people don't use 10-character passwords. They use common words that can be easily found on a wordlist. Or they turn \`dragon\` into something harder like \`dr@g0n123!\`. That's an improvement, but since most attackers will be using a [dictionary of common words/names/passwords](https://github.com/kkrypt0nn/wordlists?tab=readme-ov-file), and will know to expect [obvious subtituations](https://blanchardjeremy.github.io/tryzxcvbn/), it doesn't help as much as we might hope.

              This [classic xkcd comic](https://xkcd.com/936/) about passwords vs passphrases is a good summary.

              <img src="https://imgs.xkcd.com/comics/password_strength_2x.png" alt="xkcd comic about passphrases vs password" width="700" />

              | Password          | Attack approach                                     | Bits of entropy          | Avg time to crack <br>(3 million guesses/sec) |
              |-------------------|-----------------------------------------------------|--------------------------|-----------------------------------------------|
              | \`dragon\`        | Top 100 passwords                                   | = **7 bits**                   | Instatnly                                     |
              | \`dr@g0n\`        | + Common substitutions  (10 options)                | 7+3+3 <br>= **13 bits**          | Instantly                                     |
              | \`dr@g0n1998$!#\` | + Year (2,000 options) + symbol at end (30 options) | 7+3+3+11+5+5+5 <br>= **34 bits** | 1 day                                       |
              | \`socrates\`      | Common names (20,000) | = **14 bits** | Instantly                                       |
              | \`socrates*^$cacatus\`| Common names (20,000) + symbols <br>+ Common words (20,000) | 14+3+3+3+14 <br>= **37 bits** | 7 hours                                       |

              We can achieve much more human-friendly passphrases by using something like [diceware](https://www.eff.org/dice). Diceware draws from a list of **7,776 words**. So a phrase with 3 words has 7,776<sup>3</sup> = 479 trillion possible combinations. Each word adds 12.9 bits of entropy.
              
              | Diceware passphrase                                     | Bits of entropy | Avg time to crack <br>(3 million guesses/sec) |
              |---------------------------------------------------------|-----------------|---------------|
              | 3 words: \`shading deflected panorama\`                 | **39 bits**     | 2 days        |
              | 4 words: \`wrangle matter esquire granny\`           | **52 bits**     | 30 years      |
              | 5 words: \`dyslexia glitter repossess glimpse unrobed\` | **65 bits**     | 100,000 years |

              The passphrases we generate on this site offer similar strength, but are easier to visualize and therefore easier to remember.

              | **StrongPhrase.net passphrase**                                              | Bits of entropy |  Avg time to crack <br>(3 million guesses/sec) |
              |------------------------------------------------------------------------------|-----------------|---------------|
              | Strong: \`evil juror obtains thin moths\`                                    | **44 bits**     | 40 days       |
              | Stronger: \`drunk niece and greedy goose clean tall book\`                   | **58 bits**     | 2,000 years   |
              | Strongst: \`emotional boxer and concerned virus acquire 45 smashed baskets\` | **66 bits**     | 400,000 years |


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

              |                                | Standard consumer hardware    | Best consumer hardware                                                  | Nation state (NSA, etc.)      |
              |--------------------------------|-------------------------------|-------------------------------------------------------------------------|-------------------------------|
              | **Hardware**                   | RTX 4090                      | RTX 4090 with 10 GPUs <br>(≈ Cloud-based A100 with 16 GPUs)[^cloudA100] | A100 with 10,000 GPUs         |
              | **Est. Cost**                  | $2,300                        | $23,000 or <br>$64/hour for 2 AWS instances[^aws]                       | $410,000/hour                 |
              | **Crack time for 8 chars**[^1] | 99 years                      | 7 years                                                                 | 5 minutes                     |
              | **Calculation**                | = 70^8 / (99\\*365\\*24*3600) | = 70^8 / (7\\*365\\*24*3600)                                            | = 70^8 / (5*60)               |
              | **Guesses/second**             | = **184,000/sec**             | = **2.6 million/sec**                                                   | = **1.9 trillion/sec**        |


              [^1]: Crack time is based on [hivesystems.com's table](https://www.hivesystems.com/blog/are-your-passwords-in-the-green) for a password with 8 characters using lowercase, uppercase, symbols, and numbers (70 characters in the pool).
              [^aws]: AWS pricing is based on the [Amazon EC2 P4d](https://aws.amazon.com/ec2/instance-types/p4/) for EC2 P4d.24xlarge instances.
              [^clouda100]: [Hivesystems.com's table](https://www.hivesystems.com/blog/are-your-passwords-in-the-green) lists "17 years" to crack our standard password using an A100 x8, so A100 x16 should be about 8 years, which is close enough to the "7 years" listed for RTX 4090. 

              The "**Far future  nation state**" profile is a wild guess at what might be possible far in the future.

              If we use [Jacob Enger's Money-to-Crack approach](https://jacobegner.blogspot.com/2020/11/password-strength-in-dollars.html), we can find:

              Let's figure out a reasonable estimate for "cost to crack" scenario:

              |                                                             | Guesses/second | Guesses/$           | $ per 2^32 guesses[^convert] |
              |-------------------------------------------------------------|----------------|---------------------|------------------------------|
              | AWS A100 x10,000 using bcrypt<br>(based on hivesystems.com) | 2.6 trillion   | 17 billion [^conv2] | $0.25                        |
              | 1x RTX 4090 using bcrypt <br>(best case)                    | 184,000        | 9.3 billion         | $0.46                        |
              | 1Password using PBKDF2<br>(much harder than bcrypt)         | *[???]*        | 715 million         | $6                           |

              [^convert]: The formala to convert from guesses/dollar to dollars per 2^32 guesses is: **(2^32) / (guesses/second)**
              [^conv2]: The formula here is **(guesses/second * 3600) / ($/hour)** so here we have: **(1.9 trillion * 3600) / $410,000 = 17 billion**.


              The powerful GPUs that help an attacker crack passwords are the same GPUs that are used to train AI models. As AI continues to explore, it's reasonable to assume that these GPUs will become ever more available on the cloud.


            `} 
          />

        </div>


      </section>
    </div>
  );
};

export default Faq;
