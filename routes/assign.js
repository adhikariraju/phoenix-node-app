var express = require("express")
var router = express.Router();
var assignCtrl=require("../controller/Assignment")

router.post("/",(req,res)=>{
    let userId=req.body.userId;
    let doctorId=req.body.doctorId;   
    assignCtrl.assignUserToDoc(userId,doctorId,(err,result)=>{
        if(err){
           return res.status(400).send({err:err});
        }
        res.status(202).send({message:"Assignment Success"}) 
    })     
})

router.get("/:userId",(req,res)=>{

})
module.exports = router;