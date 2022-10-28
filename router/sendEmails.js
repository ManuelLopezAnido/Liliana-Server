const router = require('express').Router();
const sendEmails = require('../controllers/sendEmails.js');

router.post('/send/:area', sendEmails.matrices)


module.exports = router