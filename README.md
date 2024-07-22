# StrongPhrase.net
Use this site to create memorable, strong passphrases.

**[Create your passphrase on StrongPhrase.net →](https://strongphrase.net/)**

This tool is similar to [diceware](https://www.eff.org/dice), but generates phrases that are easier to visualize and remember.


## Examples 

| Diceware                                                             | **StrongPhrase.net**                                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| `shading deflected panorama`<br>(40 bits of entropy)                 | `evil juror obtains 300 thin moths`<br>(46 bits of entropy)                              |
| `country cradle barbecue predator`<br>(52 bits of entropy)           | `drunk niece and greedy goose clean tall book`<br>(58 bits of entropy)                   |
| `dyslexia glitter repossess glimpse unrobed`<br>(64 bits of entropy) | `emotional boxer and concerned virus acquire 45 smashed baskets`<br>(66 bits of entropy) |

\* *Entropy referrs to how many attempts would be required to guess the password.*

As you can see, our passphrases must be longer to achieve the same amount of entropy as diceware passphrases. However, they are easier to remember.


## Why passphrases
This [classic xkcd comic](https://xkcd.com/936/) about passwords vs passphrases is a good summary of why passphrases are better than passwords.
![xkcd comic about passphrases vs passwords](https://imgs.xkcd.com/comics/password_strength_2x.png)


## Calculating cracking strength profiles
Estimating the number guesses/session (aka: hashes/second) is challenging because the functions used to encrypt a password vary widely.

The folks at hivesystems.com have a great [table](https://www.hivesystems.com/blog/are-your-passwords-in-the-green) that shows the time it would take to crack a password based on the number of guesses/second. They've put a great deal of thought into their assumptions, so we will use the same assumptions: **hashed with bcrypt at a cost (aka: [work factor](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#using-work-factors)) of 32**.

This data is current as of 2024 and will need updated.

The site offers attack profiles:
|                             | Standard consumer hardware  | Best consumer hardware           | Nation state attacker (NSA, etc.) |
|-----------------------------|-----------------------------|----------------------------------|-----------------------------------|
| Hardware                    | RTX 4090                    | RTX 4090 x10 (or AWS A100 x16)   | A100 x10,000                      |
| Cost                        | $2,300                      | $64/hour for 2 AWS instances[^2] | $64,000/hour                      |
| Crack time for 8 chars [^1] | 99 years                    | 7 years                          | 5 minutes                         |
| Calculation                 | `= 70^8 / (99*365*24*3600)` | `= 70^8 / (7*365*24*3600)`       | `= 70^8 / (5*60)`                 |
| Guesses/second              | = 184,000/sec               | = 2.6 million/sec                | = 1.9 trillion/sec                |





## Resources
* [Time to crack passwords - famous table (Hivesystems.com)](https://www.hivesystems.com/blog/are-your-passwords-in-the-green)
* [EFF Diceware wordlist](https://www.eff.org/dice) (and fun [D20 fandom wordlists](https://www.eff.org/deeplinks/2018/08/dragon-con-diceware))
* [How to create a strong master password (1Password)](https://blog.1password.com/toward-better-master-passwords/)
* [How strong should your master password be? Cost to crack (1Password)](https://blog.1password.com/cracking-challenge-update/)


## Credits
This is a fork of [Get a Passphrase by Ryan Foster](https://github.com/openidauthority/getapassphrase). This repo is a significant re-write of the interface, while most of the core passphrase generation remains the same.

## Footnotes
[^1]: Crack time is based on [hivesystems.com's table](https://www.hivesystems.com/blog/are-your-passwords-in-the-green) for a password with 8 characters, lowercase, uppercase, symbols, and numbers (70 character set).
[^2]: AWS pricing is based on the [Amazon EC2 P4d](https://aws.amazon.com/ec2/instance-types/p4/) for EC2 P4d.24xlarge instances.