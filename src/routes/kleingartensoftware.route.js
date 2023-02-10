const express = require('express');
const router = express.Router();
const kleingartensoftwareController = require('../controllers/kleingartensoftware.controller');

/* GO TO LOGIN_PAGE */
router.get('/', kleingartensoftwareController.login);

router.post('/auth', kleingartensoftwareController.auth)

router.get('/home', kleingartensoftwareController.home)

module.exports = router;