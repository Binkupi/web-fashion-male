const Joi = require('joi');
const removeVietnameseTones = require('../vendors/removeVietnameseTones')

exports.Product = function(mongoose) {
    // Creating Product Schema
    const Schema = mongoose.Schema;
    const productSchema = new Schema({
        name: String,
        slug: String,
        price: Number,
        rating: {
            grade: Number,
            votes: Number
        },
        // brand: String,
        shortDesc: String,
        options: [
            {
                _id: false,
                size: String,
                quantity: Number,
                remaining: Number
            }
        ],
        sku: {
            type: String,
            unique: true,
            index: true
        },
        category: String,
        tags: Array,
        fullDesc: String,
        additionalInfo: String,
        images: Array,
        status: Number
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

    // Creating Product Model
    const Product = mongoose.model('Product', productSchema);

    return Product;
}

exports.validateProduct = function(product) {
    const Joi = require('joi').extend(require("joi-file-extensions"));
    
    let schema = Joi.object({
        name: Joi.string().min(1).max(100).required(),
        slug: Joi.string().max(100).required(),
        price: Joi.number().integer().min(0),
        category: Joi.string().min(1).max(100).required(),
        quantity: Joi.number().integer().min(0),
        shortDesc: Joi.string().max(300),
        options: Joi.array(),
        sku: Joi.string(),
        tags: Joi.array(),
        fullDesc: Joi.string(),
        additionalInfo: Joi.string(),
        images: Joi.file().contents(),
        status: Joi.number().min(0).max(3),
        rating: Joi.number().min(1).max(5)
    });

    let { error } = schema.validate(product)
    if (error) {
        throw new Error(`Product validation error: ${error.message}`);
    }
}

exports.generateSKU = function(product) {
    let sku = '';
    let categoryWords = product.category.split(' ');
    let categoryID = '';
    categoryWords.forEach((word, index) => {
        if(index < 2)
        categoryID += categoryWords[index][0];
    });
    categoryID = removeVietnameseTones(categoryID).toUpperCase();
    let currentDate = new Date();
    let day = currentDate.getDate().toString().padStart(2,0);
    let month = (currentDate.getMonth()+ 1).toString().padStart(2,0);
    let year = currentDate.getFullYear().toString().slice(2);
    let second = currentDate.getSeconds().toString().padStart(2,0);

    sku += categoryID + day + month + year + second + Math.floor(Math.random() * 100);
    return sku;
}