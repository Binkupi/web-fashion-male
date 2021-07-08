const ordersRepo = require('../repositories/category.repo');

exports.create = ordersInput => {
    // Calling creating repositoty
    return ordersRepo.create(ordersInput);
}

exports.findAll = () => {
    return ordersRepo.findAll();
}

exports.findByID = (id) => {
    return ordersRepo.findByID(id);
}

exports.deleteByID = (id) => {
    return ordersRepo.deleteByID(id);
}

exports.updateByID = (id, updateContent) => {
    return ordersRepo.updateByID(id, updateContent);
}

