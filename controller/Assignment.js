var Assignment =require("../model/Assignment");

exports.assignUserToDoc=(userId,doctorId,callback)=>{
    var assign=new Assignment({
        userId:userId,
        assignedTo:doctorId
    })
    assign.save((err,result)=>{
        callback(err,result);
    })
}