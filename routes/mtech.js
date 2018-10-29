var express = require('express');
var router = express.Router();
var mtechCtrl=require("../controller/Mtech")
var verify=require("../utils/verify");

router.post("/login",(req,res)=>{
  mtechCtrl.login(req.body,(err,result)=>{
      if(err){
          return res.status(500).send({error:err, message:"Error while logging in"})
      }
      let token=verify.getToken({type:"mtech",username:result.username,_mtechId:result._id});
      result={token,...result.toObject()};
      res.status(200).send({result:result,message:"Login in Successful"});
  })
});

router.post("/register",(req,res)=>{
  mtechCtrl.register(req.body,(err,result)=>{
        if(err){
           if(err.message.indexOf('duplicate key error') !== -1){
               return res.status(500).send({error:err,message:"Username already used"})
           } 
           return res.status(500).send({error:err});
        }         
        res.status(200).send({
            message:"Mtech registered successfully"            
        })
   })
});

router.post("/qrlog",verify.verifyUser,(req,res)=>{
   console.log("mtech decoded",req.decoded)
   var data={mtech:req.decoded._mtechId,...req.body};
   mtechCtrl.createLog(data,(err,result)=>{
     if(err){
        return res.status(500).send({
             message:"Error while creating qrscan log",
             error:err
         })
     }
     res.status(200).send({
         message:"QRLog created",
         result:result
     })
   });
});

module.exports=router;