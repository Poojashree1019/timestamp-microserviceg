const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));

// Route for handling timestamp requests
app.get('/api/timestamp/:date_string?', (req, res) => {
    const dateString = req.params.date_string;
    let date;

    // If dateString is a number, treat it as a Unix timestamp
    if (!isNaN(dateString)) {
        date = new Date(parseInt(dateString));
    } else {
        date = new Date(dateString);
    }

    // If the date is invalid, return an error
    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }

    // Send back the response
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
    });
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
