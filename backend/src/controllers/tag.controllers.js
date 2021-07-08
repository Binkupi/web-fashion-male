const tagServices = require('../services/tags.services');

exports.create = async (req, res) => {
    let tagInput = {...req.body};
    // If tagInput is empty, return 400 Error
    if (!tagInput) {
        return res.status(400).json({
            message: 'Can\' create an empty tag'
        });
    }
    
    // If tagInput is not empty, start creating new tag
    try {
        // Create new tag
        let newTag = await tagServices.create(tagInput);
        return res.status(200).json(newTag);

    } catch(err) {
        // If errors occur, return 500 Error
        return res.status(500).json({
            message: err.message || "Some error occurred while creating the tag."
        });
    }  
}

exports.getAll = async (req, res) => {
    try{
        // Find all tag
        let tags = await tagServices.findAll();
        return res.status(200).json(tags);
    } catch(err) {
        res.status(500).json({
            message:
              err.message || "Some error occurred while retrieving tags."
        });
    }
};

exports.getOne = async (req, res) => {
    let id = req.params.id;

    try {
        // Find tag by ID
        let tag = await tagServices.findByID(id);
        
        // If exist tag, return it
        if(tag) {
            return res.status(200).json(tag);
        }

        // If tag is not exist, return 404 Error
        return res.status(404).json({
            message: "Not found this tag"
        })
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while retrieving tag with ID=${id}.`
        });
    }
}

exports.deleteOne = async (req, res) => {
    let id = req.params.id;

    try {
        let tag = await tagServices.deleteByID(id);
        if(tag) {
            res.status(200).json({
                message: "Tag was deleted successfully!"
            });
        } else {
            res.status(404).send({
                message: `Cannot delete tag with ID=${id}. Maybe tag was not found!`
              });
        }
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while deleting tag with ID=${id}.`
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
        //Update tag by ID
        let tag = await tagServices.updateByID(id, updateContent);
        
        // If exist tag
        if(tag) {
            return res.status(200).json({ message: "Tag was updated successfully." });
        }

        // If tag is not exist, return 404 Error
        return res.status(404).json({
            message: `Cannot update tag with ID=${id}. Maybe tag was not found!`
        })
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while retrieving tag with ID=${id}.`
        });
    }
}

exports.count = async (req, res) => {
    // const query = {
    //     ...req.query
    // };
    try {
        let tags = await tagServices.findAll();
        let count = tags.length;
        return res.status(200).json(count);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message:
              err.message || "Some error occurred while counting tags."
        });
    }
}