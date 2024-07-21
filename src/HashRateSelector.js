import React from 'react';

const hardwareOptions = {
    "Standard consumer hardware": 2e5, // 200,000 guesses/sec
    "Best consumer hardware": 3e6, // 3 million guesses/sec
    "Nation state (NSA, etc.)": 2e12 // 2 trillion guesses/sec
};

export const defaultHashRate = Object.values(hardwareOptions)[1];

const formatGuessRate = (value) => {
    if (value >= 1e12) {
        return `${(value / 1e12).toFixed(0)} trillion guesses/sec`;
    } else if (value >= 1e6) {
        return `${(value / 1e6).toFixed(0)} million guesses/sec`;
    }
    return `${value.toLocaleString()} guesses/sec`;
};

const HashRateSelector = ({ hashRate, setHashRate }) => {

    const handleChange = (e) => {
        const selectedValue = Number(e.target.value);
        setHashRate(selectedValue);
        console.log(hardwareOptions);
    };

    return (
        <select
            id="hashRateSelect"
            value={hashRate}
            onChange={handleChange}
            className="border rounded-lg select select-bordered select-sm w-full"
        >
            {Object.entries(hardwareOptions).map(([key, value]) => (
                <option key={value} value={value}>
                    {key} [{formatGuessRate(value)}]
                </option>
            ))}
        </select>
    );
};

export default HashRateSelector;
