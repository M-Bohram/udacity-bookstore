// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });

const os = require('os')
const path = require('path')
const express = require('express');
const app = express();
const cors = require('cors');
const dbo = require('./db/conn');

const booksRouter = require('./routes/books')

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('build'))
app.use(booksRouter);
// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
