var express = require('express');
var router = express.Router();
var userCtrl = require("../controller/User")
var decrypt = require("../utils/decrypt")
var verify=require("../utils/verify")
function getUserInfo() {
    return (req, res, next) => {        
            console.log("decoded",req.decoded);
            let encryptedData = req.body.encryptedData || null;
            let iv = req.body.iv || null
            let session_key=req.decoded.session_key;
            if (err) {
                return res.send({ error: err })
            }
            res.locals.userInfo = decrypt(session_key, encryptedData, iv);
            next();
       
    }
}

function userSignup() {
    return (req, res, next) => {
        var userInfo={
            openid:res.decoded.openid,
            session_key:res.decoded.session_key,
            ...res.locals.userInfo
        };
        userCtrl.signupUser(userInfo, (err, result) => {
            if (err) {
                res.status(500).send({ error: "Error while registering user" });
                throw err;
            }
            console.log("signup", result);
            var token=verify.getToken(result._id);
            result._id="";
            res.locals.result = result;
            next();
        })
    }
}

router.post("/",verify.verifyNewUser,getUserInfo(), userSignup(), (req, res) => {
    res.status(200).send({
        success: true,
        result: res.locals.result.verified,
        message: "user successfully registered"
    })
})

module.exports = router;