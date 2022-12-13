const router = require('express').Router();
const deposito = require('../controllers/deposito.js');


router.post('/upload',deposito.uploadTable)

router.get('/allInputs',deposito.uploadAllInputs) //just for creation

router.get('/inputs/:month',deposito.getInputs) 
router.post('/input',deposito.addInput)

router.get('/tables',deposito.getTables) 



module.exports = router