const http = require("http");
const path = require("path");
const bodyParser = require('body-parser');
const express = require('express')
const config = require('./app/config/config');
const mariadb = require('mariadb/callback');


// DB Connection
const conn = mariadb.createConnection({
  host: config.db.host, 
  database: config.db.database,
  user: config.db.user, 
  password: config.db.password,
  port: config.db.port
});
conn.connect(err => {
    if (err) return console.log("Failed to connect");
    console.log(`Successfully connected to mariadb server: ${conn.serverVersion()}`);
});


// Starting Server
const app = express()

app.use('/', express.static(path.join(__dirname, 'app/client')))

const server = http.createServer(app);

app.listen(config.app.port, () => {
  console.log(`Example app listening on port ${config.app.port}`)
});