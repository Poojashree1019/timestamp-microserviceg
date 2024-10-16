# timestamp-microserviceg
Building a Timestamp Microservice is a great project to enhance your full-stack JavaScript skills. Below is a step-by-step guide to create a functional Timestamp Microserviceg.

### Project Overview
The Timestamp Microservice will take a date string or Unix timestamp as input and return the corresponding date in both human-readable and Unix timestamp formats.

### Project Structure
You will use Node.js for the backend with Express and a simple frontend using HTML and JavaScript.

#### Project Directory Structure
```
timestamp-microservice/
│
├── public/
│   ├── index.html 
│   ├── styles.css
│   └── script.js
│
├── server.js
├── package.json
└── README.md
```

### Step 1: Initialize the Project

1. **Create the Project Directory**:
   ```bash
   mkdir timestamp-microservice
   cd timestamp-microservice
   ```

2. **Initialize Node.js**:
   ```bash
   npm init -y
   ```

3. **Install Dependencies**:
   ```bash
   npm install express
   ```

### Step 2: Create the Backend

Create a file named `server.js` in the root directory:

```javascript
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
```

### Step 3: Create the Frontend

#### 3.1 HTML File
Create a file named `index.html` inside the `public` directory:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timestamp Microservice</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Timestamp Microservice</h1>
        <input type="text" id="dateInput" placeholder="Enter a date or timestamp">
        <button id="submitButton">Submit</button>
        <div id="result"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

#### 3.2 CSS File
Create a file named `styles.css` inside the `public` directory:

```css
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
}

.container {
    text-align: center;
}

input {
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    width: 300px;
}

button {
    padding: 10px;
    font-size: 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

#result {
    margin-top: 20px;
    font-size: 18px;
}
```

#### 3.3 JavaScript File
Create a file named `script.js` inside the `public` directory:

```javascript
document.getElementById('submitButton').addEventListener('click', function () {
    const dateInput = document.getElementById('dateInput').value;
    const apiUrl = `/api/timestamp/${dateInput}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.error) {
                resultDiv.innerHTML = `<p>${data.error}</p>`;
            } else {
                resultDiv.innerHTML = `
                    <p>Unix Timestamp: ${data.unix}</p>
                    <p>UTC: ${data.utc}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
```

### Step 4: Run Your Application

1. **Start the Server**:
   ```bash
   node server.js
   ```

2. **Open Your Browser**:
   Navigate to `http://localhost:3000` to see your Timestamp Microservice.

### Testing Your Microservice
You can test the following cases:
- Input a valid date (e.g., `2023-01-01`).
- Input a Unix timestamp (e.g., `1672531199000`).
- Input an invalid date (e.g., `invalid-date`).

### Conclusion
You have built a simple Timestamp Microservice using Node.js and Express. You can further enhance the application by adding more features, such as validation for the input date format or styling enhancements. 
