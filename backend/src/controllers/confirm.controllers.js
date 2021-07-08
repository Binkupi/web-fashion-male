const User = require('../models').user;

exports.confirm = async (req, res) => {
    const token = req.params.token;
    await User.findOneAndUpdate({ confirmedToken: token }, { confirmedToken: '' });

    res.writeHead(301,
        {Location: 'http://localhost:3000/login'}
    );
    res.end();
}