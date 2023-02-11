const express = require('express');
const router = express.Router();
const kleingartensoftwareController = require('../controllers/kleingartensoftware.controller');

// LOGIN PAGE
router.get('/', kleingartensoftwareController.login);

// LOGIN OK
router.post('/auth', kleingartensoftwareController.auth)

// HOMEPAGE IF LOGIN OK
router.get('/home', kleingartensoftwareController.home)

// ShOW & EDIT PLANT
router.get('/plant', kleingartensoftwareController.plant)

module.exports = router;