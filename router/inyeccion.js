const router = require('express').Router();
const inyeccion = require('../controllers/inyeccion.js');

router.put('/login',inyeccion.login)
//router.put('/upload',inyeccion.uploadInput)
router.get('/tablas',inyeccion.getTable)

module.exports = router