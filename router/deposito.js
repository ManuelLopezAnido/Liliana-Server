const router = require('express').Router();
const deposito = require('../controllers/deposito.js');

router.put('/login',deposito.login)
router.put('/upload',deposito.uploadInput)
router.get('/tablas',deposito.getTable)

module.exports = router