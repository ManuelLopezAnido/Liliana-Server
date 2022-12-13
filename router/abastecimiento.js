const router = require('express').Router();
const abastecimiento = require('../controllers/abastecimiento.js');

router.get('/tables',abastecimiento.getTables)
router.post('/onetable', abastecimiento.getOneTable)
router.post('/upload', abastecimiento.uploadTable)

router.get('/allTables',abastecimiento.uploadAllTable) //just for creation

router.post('/input',abastecimiento.addInput)
router.get('/inputs/:month',abastecimiento.getInputs)

router.get('/allInputs',abastecimiento.uploadAllInputs) //just for creation

// router.get('/users',abastecimiento.getUsers)
// router.post('/actualizar/operario',abastecimiento.newWorker)
//router.post('/actualizar/pieza',abastecimiento.newPz)

module.exports = router;