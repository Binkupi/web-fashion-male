const ordersService = require('../services/orders.services');
const {validateOrders} = require('../models/orders.models');

exports.create = async (req, res) => {
    let ordersInput = req.body;

    // If ordersInput is null, return 400 Error
    if(!ordersInput) {
        return res.status(400).json({
            message: "Can'\t create an empty orders"
        })
    }

    try {
        // Validate orders input
        validateOrders(ordersInput);

        // Create new orders
        let orders = await ordersService.create(ordersInput);
        
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some errors occur while creating new orders"
        })
    }


}
exports.getAll = (req, res) => {
    try {
        // Get all order from database
        let orders = ordersService.findAll();

        return res.status(200).json(orders);
    } catch(err) {
        res.status(500).json({
            message:
              err.message || "Some error occurred while retrieving orders."
        });
    }
}


exports.getOne = async (req, res) => {
    let id = req.params.id;

    try {
        //Find orders by ID
        let orders = await ordersServices.findByID(id);
        
        // If exist orders, return it
        if(orders) {
            return res.status(200).json(orders);
        }

        // If orders is not exist, return 404 Error
        return res.status(404).json({
            message: "Not found this orders"
        })
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while retrieving orders with ID=${id}.`
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
        // Update orders by ID
        let orders = await ordersServices.updateByID(id, updateContent);
        
        // If exist orders, update and return it
        if(orders) {
            return res.status(200).json({ message: "Orders was updated successfully." });
        }

        // If orders is not exist, return 404 Error
        return res.status(404).json({
            message: `Cannot update orders with ID=${id}. Maybe orders was not found!`
        })
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while retrieving orders with ID=${id}.`
        });
    }
}
exports.deleteOne = async (req, res) => {
    let id = req.params.id;

    try {
        let orders = await ordersServices.deleteByID(id);
        if(orders) {
            res.status(200).json({
                message: "Orders was deleted successfully!"
            });
        } else {
            res.status(404).send({
                message: `Cannot delete orders with id=${id}. Maybe orders was not found!`
              });
        }
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while deleting orders with id=${id}.`
        });
    }
}
