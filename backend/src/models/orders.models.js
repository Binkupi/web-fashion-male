const Joi = require("joi");

exports.Orders = function(mongoose) {
    // Create Orders Schema
    const Schema = mongoose.Schema;
    const ordersSchema = new Schema({
        customerName: String,
        customerPhone: String,
        address: String,
        items: Array,
        price: Number,
        buyDate: Date,
        paymentMethod: String,
        paid: Boolean
    })

    // Create Orders Model and return it
    const Orders = mongoose.model('Orders', ordersSchema);
    return Orders;
}


exports.validateOrders = function(orders) {
    const schema = new Joi.object({
        customerName: Joi.string().min(1),
        customerPhone: Joi.string().min(1),
        address: Joi.string.min(1),
        items: Joi.array().min(1),
        price: Joi.number().min(0),
        buyDate: Joi.date(),
        paymentMethod: Joi.string().min(1),
        paid: Joi.boolean()
    });

    let { error } = schema.validate(orders)
    if (error) {
        throw new Error(`Orders validation error: ${error.message}`);
    }
}