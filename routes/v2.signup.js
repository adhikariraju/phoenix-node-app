var express = require('express');
var router = express.Router();
var userCtrl = require("../controller/User");
var decrypt = require("../utils/decrypt");
var verify=require("../utils/verify");
var schema = require("../express-validator/schema")
var validation= require("../express-validator/validation")
const { validationResult } = require('express-validator/check');

function getUserInfo() {
    return (req, res, next) => {        
        console.log("decoded",req.decoded);
        let encryptedData = req.body.encryptedData || null;
        let iv = req.body.iv || null
        let session_key=req.decoded.session_key;
        
        let userInfo = decrypt(session_key, encryptedData, iv);
         
        // let userInfo={nickname:"raju"};

        res.locals.userInfo={
                             session_key,
                             openid:req.decoded.openid,
                             ...userInfo
                            };            
        next();       
    }
};

//check if the user with the given openid already exist or not.
function checkExistence(){
    return (req,res,next)=>{
        userCtrl.findByOpenId(
            req.decoded.openid,
            (err,user)=> {
                if (err) res.status(500).send("Error while logging in");
                else if (user === null || user === "") {
                   next();
                }
                else if (user !== null || user !== "") {     
                  let err=new Error("User is already registered")     
                  err.status=403;
                  next(err);
                }
        })      
    };
}    



function userSignup() {
    return (req, res, next) => {
        var userInfo={
            openid:req.decoded.openid,
            session_key:req.decoded.session_key,
            ...res.locals.userInfo
        };
        
        userCtrl.signupUser(userInfo,(err,result) => {
            if (err) {
               return res.status(500).send({ error: "Error while registering user" });
                
            }
            console.log("signup", result);
            var token=verify.getToken({userId:result._id});
            var dbresult= {...result.toObject()};

            delete dbresult._id;
            delete dbresult.openid;
            delete dbresult.session_key;
            
            console.log("result",dbresult)
            res.locals.result = {token,...dbresult};
            next();
        })
    }
}

var middlewares = [schema.signup, validation, verify.verifyNewUser, checkExistence(),getUserInfo(), userSignup()];


router.post("/",middlewares,
        (req, res) => {
            console.log("res.local at signup",res.locals.result)
            res.status(200).send({
                success: true,
                message: "user successfully registered",
                ...res.locals.result
        })
});

module.exports = router;