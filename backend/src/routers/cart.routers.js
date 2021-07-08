const router = require('express').Router();
const {create, getOne, getAll, updateOne, deleteOne, search, getCartByIdUser,cancelBill, count} = require('../controllers/cart.controllers');


// Get all orders
router.get('/', getAll);

// Search orders
router.post('/create', create);

// // Get all orders
// router.get('/search', authenAdmin, search);

// Get all orders by id_User
router.get('/:id_user', getCartByIdUser);
// // Get orders by ID

// // Hủy bill
// router.post('/cancel-bill', cancelBill);

// router.get('/:id', getOne);

// // Update orders by ID
// router.put('/:id',  authenAdmin, updateOne);

// // Delete orders by ID
// router.delete('/:id',  authenAdmin, deleteOne);

module.exports = router;