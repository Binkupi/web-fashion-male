const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    let token = '';
   
    if(authorizationHeader)
        token = authorizationHeader.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.APP_JWT_SECRET, (err, data) => {
        if(err) return res.sendStatus(403);

        if(data.isAdmin)
            return next();
        
        return res.sendStatus(403);
    })
}