const router = require('express').Router();
const {create, getAll, getOne, updateOne, deleteOne, count } = require('../controllers/tag.controllers');
const authenAdmin = require('../validations/authenAdmin');

// Count all tags
router.get('/count', count);

// Getting all tags
router.get('/', getAll);

// Creating new tag
router.post('/', authenAdmin, create);

// Getting tag by ID
router.get('/:id', getOne);

// Updating tag by ID
router.put('/:id', authenAdmin, updateOne);

// Deleting tag by ID
router.delete('/:id', authenAdmin, deleteOne);

module.exports = router;
