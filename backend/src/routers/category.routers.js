const router = require('express').Router();
const {create, getAll, getOne, updateOne, deleteOne, count } = require('../controllers/category.controllers');
const authenAdmin = require('../validations/authenAdmin');

// Count all categories
router.get('/count', count);

// Getting all categories
router.get('/', getAll);

// Creating new category
router.post('/', authenAdmin, create);

// Getting category by ID
router.get('/:id', getOne);

// Updating category by ID
router.put('/:id', authenAdmin, updateOne);

// Deleting category by ID
router.delete('/:id', authenAdmin, deleteOne);

module.exports = router;
