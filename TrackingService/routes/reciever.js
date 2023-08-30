const express = require('express');
const regularController = require('../controller/reciever');
const router = express.Router();

router.post('/tracker/', regularController.postData);

module.exports = router;
