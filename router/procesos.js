const router = require('express').Router();
const procesos = require('../controllers/procesos.js');

router.put('/login',procesos.login)
router.get('/users',procesos.getUsers)

router.get('/forms/piezas',procesos.getFormsPz)
router.post('/forms/piezas',procesos.postFormsPz)
router.put('/forms/piezas',procesos.putFormsPz)
router.delete('/forms/piezas/:id',procesos.deleteFormsPz)

router.get('/forms/moldes',procesos.getFormsMol)
router.post('/forms/moldes',procesos.postFormsMol)
router.put('/forms/moldes',procesos.putFormsMol)
router.delete('/forms/piezas',procesos.deleteFormsMol)

router.get('/forms/maquinas',procesos.getFormsMaq)
router.post('/forms/maquinas',procesos.postFormsMaq)
router.put('/forms/maquinas',procesos.putFormsMaq)
router.delete('/forms/piezas/:id',procesos.deleteFormsMaq)

module.exports = router