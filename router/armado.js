const router = require('express').Router();
const armado = require('../controllers/armado.js');

router.put('/login',armado.login)
router.put('/upload',armado.uploadInputs)

module.exports = router