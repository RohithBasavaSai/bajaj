const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Helper functions
const extractData = (data) => {
    const numbers = [];
    const alphabets = [];
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1) {
            alphabets.push(item);
        }
    });
    return { numbers, alphabets };
};

const getHighestLowercaseAlphabet = (alphabets) => {
    const lowerCaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
    return lowerCaseAlphabets.sort().pop() || null;
};

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            error: "Invalid input, 'data' should be an array."
        });
    }

    const { numbers, alphabets } = extractData(data);
    const highestLowercaseAlphabet = getHighestLowercaseAlphabet(alphabets);

    res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
