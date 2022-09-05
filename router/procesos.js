const router = require('express').Router();
const procesos = require('../controllers/procesos.js');

router.put('/login',procesos.login)
router.get('/users',procesos.getUsers)
module.exports = router