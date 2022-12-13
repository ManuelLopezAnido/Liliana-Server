const router = require('express').Router();
const data = require('../controllers/data.js');



router.get('/piezas/upload/allInputs', data.uploadAllItems)
router.get('/piezas/:area', data.getItems)
router.post('/piezas/:area', data.addItem)

router.get('/productos', data.getProductos) 
router.post('/productos', data.addProduct)//this is not used by the application so far

router.get('/maquinas', data.getMachines)
router.get('/moldes',data.getMolds)


router.get('/emails/procesos',data.getEmailsProcesos)
router.post('/emails/procesos',data.postEmailsProcesos)

router.get('/emails/inyeccion/maquinas',data.getEmailsInyeccionMaq)
router.post('/emails/inyeccion/maquinas',data.postEmailsInyeccionMaq)

router.get('/emails/inyeccion/moldes',data.getEmailsInyeccionMol)
router.post('/emails/inyeccion/moldes',data.postEmailsInyeccionMol)



module.exports = router