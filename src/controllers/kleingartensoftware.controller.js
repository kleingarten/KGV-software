const path = require('path');
const session = require('express-session');
const kleingartensoftware = require('../services/kleingartensoftware.service');
const dbConfig = require('../configs/db.config');
const mysql = require('mariadb/callback');

async function login(req, res) {
    res.sendFile(path.join(__dirname, '../client/login.html'));
};

async function auth(req, res) {
	// Connect to DB
    const connection = await mysql.createConnection({
	    host     : dbConfig.host,
	    user     : dbConfig.user,
	    password: dbConfig.password,
	    database : dbConfig.database
    });
    
    // Capture the input fields
	let username = req.body.username;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, result, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (result.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
};

async function home(req, res) {
    // If the user is loggedin
	if (req.session.loggedin) {
		// Output username
    return res.sendFile(path.join(__dirname, '../client/index.html'));
	} else {
		// Not logged in
    return res.sendFile(path.join(__dirname, '../client/login.html'));
	}
	res.end();
};

module.exports = {
    login, 
    auth,
    home
};