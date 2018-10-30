var express = require('express');
var router = express.Router();
var userCtrl=require("@controller/User")

router.get("/",(req,res)=>{
   userCtrl.getAllUser((err,result)=>{
      if(err){
          res.status(500).send({message:"Error while getting users",error:err})
      }
      res.status(200).send({
          message:"Get userlist success",
          result
      })
   })   
})

module.exports=router;