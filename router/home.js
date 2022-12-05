
const router = require('express').Router();
const home = require('../controllers/home.js');


//AUX
router.post('/users/users', home.uploadAllUsers)
router.get('/users', home.getUsers)
router.get('/users/toUpperCase', home.toUpperCase)
router.post('/login', home.login)
router.post('/newuser/abastecimiento', home.updateUserAbas)
router.post('/newuser/deposito', home.updateUserDepo)
router.post('/newuser/inyeccion', home.updateUserInye)


module.exports = router