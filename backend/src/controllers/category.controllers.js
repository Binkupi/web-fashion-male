const categoryServices = require('../services/category.services');
const {validateCategory} = require('../models/category.models');

exports.create = async (req, res) => {
    let categoryInput = {...req.body};
    // If categoryInput is empty, return 400 Error
    if (!categoryInput) {
        return res.status(400).json({
            message: 'Can\' create an empty category'
        });
    }
    
    // If categoryInput is not empty, start creating new category
    try {
        // Validate category input
        validateCategory(categoryInput);

        // Create new category
        let newCategory = await categoryServices.create(categoryInput);
        return res.status(200).json(newCategory);

    } catch(err) {
        // If errors occur, return 500 Error
        return res.status(500).json({
            message: err.message || "Some error occurred while creating the category."
        });
    }  
}

exports.getAll = async (req, res) => {
    try{
        // Find all category
        let categories = await categoryServices.findAll();
        return res.status(200).json(categories);
    } catch(err) {
        res.status(500).json({
            message:
              err.message || "Some error occurred while retrieving categories."
        });
    }
};

exports.getOne = async (req, res) => {
    let id = req.params.id;

    try {
        //Find category by ID
        let category = await categoryServices.findByID(id);
        
        // If exist category, return it
        if(category) {
            return res.status(200).json(category);
        }

        // If category is not exist, return 404 Error
        return res.status(404).json({
            message: "Not found this category"
        })
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while retrieving category with ID=${id}.`
        });
    }
}

exports.deleteOne = async (req, res) => {
    let id = req.params.id;

    try {
        let category = await categoryServices.deleteByID(id);
        if(category) {
            res.status(200).json({
                message: "Category was deleted successfully!"
            });
        } else {
            res.status(404).send({
                message: `Cannot delete category with ID=${id}. Maybe category was not found!`
              });
        }
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while deleting category with ID=${id}.`
        });
    }
}

exports.updateOne = async (req, res) => {
    let id = req.params.id;
    let updateContent = req.body;

    // If updated content is null, return 400 Error
    if (!updateContent) {
        return res.status(400).json({
          message: "Data to update can not be empty!"
        });
    }

    try {
        //Update category by ID
        let category = await categoryServices.updateByID(id, updateContent);
        
        // If exist category, update and return it
        if(category) {
            return res.status(200).json({ message: "Category was updated successfully." });
        }

        // If category is not exist, return 404 Error
        return res.status(404).json({
            message: `Cannot update category with ID=${id}. Maybe category was not found!`
        })
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while retrieving category with ID=${id}.`
        });
    }
}


exports.count = async (req, res) => {
    // const query = {
    //     ...req.query
    // };
    try {
        let categories = await categoryServices.findAll();
        let count = categories.length;
        return res.status(200).json(count);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message:
              err.message || "Some error occurred while counting categories."
        });
    }
}