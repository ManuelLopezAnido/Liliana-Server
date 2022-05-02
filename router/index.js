const express = require('express');
const router = express.Router();

const abastecimientoRouter = require('./abastecimiento.js')
const armadoRouter = require ('./armado.js')
const pcpRouter = require ('./pcp.js')
const depositoRouter = require('./deposito.js')
const inyeccionRouter = require ('./inyeccion.js')

router.use('/abastecimiento',abastecimientoRouter)
router.use('/armado',armadoRouter)
router.use('/pcp',pcpRouter)
router.use('/deposito',depositoRouter)
router.use('/inyeccion',inyeccionRouter)

router.get('/time', (req, res) => res.send({
  time: Date.now(),
}));

module.exports = router;