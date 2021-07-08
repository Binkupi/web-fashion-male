const productRepo = require('../repositories/product.repo');
const {generateSKU} = require('../models/product.models');
const removeVietnameseTones = require('../vendors/removeVietnameseTones')
const convertToSlug = (slug) => {
    return removeVietnameseTones(slug + '').replace(/ /g, '-').toLowerCase();
}

exports.create = (req, productInput) => {
    // Add other infomation for product input
    let slug = productInput.name + '';
    if(!productInput.slug)
        productInput.slug = convertToSlug(slug);
    let rating = productInput.rating;
    productInput.rating = {
        grade: rating,
        votes: 0
    };
    productInput.sku = generateSKU(productInput);
    productInput.images = req.files.map(file => {
        return `/images/uploads/${file.filename}`
    })

    // Calling creating repositoty
    return productRepo.create(productInput);
}

exports.findAll = (limit, skip) => {
    return productRepo.findAll(limit, skip);
}

exports.search = async (query) => {
    let products = await productRepo.findAll();
    
    if(query.sku) {
        products = products.filter(product => {
            return product.sku.toLowerCase().indexOf(query.sku.toLowerCase()) > -1;
        })
    }
    
    if(query.name) {
        products = products.filter(product => {
            return product.name.toLowerCase().indexOf(query.name.toLowerCase()) > -1;
        })
    }

    return products;
}

exports.findBySKU = (sku) => {
    return productRepo.findBySKU(sku);
}

exports.deleteBySKU = (sku) => {
    return productRepo.deleteBySKU(sku);
}

exports.updateBySKU = (sku, updateContent) => {
    let rating = updateContent.rating;
    updateContent.rating = {
        grade: rating,
        votes: 0
    };
    return productRepo.updateBySKU(sku, updateContent);
}

