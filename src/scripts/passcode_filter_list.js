const fs = require('fs');
const readline = require('readline');

const BDAY_FILE = 'wordlists/birthdays.txt';
const ROCKYOU_SIX_DIGITS_FILE = 'wordlists/rockyou_six_digits.txt';
const ROCKYOU_SIX_DIGITS_NO_BIRTHDAYS_FILE = 'wordlists/rockyou_six_digits_no_birthdays.txt';
const FILTERED_PASSCODES_JS_FILE = 'wordlists/filtered_passcodes_six.js';

// Generate birthdays.txt with all 6-digit birthdays in MMDDYY, DDMMYY, and YYMMDD formats
async function generateBirthdays() {
    const birthdays = new Set();

    for (let month = 1; month <= 12; month++) {
        for (let day = 1; day <= 31; day++) {
            if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) continue; // April, June, September, November have 30 days
            if (month === 2 && day > 29) continue; // February has at most 29 days
            if (month === 2 && day > 28 && !isLeapYear()) continue; // February has 28 days in non-leap years

            for (let year = 0; year <= 99; year++) {
                const mm = month.toString().padStart(2, '0');
                const dd = day.toString().padStart(2, '0');
                const yy = year.toString().padStart(2, '0');

                birthdays.add(mm + dd + yy);
                birthdays.add(dd + mm + yy);
                birthdays.add(yy + mm + dd);
            }
        }
    }

    fs.writeFileSync(BDAY_FILE, Array.from(birthdays).join('\n'), 'utf8');
    console.log(`Birthdays generated and saved to ${BDAY_FILE}`);
}

// Check if year is a leap year
function isLeapYear(year = 2000) { // Default to a leap year to handle February 29
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Remove entries from rockyou_six_digits.txt that exist in birthdays.txt
async function removeBirthdaysFromRockyou() {
    // Read the birthdays into a set for fast lookup
    const birthdays = new Set();
    const birthdayStream = fs.createReadStream(BDAY_FILE);
    const rlBirthdays = readline.createInterface({
        input: birthdayStream,
        crlfDelay: Infinity
    });

    for await (const line of rlBirthdays) {
        birthdays.add(line.trim());
    }

    // Read the rockyou six-digit numbers and filter out the ones present in birthdays
    const rockyouStream = fs.createReadStream(ROCKYOU_SIX_DIGITS_FILE);
    const rlRockyou = readline.createInterface({
        input: rockyouStream,
        crlfDelay: Infinity
    });

    const filteredNumbers = [];
    const writeStream = fs.createWriteStream(ROCKYOU_SIX_DIGITS_NO_BIRTHDAYS_FILE);

    for await (const line of rlRockyou) {
        const trimmedLine = line.trim();
        if (!birthdays.has(trimmedLine)) {
            writeStream.write(trimmedLine + '\n');
            filteredNumbers.push(trimmedLine);
            if (filteredNumbers.length >= 10000) break; // Stop after 10,000 numbers
        }
    }

    writeStream.end();
    console.log(`Filtered rockyou six-digit numbers saved to ${ROCKYOU_SIX_DIGITS_NO_BIRTHDAYS_FILE}`);

    return filteredNumbers;
}

// Save first 10k filtered numbers and append all birthdays to filtered_passcodes_six.js
async function saveFilteredPasscodes(filteredNumbers) {
    const birthdayStream = fs.createReadStream(BDAY_FILE);
    const rlBirthdays = readline.createInterface({
        input: birthdayStream,
        crlfDelay: Infinity
    });

    const writeStream = fs.createWriteStream(FILTERED_PASSCODES_JS_FILE);
    writeStream.write('export const filteredPasscodes = [\n');

    for (const number of filteredNumbers) {
        writeStream.write(`  '${number}',\n`);
    }

    for await (const line of rlBirthdays) {
        writeStream.write(`  '${line.trim()}',\n`);
    }

    writeStream.write('];\n');
    writeStream.end();
    console.log(`Filtered passcodes saved to ${FILTERED_PASSCODES_JS_FILE}`);
}

// Run the functions
async function main() {
    await generateBirthdays();
    const filteredNumbers = await removeBirthdaysFromRockyou();
    await saveFilteredPasscodes(filteredNumbers);
}

main();
