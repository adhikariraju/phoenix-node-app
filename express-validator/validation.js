const { validationResult } = require('express-validator/check');

module.exports=(req, res, next)=>{
    var errors = validationResult(req);
    console.log('errors', errors.array())
    if (!errors.isEmpty()) {
        var err = new Error('Invalid Request Payload')
        err.status = 500;
        err.errors = errors.array();
        next(err);
    }
    next();
};