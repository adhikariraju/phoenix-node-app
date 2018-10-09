var express = require("express")
var router = express.Router();
var assignCtrl=require("../controller/Assignment")
var userCtrl=require("../controller/User");

router.post("/",(req,res)=>{
    let userId=req.body.userId;
    let doctorId=req.body.doctorId;   
    assignCtrl.assignUserToDoc(userId,doctorId,(err,result)=>{
        if(err){
           var error=new Error("Error while assigning");
           error.status=500;
           return next(err);
        }

        else if(result){
            return res.status(202).send({message:"Assignment Success"})
        }          
    })
        
})

router.get("/",(req,res)=>{
    assignCtrl.getAllAssignment((err,result)=>{
        if(err){
            return res.status(500).send({err:err});
        }
        res.status(202).send({
            success:true,
            message:"Get assignment success",
            result:result        
        })
    })
})

router.get("/unassignedUser",(req,res)=>{
    assignCtrl.getUnAssignedUsers((err,result)=>{
        if(err){
            return res.status(500).send({
                "message":"Error while receiving users",
                "success":false,
                "error":err
            })
        }
        res.status(200).send({
            "success":true,
            "result":result,
            "message":"Get success"
        })
    })
});

router.get("/:userId",(req,res)=>{
       
})

module.exports = router;