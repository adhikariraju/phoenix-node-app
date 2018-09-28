var express=require("express");
var router=express.Router();
var sugpressCtrl=require('../controller/SugPress');

function validateFields() {
   return (req,res,next)=>{
     var userId=req.body.userId||"";
     var sugar=req.body.sugar||"";   
     var pressure=req.body.pressure||""; 
       if(userId==""||sugar==""||pressure==""){
          return res.status(400).send({error:"All fields are required"})
       }
       next();
   } 
}

router.get('/:userId',(req,res)=>{
   
   sugpressCtrl.getAllByUserId(req.params.userId,(err,result)=>{
       if(err){
          return res.status(400).send({err:"error while getting"});
       } 
       res.status(200).send({result:result,success:true});
   })
})

router.get('/:userId/getRecent',(req,res)=>{
    console.log("req",req.params)
    let userId = req.params.userId;
    var currentDate=new Date(Date.now());
    currentDate.setDate(currentDate.getDate()-7);
    var fromDate=currentDate.valueOf();
    var parameter = {userId: userId, fromDate: fromDate, toDate: Date.now()}
    sugpressCtrl.getAllWithinDate(parameter,(err,result)=>{
        if(err){
            return res.status(400).send({err:"Error while getting"})
        }
        res.status(200).send({result:result,success:true});
    })
})

router.get("/:userId/:fromDate-:toDate",(req,res)=>{
    var userId=req.params.userId;
    var fromDate=req.params.fromDate.valueOf();
    var toDate=req.params.toDate.valueOf();
    sugpressCtrl.getAllWithinDate({userId,fromDate,toDate},(err,result)=>{
        if(err){
            return res.status(400).send({err:"error while getting"})
        }
        res.status(200).send({result:result,success:true})
    })
})

router.post('/',validateFields(),(req,res)=>{
    sugpressCtrl.save(req.body,(err,result)=>{
        if(err){
            return res.status(400).send({err:"Error while posting"})
        }
        res.status(202).send({msg:"Post Success"});
    })
})
module.exports=router;