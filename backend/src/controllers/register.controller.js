const User = require('../models').user;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { nanoid } = require('nanoid');
const saltRounds = Number(process.env.APP_SALT_ROUNDS) || 10;

exports.register = async (req, res) => {
    const input = req.body;
    
    if(!input) 
        return res.sendStatus(400);

    const checkUsername = await User.findOne({username: input.username});
    const checkEmail = await User.findOne({email: input.email});
    const checkPhoneNumber = await User.findOne({phone: input.phone});
    
    if(checkUsername)
        return res.status(400).json({
            message: "Existed username"
        })

    if(checkEmail)
        return res.status(400).json({
            message: "Existed email"
        })

    if(checkPhoneNumber)
        return res.status(400).json({
            message: "Existed phone number"
        })

    input.password = await bcrypt.hash(input.password, saltRounds);

    const newUser = new User({
        ...input,
        isAdmin: false
    });
    newUser.id_User = newUser._id;
    newUser.confirmedToken = nanoid();


    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '2pqfashion@gmail.com',
        pass: '#123456@'
    }
    });

    const mailOptions = {
    from: '2pqfashion@gmail.com',
    to: newUser.email,
    subject: '[2PQFashion Shop] Xác nhận đăng ký tài khoản tại shop',
    html: `
        <h1>Xác nhận đăng ký tài khoản</h1>
        <p> Vui lòng xác nhận đăng ký tài khoản tại 2PQFashion Shop, bằng cách nhấn <a href="http://localhost:8080/confirm/${newUser.confirmedToken}">vào đây</a></p>
    `
    };

    transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        await newUser.save();
        return res.sendStatus(200);
    });
}