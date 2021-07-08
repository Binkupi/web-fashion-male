const categoryRepo = require('../repositories/category.repo');
const removeVietnameseTones = require('../vendors/removeVietnameseTones')
const convertToSlug = (slug) => {
    return removeVietnameseTones(slug + '').replace(/ /g, '-').toLowerCase();
}

exports.create = categoryInput => {
    // Add other infomation for category input
    let slug = categoryInput.name + '';
    if(!categoryInput.slug)
        categoryInput.slug = convertToSlug(slug);

    // Calling creating repositoty
    return categoryRepo.create(categoryInput);
}

exports.findAll = () => {
    return categoryRepo.findAll();
}

exports.findByID = (id) => {
    return categoryRepo.findByID(id);
}

exports.deleteByID = (id) => {
    return categoryRepo.deleteByID(id);
}

exports.updateByID = (id, updateContent) => {
    // If change product name, change product slug
    if(updateContent.name) {
        let slug = updateContent.name + '';
        updateContent.slug = convertToSlug(slug);
    }

    return categoryRepo.updateByID(id, updateContent);
}

