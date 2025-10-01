const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // allow React frontend
app.use(express.json()); // parse JSON

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from Node backend!" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
