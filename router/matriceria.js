const router = require('express').Router();
const matriceria = require('../controllers/matriceria.js');

router.put('/upload',matriceria.uploadInput)
router.get('/tables',matriceria.getTable)
router.get('/moldes',matriceria.getMoldes)

module.exports = router