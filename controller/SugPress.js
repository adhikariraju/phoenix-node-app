var SugPress=require('@model/SugPress');

exports.getAllByUserId=(userId,callback)=>{
  SugPress.find({userId:userId},function(err,result){
      if(err){
          callback(err,null);
      }
      callback(null,result);
  })
}

exports.save=(data,callback)=>{
   var sugpress=new SugPress({
       user:data.user,
       sugar:data.sugar,
       pressure:data.pressure
   });
   sugpress.save((err,result)=>{
       if(err){
           callback(err,null);
       }
       callback(null,result);
   })
}

exports.getAllWithinDate=(data,callback)=>{
    console.log("data within date",data);
    SugPress.find({userId:data.userId,createdAt:{$lte:data.toDate,$gte:data.fromDate}},(err,result)=>{
        callback(err,result);
    })
}