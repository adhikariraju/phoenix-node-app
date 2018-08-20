var express=require('express')
var router=express.Router();
var questCtrl=require("../controller/Question");

router.get("/",(req,res)=>{
    console.log(req.body)
    questCtrl.getQuestionByType(req.query.type,(err,result)=>{
        if(err){
          console.log(err);
          res.status(500).send(err);
        }
        else if(result) {
           console.log(result) 
           res.status(200).send(result); 
        }
    })
})

router.post("/",(req,res)=>{
   questCtrl.postQuestion(req.body,(err,result)=>{
       if(err){
           res.status(500).send(err)
       }
       else{
           res.status(200).send(result);
       }
   })
})
module.exports=router;