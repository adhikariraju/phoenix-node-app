var Assignment =require("../model/Assignment");
var userCtrl=require("../controller/User");
var User=require("../model/User");

exports.assignUserToDoc=(userId,doctorId,callback)=>{
    var assign=new Assignment({
        user:userId,
        doctor:doctorId
    })
    userCtrl.setAssignStatus(userId,true,(err,result)=>{
        if(err){
          var error=new Error("Error while assigning");
          error.status=500;
          return next(err);
        }        
        assign.save((err,result)=>{
            callback(err,result);
        })        
    })       
}

exports.getAllAssignment=(callback)=>{
    Assignment.find({},(err,result)=>{
        callback(err,result);
    })
}

exports.getUnAssignedUsers=(callback)=>{
    User.find({assigned:false},(err,result)=>{
        callback(err,result);
    })
}