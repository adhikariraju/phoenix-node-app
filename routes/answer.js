var express=require("express")
var router=express.Router();
var ansCtrl=require("@controller/Answer");

router.post("/",(req,res)=>{
   console.log("answers",req.body.answers);
   ansCtrl.saveAnswers(req.body.answers,(err,result)=>{
       if(err){
          return res.status(500).send({error:err,success:false})
       }
       return res.status(200).send({message:"answer post",success:true})
   })   
})

module.exports=router;