const { Cart } = require('../models/cart.models');
const CartRepo = require('../repositories/cart.repo');
exports.create = CartInput => {
    
    return CartRepo.create(CartInput);
}


exports.findAll = () => {
    return CartRepo.findAll();
}



exports.findCartByIdUser = (id_user) => {
    return CartRepo.findCartByIdUser (id_user);
}

exports.findByID = (id) => {
    return CartRepo.findByID(id);
}

exports.deleteByID = (id) => {
    return CartRepo.deleteByID(id);
}

exports.updateByID_User = (id, updateContent) => {
   
    return CartRepo.updateByID(id, updateContent);
}

