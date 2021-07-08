// Import Product Model
const Product = require('../models').product;

exports.create = productInput => {
    // Creat new product document
    let newProduct = new Product({
        ...productInput
    })

    // Save new product to database
    return newProduct.save();
}

exports.findAll = (limit, skip) => {
    if(limit && skip)
        return Product.find({}).limit(limit).skip(skip);

    if(limit)
        return Product.find({}).limit(limit);

    if(skip)
        return Product.find({}).skip(skip);
    
    return Product.find({});
}

exports.findBySKU = (sku) => {
    return Product.findOne({sku: sku});
}

exports.deleteBySKU = (sku) => {
    return Product.findOneAndDelete({sku: sku});
}

exports.updateBySKU = (sku, updateContent) => {
    return Product.findOneAndUpdate({sku: sku}, {...updateContent})
}