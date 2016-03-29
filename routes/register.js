const express = require('express');
const router = new express.Router();
const JoinController = require('../controllers/JoinController');

const controller = new JoinController();
router.post('/', (req, res, next) => {
  controller.register(req, res, next);
});

module.exports = router;
