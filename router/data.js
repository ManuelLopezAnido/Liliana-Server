const router = require('express').Router();
const data = require('../controllers/data.js');

router.get('/machines', data.getMachines)
router.get('/pzabas', data.getPzAbas)
router.get('/pzdepo', data.getPzDepo)
router.get('/productos', data.getProductos)

router.get('/emails/procesos',data.getEmailsProcesos)
router.post('/emails/procesos',data.postEmailsProcesos)

router.get('/emails/inyeccion',data.getEmailsInyeccion)
router.post('/emails/inyeccion',data.postEmailsInyeccion)

router.get('/matriceria/users',data.getMatriceriaUsers)

module.exports = router