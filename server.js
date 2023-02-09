const http = require("http");
const path = require("path");
const bodyParser = require('body-parser');
const express = require('express')
const config = require('./app/config/config');


const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({
  host: 'localhost', 
  database: 'kgvDB',
  user:'node', 
  password: 'Dynamit007!',
  port: 3306
});
conn.connect(err => {
    if (err) return console.log("Failed to connect");
    console.log(`Successfully connected to mariadb server: ${conn.serverVersion()}`);
});



const app = express()

app.use('/', express.static(path.join(__dirname, 'app/client')))

const server = http.createServer(app);

app.listen(config.app.port, () => {
  console.log(`Example app listening on port ${config.app.port}`)
});