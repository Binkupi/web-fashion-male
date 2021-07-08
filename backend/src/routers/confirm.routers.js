const router = require('express').Router();
const { confirm } = require('../controllers/confirm.controllers');

// Count all categories
router.get('/:token', confirm);

module.exports = router;
