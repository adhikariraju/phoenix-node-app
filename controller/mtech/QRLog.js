
var QRLog=require("@model/Qrlog");

exports.createLog=(data,cb)=>{
    console.log("data createlog",data);
    var qrlog=new QRLog({
        ...data
    });

    qrlog.save((err,result)=>{
      cb(err,result);  
    });
}