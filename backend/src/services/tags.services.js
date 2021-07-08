const tagRepo = require('../repositories/tag.repo');

exports.create = tagInput => {
    return tagRepo.create(tagInput);
}

exports.findAll = () => {
    return tagRepo.findAll();
}

exports.findByID = (id) => {
    return tagRepo.findByID(id);
}

exports.deleteByID = (id) => {
    return tagRepo.deleteByID(id);
}

exports.updateByID = (id, updateContent) => {
    return tagRepo.updateByID(id, updateContent);
}

