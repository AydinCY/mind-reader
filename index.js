const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to simulate the "mind reading" action
app.get('/guess/:number', (req, res) => {
  const userNumber = req.params.number;

  // Simulate thinking for 10 seconds
  setTimeout(() => {
    res.send({ guess: userNumber });
  }, 10000); // 10-second delay
});

// Fallback: serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
