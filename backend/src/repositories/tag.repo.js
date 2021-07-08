// Import category Model
const Tag = require('../models').tag;

exports.create = tagInput => {
    // Creat new tag document
    let newTag = new Tag({
        ...tagInput
    })

    // Save new tag to database
    return newTag.save();
}

exports.findAll = () => {
    return Tag.find({});
}

exports.findByID = (id) => {
    return Tag.findById(id);
}

exports.deleteByID = (id) => {
    return Tag.findByIdAndDelete(id);
}

exports.updateByID = (id, updateContent) => {
    return Tag.findByIdAndUpdate(id, {...updateContent});
}