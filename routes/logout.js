const express = require('express');
const router = new express.Router();
const JoinController = require('../controllers/JoinController');

const controller = new JoinController();
router.post('/', (req, res) => {
  controller.logout(req, res);
});

module.exports = router;
