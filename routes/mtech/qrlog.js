var express = require('express');
var router = express.Router();
var qrlogCtrl=require("@controller/mtech/QRLog")
var verify=require("@utils/verify");

router.post("/",verify.verifyUser,(req,res)=>{
    console.log("mtech decoded",req.decoded);
    var data={mtech:req.decoded.mtechId,...req.body};
    qrlogCtrl.createLog(data,(err,result)=>{
      if(err){
         return res.status(500).send({
              message:"Error while creating qrscan log",
              error:err
          })
      }
      verify.getToken({type:"mtechRefUser",userId:result._id,mtechId:req.decoded._id})
      res.status(200).send({
          message:"QRLog created",
          result:result
      })
    });
 });

 module.exports=router;