const express = require('express');
const router = new express.Router();
const JoinController = require('../controllers/JoinController');

const controller = new JoinController();
router.post('/', (req) => {
  controller.logout(req);
});

module.exports = router;
