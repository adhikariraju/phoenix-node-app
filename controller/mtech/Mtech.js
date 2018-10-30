var Mtech = require("@model/Mtech");
var QRLog=require("@model/Qrlog");
var sha1=require("sha1");

exports.register=(data,cb)=>{
    var mtech = new Mtech({
        username:data.username,
        password:data.password,
        fullName:data.fullName,
    });
   
    mtech.save((err,result)=>{
       cb(err,result);     
    })   
}

exports.login=(data,cb)=>{
    console.log("inside mtech controller")
    Mtech.findOne({username:data.username},(err,result)=>{
        if(err){
           return cb(err,null);
        }
    
        if(result.password===sha1(data.password)){
          Mtech.findOneAndUpdate({username:data.username},
               {$set:{lastLogin:Date.now()}})
               .select("-password -createdAt -lastLogin")
               .exec((err,result)=>{   
                 return cb(err,result)         
            }) 
        }
        else {            
            let err= new Error("Invalid login credential"); 
            cb(err,null)
        } 
    })
};

exports.createLog=(data,cb)=>{
    console.log("data createlog",data);
    var qrlog=new QRLog({
        ...data
    });

    qrlog.save((err,result)=>{
      cb(err,result);  
    });
}