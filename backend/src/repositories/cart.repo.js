// Import Orders Model
const Cart = require('../models').cart;

exports.create = CartInput => {
    // Creat new orders document
    let newCart = new Cart({...CartInput});

    // Save new orders to database
    return newCart.save();
}

exports.findAll = () => {
    return Cart.find({});
}

exports.findCartByIdUser = (id_user) => {
    return Cart.findOne({id_User:id_user});
}

exports.findByID = (id_User) => {
    return Cart.findOne({id_User:id_User});
}

exports.deleteByID = (id_User) => {
    return Cart.findOneAndDelete({id_User:id_User});
}

exports.updateByID = (id_User, updateContent) => {
    console.log(id_User);
    return Cart.updateOne({id_User:id_User}, {products:updateContent.products});
}
