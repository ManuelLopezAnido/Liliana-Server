const express = require('express');
const router = express.Router();
const abastecimientoRouter = require('./abastecimiento.js')
const armadoRouter = require ('./armado.js')
const pcpRouter = require ('./pcp.js')

router.use('/abastecimiento',abastecimientoRouter)
router.use('/armado',armadoRouter)
router.use('/pcp',pcpRouter)

router.get('/time', (req, res) => res.send({
  time: Date.now(),
}));

module.exports = router;