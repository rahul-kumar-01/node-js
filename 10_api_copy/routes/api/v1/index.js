const express = require('express');
const router = express.Router();

router.use('/post',require('./post'));
router.use('/users',require('./user'));
module.exports = router;