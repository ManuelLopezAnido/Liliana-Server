const router = require('express').Router();
const abastecimiento = require('../controllers/abastecimiento.js');

router.get('/tables',abastecimiento.getTable)
router.put('/login',abastecimiento.login)
router.put('/upload',abastecimiento.uploadInput)

module.exports = router;