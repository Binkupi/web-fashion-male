const { Bill } = require('../models/bill.models');
const Product = require('../models').product;
const BillRepo = require('../repositories/bill.repo');
const nodemailer = require('nodemailer');
const {generateIdBill}=require('../models/Bill.models')
exports.create = async BillInput => {
    var today = new Date();
    var time = today.getDate() + ":" + today.getMinutes() + ":" + today.getSeconds();
    BillInput.bookingDate=new Date(today.getFullYear(),today.getMonth(),today.getDate());
    BillInput.deliveryDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+5);
    BillInput.id_Bill=generateIdBill();
    BillInput.status=0;
    BillInput.products.forEach(async product => {
        let tmp = await Product.findOne({ sku: product.sku });
        tmp.options.forEach(option => {
            if(option.size === product.size)
                option.remaining -= product.quantity;
        });
        
        await tmp.save();
    })

    await BillRepo.create(BillInput);
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '2pqfashion@gmail.com',
            pass: '#123456@'
        }
    });
    
    const mailOptions = {
        from: '2pqfashion@gmail.com',
        to: BillInput.email,
        subject: `[2PQFashion Shop] Đơn hàng #${BillInput.id_Bill} đã được đặt thành công`,
        html: `
            <h1>Đơn hàng #${BillInput.id_Bill} đã bị hủy</h1>
            <p>Chúng tôi rất vinh dự khi thông báo rằng đơn hàng #${BillInput.id_Bill} đã được đặt thành công. Chúng tôi hy vọng sẽ tiếp tục được phục vụ quý khách trong tương lai gần.</p>
            <p>Quý khách có thể kiểm tra thông tin và tình trạng đơn hàng <a href="http://localhost:3000/user/order-traking/${BillInput.id_Bill}">tại đây</a></p>
        `
    };
    
    transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


exports.findAll = () => {
    return BillRepo.findAll();
}

exports.search = async (input) => {
    let orders = await BillRepo.findAll();
    
    if(input.code) {
        orders = orders.filter(order => {
            return order.id_Bill.toLowerCase().indexOf(input.code.toLowerCase()) > -1;
        })
    }

    if(input.status >= 0 && input.status <= 4) {
        orders = orders.filter(order => (order.status == input.status));
    }
    
    if(input.sort === "newest") {
        // Sắp xếp giảm dần
        orders = orders.sort(function(bookDate1, bookDate2) {
            return (bookDate1 > bookDate2)? 1 : -1;
        });
    }

    if(input.sort === "oldest") {
        // Sắp xếp tăng dần
        orders = orders.sort(function(bookDate1, bookDate2) {
            return (bookDate1 < bookDate2) ? 1 : -1;
        });
    }

    return orders;
}

exports.findBillByIdUser = (id_user) => {
    return BillRepo.findBillByIdUser (id_user);
}

exports.count = async query => {
    let bills = await BillRepo.findAll();
    
    if(query.status) {
        bills = bills.filter(bill => {
            return (bill.status === Number(query.status))
        });
    }

    return bills.length;
}

exports.findByID = (id) => {
    return BillRepo.findByID(id);
}

exports.deleteByID = (id) => {
    return BillRepo.deleteByID(id);
}

exports.updateByID = (id, updateContent) => {
    return BillRepo.updateByID(id, updateContent);
}

//hủy bỏ bill
exports.cancelBill = async (id_Bill) => {
    const customerEmail = await  BillRepo.cancelBill(id_Bill);

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '2pqfashion@gmail.com',
        pass: '#123456@'
    }
    });

    const mailOptions = {
    from: '2pqfashion@gmail.com',
    to: customerEmail,
    subject: `[2PQFashion Shop] Đơn hàng #${id_Bill} đã bị hủy`,
    html: `
        <h1>Đơn hàng #${id_Bill} đã bị hủy</h1>
        <p>Chúng tôi rất tiếc khi thông báo rằng đơn hàng #${id_Bill} đã bị hủy. Chúng tôi hy vọng sẽ được phục vụ quý khách trong tương lai gần.</p>
        <p>Quý khách có thể tham khảo các sản phẩm khác của chúng tôi <a href="http://localhost:3000/shop">tại đây</a></p>
    `
    };

    transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
