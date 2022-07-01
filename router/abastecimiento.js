const router = require('express').Router();
const abastecimiento = require('../controllers/abastecimiento.js');

router.get('/tables',abastecimiento.getTable)
router.put('/login',abastecimiento.login)
router.put('/upload',abastecimiento.uploadInput)
router.get('/inputs',abastecimiento.getInputs)
router.get('/piezas',abastecimiento.getPiezas)

module.exports = router;