const BillService = require('../services/bill.services');
const {validateBill} = require('../models/Bill.models');
exports.create = async (req, res) => {
    let ordersInput = req.body;
    
    //If ordersInput is null, return 400 Error
    if(!ordersInput) {
        return res.status(400).json({
            message: "Can'\t create an empty orders"
        })
    }
        //Validate orders input
        validateBill(ordersInput);

        //Create new orders
        BillService.create(ordersInput)
        .then(()=>{
            return res.status(200).json({ message:'create successfully'});
        })
        . catch ((err)=> {
        console.log(err);
        return res.status(500).json({
            message: err.message || "Some errors occur while creating new orders"
        })
    })
}
exports.getAll = (req, res) => {
        // Get all order from database
        BillService.findAll()
        .then((bill)=>{
            return res.status(200).json(bill);
        })
        .catch((err)=>{
        res.status(500).json({
            message:
              err.message || "Some error occurred while retrieving bill."
        });
    })
}

exports.count = async (req, res) => {
    const query = {
        ...req.query
    };
    try {
        let count = await BillService.count(query);
        return res.status(200).json(count);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message:
              err.message || "Some error occurred while retrieving bill."
        });
    }
}

exports.search = async (req, res) => {
    let input = {
        code: req.query.code,
        status: Number(req.query.status),
        sort: req.query.sort
    }
    try {
        let orders = await BillService.search(input);
        return res.json(orders);
    } catch(err) {
        res.status(500).json({
            message:
              err.message || `Some error occurred while retrieving orders.`
        });
    }
}

exports.getBillByIdUser = async (req, res) => {
    let id_user = req.params.id_user;
    // Get all order from database
    BillService.findBillByIdUser( id_user)
    .then((bill)=>{
        return res.status(200).json(bill);
    })                                
    .catch((err)=>{
    res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving bill."
    });
})
}
exports.getOne = async (req, res) => {
    let id = req.params.id;

    try {
        //Find orders by ID
        let orders = await BillService.findByID(id);
        
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
        let orders = await BillService.updateByID(id, updateContent);
        
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


//sự kiện khi người dùng hủy bill 
exports.cancelBill = async (req, res) => {
    let id_Bill = req.body.id_Bill;
    
    // Get all order from database
    BillService.cancelBill(  id_Bill )
    .then(()=>{
        return res.status(200).json({success:"cancel bill successfully"});
    })                                
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            message:
            err.message || "Some error occurred while retrieving bill."
        });
})
}
