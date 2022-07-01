const router = require('express').Router();
const deposito = require('../controllers/deposito.js');

router.put('/login',deposito.login)
router.put('/upload',deposito.uploadInput)
router.get('/tables',deposito.getTable)
router.get('/piezas',deposito.getPiezas)

module.exports = router