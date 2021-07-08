// Import Orders Model
const User = require('../models').user;

exports.create = UserInput => {
    // Creat new orders document
    let newOrder = new User({...UserInput});

    // Save new orders to database
    return newOrder.save();
}

exports.findAll = () => {
    return User.find({});
}

exports.findUserByIdUser = (id_user) => {
    return User.find({id_User:id_user});
}

exports.findByID = (id_User) => {
    return User.findOne({id_User:id_User});
}

exports.deleteByID = (id_User) => {
    return User.findOneAndDelete({id_User:id_User});
}

exports.updateByID = (id_User, updateContent) => {
    return User.updateOne({id_User:id_User}, {password:updateContent});
}

