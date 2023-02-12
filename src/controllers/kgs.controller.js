const path = require('path');
const session = require('express-session');
const kgs = require('../services/kgs.service');
const dbConfig = require('../configs/db.config');
const mysql = require('mariadb/callback');


const connection = mysql.createConnection({
    host     : dbConfig.host,
    user     : dbConfig.user,
    password: dbConfig.password,
    database : dbConfig.database
});


async function login(req, res) {
    res.sendFile(path.join(__dirname, '../view/login.html'));
};

async function login_again(req, res) {
    res.sendFile(path.join(__dirname, '../view/login_again.html'));
};

async function logout(req, res) {
	req.session.loggedin = false;
	req.session.username = '';
    res.sendFile(path.join(__dirname, '../view/login.html'));
};

async function auth(req, res) {
	let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		await connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, result, fields) {
			if (error) throw error;
			if (result.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				req.session.real_name = result[0].real_name;
				req.session.club_function = result[0].club_function;
				req.session.email = result[0].email;
				res.redirect('/home');
			} else {
				//res.send('Incorrect Username and/or Password!');
				res.redirect('/login_again');
			}			
			res.end();
		});
	} else {
		res.redirect('/');
		res.end();
	}
	connection.close;
};

async function home(req, res) {
	if (req.session.loggedin) {
    	return res.render(path.join(__dirname, '../view/index'), {
			username: req.session.username,
			real_name: req.session.real_name,
			email: req.session.email,
			club_function: req.session.club_function,
			active_button: 'home'
		});
	} else {
    	return res.sendFile(path.join(__dirname, '../view/login.html'));
	}
};

async function plant(req, res, next) {
	if (req.session.loggedin) {
		await connection.query('SELECT * FROM basedata WHERE id = 1', function(error, result, fields) {
			if (error) throw err;
			res.render(path.join(__dirname, '../view/plant'), {
				active_button: 'plant',
				garden_name: result[0].garden_name,
				garden_street: result[0].street,
				garden_city: result[0].city,
				garden_plz: result[0].plz,
				garden_homepage: result[0].homepage

			});
		});
		connection.end;
	} else {
    	return res.sendFile(path.join(__dirname, '../view/login.html'));
	}
};




module.exports = {
    login,
	login_again, 
    auth,
    home,
	plant,
	logout
};