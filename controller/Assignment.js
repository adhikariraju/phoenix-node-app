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

exports.getAssignmentById=(assignId,callback)=>{
    Assignment.find({_id:assignId},(err,result)=>{
       callback(err,result); 
    })
}

exports.getAllAssignment=(callback)=>{
    Assignment.find({})
        .populate('user','nickname headimgurl')
        .populate('doctor','nickname headimgurl')
        .exec((err,result)=>{
        callback(err,result);
    })
}

exports.getUnAssignedUsers=(callback)=>{
    User.find({assigned:false},(err,result)=>{
        callback(err,result);
    })
}

exports.updateAssign=(assignId,doctorId,cb)=>{
    console.log("doctorId",doctorId);
    Assignment.findOneAndUpdate(
        {"_id":assignId},
        {$set:{"doctor":doctorId}},
        {new:true},
        (err,result)=>{
         
            cb(err,result)
        }   
    );
}
                                      
exports.deleteAssign=(assignId,cb)=>{
    Assignment.findByIdAndDelete(assignId,(err,result)=>{
        if(result){
            console.log("delte assign result",result)
           return userCtrl.setAssignStatus(result.user,false,(err,usrresult)=>{
                cb(err,result);
            })
        }
        cb(err,null);   
    })
}