var express=require('express')
var router=express.Router();
var questCtrl=require("../../admin/controller/Question");
var verify=require("../../utils/verify")
var schema = require("../../express-validator/schema")
var validation = require("../../express-validator/validation")  //express-validator common middleware

router.put("/parent/:parentId/intro/:introId",
            schema.question.putIntroQuestion,validation,
            (req,res)=>{
               let {introId,parentId}=req.params; 
               let question=req.body.question;
               questCtrl.updateIntroQuest(parentId,introId,question,(err,result)=>{
                 if(err){
                    return res.status(500).send({success:false,
                                error:err,
                                message:"Error while updating"
                            })
                 }
                 res.status(201).send({
                     success:true,
                     message:"update success",
                     result:result
                  })    
               })   
});

router.put("/parent/:parentId/core/:coreId",    
             schema.question.putCoreQuestion,validation,
             (req,res)=>{
                 let {parentId,coreId}=req.params;
                 let {question}=req.body
                 questCtrl.updateCoreQuest(parentId,coreId,question,(err,result)=>{
                    if(err){
                        return res.status(500).send({success:false,
                                    error:err,
                                    message:"Error while updating"
                                })
                     }
                     res.status(201).send({
                         success:true,
                         message:"update success",
                         result:result
                      })    
                   
                 })
             }
);


router.put("/addViewer/questionId/:questionId",(req,res)=>{
    var {userId}=req.decoded||req.body||req.query
    let postData={
        userId,
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
});

router.delete("/:id",(req,res)=>{
    questCtrl.deleteById(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send({
              success:false,
              error:err  
            })
        }
        else if(result){
            res.status(200).send({
                success:true,
                message:"delete success",
                result:result
            })
        }
    })
})

router.delete("/parent/:parentId/intro/:introId",(req,res)=>{
    let {parentId,introId}=req.params;
    
    questCtrl.deleteIntro(parentId,introId,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else if(result){
            res.status(200).send({
                success:true,
                message:"delete successful"
            })
        }
    })
})

router.delete("/parent/:parentId/core/:coreId",(req,res)=>{
    let {parentId,coreId}=req.params;
    questCtrl.deleteCore(parentId,coreId,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else if(result){
            res.status(200).send({
                success:true,
                message:"delete successful"
            })
        }
    }) 
})

router.post("/",schema.question.postQuestion,validation,(req,res)=>{
   questCtrl.postQuestion(req.body,(err,result)=>{
       if(err){
           res.status(500).send(err)
       }
       else{
           res.status(200).send(result);
       }
   })
});

router.post("/addintro/:parentId",(req,res)=>{
    
    questCtrl.addIntroQuestion(req.params.parentId,req.body,(error,result)=>{
        if(error){
            return res.status(500).send({
              message:"Error while adding the document"
            })
          }
          res.status(201).send({
            "success":true,
            "message":"post success",
            result:result
          })
    })
})

router.post("/addcore/:parentId",(req,res)=>{
    
    questCtrl.addCoreQuestion(req.params.parentId,req.body,(error,result)=>{
        if(error){
            return res.status(500).send({
              message:"Error while adding the document"
            })
          }
          res.status(201).send({
            "success":true,
            "message":"post success",
            result:result
          })
    })
})