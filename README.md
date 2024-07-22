# StrongPhrase.net
Use this site to create memorable, strong passphrases.

**[Create your passphrase on StrongPhrase.net →](https://strongphrase.net/)**

This tool is similar to [diceware](https://www.eff.org/dice), but generates phrases that are easier to visualize and remember.

## FAQ
See the [FAQ on the website](https://strongphrase.net/#FAQ)

## Resources
* [Time to crack passwords - famous table (Hivesystems.com)](https://www.hivesystems.com/blog/are-your-passwords-in-the-green)
* [EFF Diceware wordlist](https://www.eff.org/dice) (and fun [D20 fandom wordlists](https://www.eff.org/deeplinks/2018/08/dragon-con-diceware))
* [How to create a strong master password (1Password)](https://blog.1password.com/toward-better-master-passwords/)
* [How strong should your master password be? Cost to crack (1Password)](https://blog.1password.com/cracking-challenge-update/)


## Credits
This is a fork of [Get a Passphrase by Ryan Foster](https://github.com/openidauthority/getapassphrase). This repo is a significant re-write of the interface, while most of the core passphrase generation remains the same.



| Password        | Attack approach                            | Bits of entropy      | Time to crack <br>(2.6 guesses million/sec) |
|-----------------|--------------------------------------------|----------------------|---------------------------------------------|
| \`dragon\`      | Top 100 passwords                          | 7 bits               | Instatnly                                   |
| \`dr@g0n\`      | + Common substitutions  (10 options)       | 7+3+3 = 13 bits      | Instantly                                   |
| \`dr@g0n1998!\` | + Recent year (1,000) + symbol at end (30) | 7+3+3+10+5 = 25 bits | 
