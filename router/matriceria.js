const router = require('express').Router();
const matriceria = require('../controllers/matriceria.js');

router.put('/upload',matriceria.uploadInput)
router.get('/tables',matriceria.getTable)

module.exports = router