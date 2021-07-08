const router = require('express').Router();
const {create, getOne, getAll, updateOne, deleteOne, search, getBillByIdUser,cancelBill, count} = require('../controllers/bill.controllers');
const authenJWT = require('../validations/authenJWT');
const authenAdmin = require('../validations/authenAdmin');

// Creating new orders
router.post('/', create);

// Get all orders
router.get('/', getAll);

// Search orders
router.get('/count', count);

// Get all orders
router.get('/search', authenAdmin, search);

// Get all orders by id_User
router.get('/user/:id_user', getBillByIdUser);
// Get orders by ID

// Hủy bill
router.post('/cancel-bill', cancelBill);

router.get('/:id', getOne);

// Update orders by ID
router.put('/:id',  authenAdmin, updateOne);

// Delete orders by ID
router.delete('/:id',  authenAdmin, deleteOne);

module.exports = router;