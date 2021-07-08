const CartService = require('../services/cart.services');
exports.create = async (req, res) => {
    let cart = req.body;
    //If cart is null, return 400 Error
    
    if(!cart) {
        return res.status(400).json({
            message: "Can'\t create an empty cart"
        })
    }  
    CartService.findByID(cart.id_User)
    .then(item=>{
        if(!item){
            CartService.create(cart);
        }else{
            CartService.updateByID_User(cart.id_User,cart)
            .then(()=>{
                return res.status(201).json({ message:'update successfully'});
            }).catch(err=>{
                res.status(500).json({
                    message:
                      err.message || "Some error occurred while retrieving cart."
                });
            })
        }
    })
    //     //Create new orders
    //     CartService.create(cart)
    //     .then(()=>{
    //         return res.status(200).json({ message:'create successfully'});
    //     })
    //     . catch ((err)=> {
    //     return res.status(500).json({
    //         message: err.message || "Some errors occur while creating new orders"
    //     })
    // })
}
exports.getAll = (req, res) => {
        // Get all order from database
        CartService.findAll()
        .then((cart)=>{
            return res.status(200).json(cart);
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

exports.getCartByIdUser = async (req, res) => {
    let id_user = req.params.id_user;
    // Get all order from database
    CartService.findCartByIdUser( id_user)
    .then((cart)=>{
        if(cart===null){
            cart={
                id_User:id_user,
                products:[],
            }
            
        }
        return res.status(200).json(cart);
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

