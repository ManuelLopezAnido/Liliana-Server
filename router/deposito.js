const router = require('express').Router();
const deposito = require('../controllers/deposito.js');

router.put('/login',deposito.login)
router.put('/upload',deposito.uploadInput)
router.get('/tables',deposito.getTable)
// router.get('/piezas',deposito.getPiezas)
// router.get('/users',deposito.getUsers)
// router.post('/actualizar/operario',deposito.newWorker)
// router.post('/actualizar/pieza',deposito.newPz)

module.exports = router