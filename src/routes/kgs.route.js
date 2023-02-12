const express = require('express');
const router = express.Router();
const kgsController = require('../controllers/kgs.controller');

// LOGIN PAGE
router.get('/', kgsController.login);

// LOGIN OK
router.post('/auth', kgsController.auth)
router.get('/auth', kgsController.auth)

// HOMEPAGE IF LOGIN OK
router.get('/home', kgsController.home)

// ShOW & EDIT PLANT
router.get('/plant', kgsController.plant)



module.exports = router;