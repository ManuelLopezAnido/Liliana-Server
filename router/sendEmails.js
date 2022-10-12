const router = require('express').Router();
const sendEmails = require('../controllers/sendEmails.js');

router.get('/send/:area',sendEmails.matrices)


module.exports = router