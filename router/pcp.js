const router = require('express').Router();
const pcp = require('../controllers/pcp.js');

router.get('/tables',pcp.getTable)

module.exports = router