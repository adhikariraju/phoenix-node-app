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
});

router.get("/",(req,res)=>{
    assignCtrl.getAllAssignment((err,result)=>{
        console.log("result of assignment",result)
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

router.get("/assignId/:assignId",(req,res)=>{
    console.log("assignment by Id");
    assignCtrl.getAssignmentById(req.params.assignId,(err,result)=>{
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
    console.log("get unassigned")
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

router.put("/:assignId",(req,res)=>{
   assignCtrl.updateAssign(req.params.assignId,req.body.doctorId,(err,result)=>{
    console.log("update assign",result);
    console.log("update assing err",err);
      if(err){
          return res.status(500).send({
            "message":"Error while updating",
            "success":false,
            "error":err 
          })
      }
      res.status(200).send({
          "success":true,
          "result":result,
          "message":"Update success"
      })
   })     
})

router.delete("/:assignId",(req,res)=>{
    assignCtrl.deleteAssign(req.params.assignId,(err,result)=>{
        console.log("delete assign",result);
        console.log("delete assing err",err);
        if(err){
            return res.status(500).send({
              "message":"Error while deleting",
              "success":false,
              "error":err 
            })
        }
        res.status(200).send({
            "success":true,
            "result":result,
            "message":"delete success"
        })
    })
})

module.exports = router;