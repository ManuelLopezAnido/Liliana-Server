const router = require('express').Router();
const data = require('../controllers/data.js');

router.get('/machines', data.getMachines)

router.get('/piezas/abastecimiento', data.getPzAbas)
router.post('/piezas/abastecimiento', data.postPzAbas)
router.get('/users/abastecimiento', data.getUsersAbas)
router.post('/users/abastecimiento', data.postUserAbas)

router.get('/piezas/deposito', data.getPzDepo)
router.post('/piezas/deposito', data.postPzDepo)
router.get('/users/deposito', data.getUsersDepo)
router.post('/users/deposito', data.postUserDepo)

router.get('/productos', data.getProductos)
router.post('/productos', data.postProductos)


router.get('/emails/procesos',data.getEmailsProcesos)
router.post('/emails/procesos',data.postEmailsProcesos)

router.get('/emails/inyeccion',data.getEmailsInyeccion)
router.post('/emails/inyeccion',data.postEmailsInyeccion)

router.get('/matriceria/users',data.getMatriceriaUsers)
router.get('/matriceria/moldes',data.getMatriceriaMoldes)

module.exports = router