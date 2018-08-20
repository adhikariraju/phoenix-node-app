var express = require('express');
var router = express.Router();
var userCtrl=require("../controller/User")
var decrypt=require("../utils/decrypt")
function getUserInfo(){
    return (req,res,next)=>{
        userCtrl.getSession(req.body.sid,(err,result)=>{
         let encryptedData=req.body.encryptedData||null;
         let iv=req.body.iv||null   
         if(err){
          return res.send({error:err})         
         }
         res.locals.userInfo=decrypt(result.session_key,encryptedData,iv);
         next();  
        })        
    }
}

function userSignup(){
    return (req,res,next)=>{
        userCtrl.setUserInfo(req.body.sid,res.locals.userInfo,(err,result)=>{
            if(err){
              res.status(500).send({error:"Error while registering user"});  
                 throw err;              
            }
            console.log("signup",result)
            next();
        })         
    }
}

router.post("/",getUserInfo(),userSignup(),(req,res)=>{
    res.status(200).send({
        message:"user successfully registered"
    })
})

module.exports=router;