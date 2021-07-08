// Import Orders Model
const Orders = require('../models').orders;

exports.create = ordersInput => {
    // Creat new orders document
    let newOrder = new Orders({
        ...ordersInput
    })

    // Save new orders to database
    return newOrder.save();
}

exports.findAll = () => {
    return Orders.find({});
}

exports.findByID = (id) => {
    return Orders.findById(id);
}

exports.deleteByID = (id) => {
    return Orders.findByIdAndDelete(id);
}

exports.updateByID = (id, updateContent) => {
    return Orders.findByIdAndUpdate(id, {...updateContent});
}