var config=require('../config/config')
var sha1=require('sha1');
var jwt=require('jsonwebtoken')

exports.verify_ux_signature=(signature,timestamp,nonce)=>{
   if(signature===null||timestamp===null||nonce===null){
      return false;
   }
   let TOKEN=config.WX_TOKEN;
    //Sort the token, timestamp, and nonce parameters alphabetically.
    let wxarray=[TOKEN,timestamp,nonce];
    wxarray.sort();

    
    //Combine the parameters into a string and encrypt it using SHA - 1.
    let wxStr=wxarray[0]+wxarray[1]+wxarray[2];
    let encwxStr=sha1(wxStr);

       
    /* Compare the encrypted string with the signature.If they are identical, 
       the request has been verified as being sent by the WeChat Official Account System.
    */
   
     console.log("boolean",encwxStr===signature);
     return encwxStr===signature;
};

exports.getToken=function(userId){
    return jwt.sign(userId, config.jwt_secret, {
        expiresIn: 3600
    });
}

exports.verifyUser=function(req,res,next){
   var token=req.body.token||req.query.token||req.headers['x-access-token'];
   if(token){
       jwt.verify(token,config.jwt_secret,function(err,decoded){
           if(err){
               var err=new Error("You are not authenticated");
               err.status=401;
               next(err);
           }
           else{
               req.decoded=decoded;
               next();
           }
       })
   }else{
       var err=new Error("No token provided");
       err.status=403;
       return next(err);
   }
}

exports.getUnverifiedUserToken = function (data) {
    return jwt.sign(data, config.unv_jwt_secret, {
        expiresIn: 3600
    });
}

// it is used to verify the signup process for users who hasnot verified themselves.
exports.verifyNewUser = function (req, res, next) {    
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token,config.unv_jwt_secret, function (err, decoded) {
                if (err) {
                    var err = new Error("You are not authenticated");
                    err.status = 401;
                    next(err);
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            var err = new Error("No token provided");
            err.status = 403;
            return next(err);
        }   
}