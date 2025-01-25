// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pdfFunctions = require('./pdfFunctions');
const uploadFunctions = require('./uploadFunctions');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json()); // Add body parser middleware if needed (for POST requests)

// Route to get PDF file data
app.get('/get-pdfs', async (req, res) => {    
  const pdfFiles = await pdfFunctions.getPdfsFromFolder(req.query.Id);
  res.json(pdfFiles); // Send the PDF file data as a JSON response
});

// Route for uploading a file to Google Drive
app.post('/upload', uploadFunctions.upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    const response = await uploadFunctions.uploadFileToDrive(req.file ,req.query.Id);
    res.send(response);
  } catch (err) {
    res.status(500).send('Error uploading file');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
