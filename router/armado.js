const router = require('express').Router();
const armado = require('../controllers/armado.js');

router.put('/login',armado.login)
router.put('/upload',armado.uploadInputs)
router.get('/users',armado.getUsers)
router.get('/productos',armado.getProductos)
router.get('/inputs',armado.getInputs)
module.exports = router