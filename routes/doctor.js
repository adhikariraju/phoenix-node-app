var express = require('express');
var router = express.Router();
var doctorCtrl=require("../controller/Doctor")

router.get("/:id",(req,res)=>{
 doctorCtrl.getDoctorById(req.body.id,(err,result)=>{
   if(err){
       res.status(400).send({message:"error while getting doctor"})
   }
   res.status(200).send({success:true,
                         message:"successfully retrieved",
                         result:result
                        });   
 })
});

router.get("/",(req,res)=>{
    doctorCtrl.getAllDoctor((err,result)=>{
        if(err){
            res.status(400).send({ message: "error while getting doctor" })
        }
        res.status(200).send({success:true,
                              message:"successfully retrieved", 
                              result:result 
        })
    })
});

router.post("/",(req,res)=>{
  doctorCtrl.createDoctor(req.body,(err,result)=>{
    if(err){
      res.status(400).send({message:"error while adding doctor",detail:err})
    }  
    res.status(202).send({success:true,message:"successfully added a doctor"})
  })
});

module.exports = router;