const router = require('express').Router();
const abastecimiento = require('../controllers/abastecimiento.js');

router.get('/tables',abastecimiento.getTable)
router.put('/login',abastecimiento.login)
router.put('/upload',abastecimiento.uploadInput)
router.get('/inputs',abastecimiento.getInputs)
// router.get('/piezas',abastecimiento.getPiezas)
router.get('/users',abastecimiento.getUsers)
router.post('/actualizar/operario',abastecimiento.newWorker)
//router.post('/actualizar/pieza',abastecimiento.newPz)

module.exports = router;