const express = require('express');
const router = express.Router();

const abastecimientoRouter = require('./abastecimiento.js')
const armadoRouter = require ('./armado.js')
const pcpRouter = require ('./pcp.js')
const depositoRouter = require('./deposito.js')
const inyeccionRouter = require ('./inyeccion.js')
const procesosRouter = require('./procesos.js')
const matriceriaRouter = require('./matriceria.js')
const homeRouter = require('./home.js')
const dataRouter = require('./data.js')
const sendEmailsRouter = require('./sendEmails.js')


router.use('/abastecimiento',abastecimientoRouter)
router.use('/armado',armadoRouter)
router.use('/pcp',pcpRouter)
router.use('/deposito',depositoRouter)
router.use('/inyeccion',inyeccionRouter)
router.use('/procesos',procesosRouter)
router.use('/matriceria',matriceriaRouter)
router.use('/home',homeRouter)
router.use('/data',dataRouter)
router.use('/sendEmails',sendEmailsRouter)
router.get('/time', (req, res) => res.send({
  time: Date.now(),
}));

module.exports = router;