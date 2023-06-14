const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

let dataRows = []; // Array to store the data rows

// Define the route to receive the data and append it to the CSV file
app.post('/addtocsv', (req, res) => {
  const data = req.body.data;
  const score = req.body.score;

  const csvFilePath = path.join(__dirname, 'myData.csv');

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Process existing data if needed
    })
    .on('end', () => {
      // Append the new data to the CSV file
      const newData = `${data},${score}\n`; // Format the data for both columns

      fs.appendFile(csvFilePath, newData, (err) => {
        if (err) {
          console.error('Error adding data to CSV file:', err);
          res.status(500).send('Error adding data to CSV file');
        } else {
          console.log('Data added to CSV file');
          res.send('Data added to CSV file');
        }
      });
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).send('Error reading CSV file');
    });
});

// Define a route to retrieve the data from the CSV file
app.get('/getdata', (req, res) => {
  const csvFilePath = path.join(__dirname, 'myData.csv');

  dataRows = []; // Clear the dataRows array before populating it again

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const data = row['Data']; // Get the value of the 'Data' column
      const score = row['Score']; // Get the value of the 'Score' column
      dataRows.push({ data, score }); // Add both data and score to the array as an object
    })
    .on('end', () => {
      console.log('Data retrieved from CSV file');
      res.send('Data retrieved from CSV file');
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).send('Error reading CSV file');
    });
});

// Define a route to retrieve the dataRows array
app.get('/datarows', (req, res) => {
  res.json({ dataRows });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
