const router = require('express').Router();
const {create, getOne, getAll, updateOne, deleteOne, me } = require('../controllers/user.controllers');

// Creating new user
router.post('/', create);

// Get user's infomation
router.get('/me', me)

router.get('/:id', getOne);

// Update user by ID
router.put('/:id', updateOne);

// Delete user by ID
router.delete('/:id', deleteOne);

// Get all user
router.get('/', getAll);

module.exports = router;