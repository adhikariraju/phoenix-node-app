var express=require('express')
var router=express.Router();
var questCtrl=require("../controller/Question");
var verify=require("../utils/verify")
var schema = require("../express-validator/schema")
var validation = require("../express-validator/validation")  //express-validator common middleware

router.use(verify.verifyUser);

router.get("/:type",(req,res)=>{
    console.log(req.body)
    questCtrl.getQuestionByType(req.params.type,(err,result)=>{
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

router.get("/",(req,res)=>{
    console.log(req.query);
    questCtrl.getAllQuestion(req.query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else if(result) {
             console.log(result) 
             res.status(200).send({questions:result}); 
        } 
    })
});

router.put("/addViewer/questionId/:questionId",(req,res)=>{
    let postData={
        userId:req.decoded.userId,
        ...req.body
    };

    delete postData.token;

    questCtrl.markAsViewed(postData,(err,result)=>{
      if(err){
          res.status(500).send({success:false, error:err})
      }
      else if(result){
          res.status(200).send({success:true})
      }
    })
})


router.post("/",(req,res)=>{
   questCtrl.postQuestion(req.body,schema.postQuestion,validation,(err,result)=>{
       if(err){
           res.status(500).send(err)
       }
       else{
           res.status(200).send(result);
       }
   })
})

module.exports=router;