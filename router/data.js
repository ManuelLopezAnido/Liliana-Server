const router = require('express').Router();
const data = require('../controllers/data.js');

router.get('/machines', data.getMachines)

router.get('/pzabas', data.getPzAbas)
router.post('/pzabas', data.postPzAbas)

router.get('/pzdepo', data.getPzDepo)
router.post('/pzdepo', data.postPzDepo)

router.get('/productos', data.getProductos)
router.post('/productos', data.postProductos)


router.get('/emails/procesos',data.getEmailsProcesos)
router.post('/emails/procesos',data.postEmailsProcesos)

router.get('/emails/inyeccion',data.getEmailsInyeccion)
router.post('/emails/inyeccion',data.postEmailsInyeccion)

router.get('/matriceria/users',data.getMatriceriaUsers)
router.get('/matriceria/moldes',data.getMatriceriaMoldes)

module.exports = router