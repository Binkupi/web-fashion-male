const { User } = require('../models/user.models');
const UserRepo = require('../repositories/user.repo');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.APP_SALT_ROUNDS) || 10;

exports.create = BillInput => {
    
    var today = new Date();
    var time = today.getDate() + ":" + today.getMinutes() + ":" + today.getSeconds();
    BillInput.bookingDate=new Date(today.getFullYear(),today.getMonth(),today.getDate());
    BillInput.deliveryDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+5);
    BillInput.id_Bill=generateIdBill();
    BillInput.status=0;
    return BillRepo.create(BillInput);
}


exports.findAll = () => {
    return UserRepo.findAll();
}


exports.findByID = (id) => {
    return UserRepo.findByID(id);
}

exports.deleteByID = (id) => {
    return UserRepo.deleteByID(id);
}

exports.updateByID = async (id, updateContent) => {
    return UserRepo.updateByID(id, updateContent);
}

