const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const config = require('./src/configs/general.config');
const kleingartensoftwareRouter = require('./src/routes/kleingartensoftware.route');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(session({
	secret: config.secret,
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/src/view/static')));

app.use('/', kleingartensoftwareRouter);

app.set("view engine", "ejs");

/* Error handler middleware */
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({'message': err.message});
	return;
  });

app.listen(config.port, () =>
  console.log(`Server is listening on port ${config.port}!`),
);