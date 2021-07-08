// Import Orders Model
const Bill = require('../models').bill;
const Product = require('../models').product;

exports.create = BillInput => {
    // Creat new orders document
    let newOrder = new Bill({...BillInput});

    // Save new orders to database
    return newOrder.save();
}

exports.findAll = () => {
    return Bill.find({});
}

exports.findBillByIdUser = (id_user) => {
    return Bill.find({id_User:id_user});
}

exports.findByID = (id_Bill) => {
    return Bill.findOne({id_Bill:id_Bill});
}

exports.deleteByID = (id_Bill) => {
    return Bill.findOneAndDelete({id_Bill:id_Bill});
}

exports.updateByID = (id_Bill, updateContent) => {
    return Bill.updateOne({id_Bill:id_Bill}, {...updateContent});
}

exports.cancelBill = async (id_Bill) => {
    const bill = await Bill.findOne({id_Bill: id_Bill});

    bill.products.forEach(async product => {
        let tmp = await Product.findOne({ sku: product.sku });
        tmp.options.forEach(option => {
            if(option.size === product.size)
                option.remaining += product.quantity;
        });
        
        await tmp.save();
    });

    bill.status = 4;
    await bill.save();

    return bill.email;
}