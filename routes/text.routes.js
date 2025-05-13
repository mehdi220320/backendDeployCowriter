const express = require('express');
const router = express.Router();
const textController = require('../controllers/text.Controller'); // Import the controller

router.post('/reformulate', textController.reformulateText);


module.exports = router;
