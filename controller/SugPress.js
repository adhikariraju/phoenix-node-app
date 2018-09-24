var SugPress=require('../model/SugPress');

exports.getAllByUserId=(data,callback)=>{
  SugPress.find({userId:data.userId},function(err,result){
      if(err){
          callback(err,null);
      }
      callback(null,result);
  })
}

exports.save=(data,callback)=>{
   var sugpress=new SugPress({
       userId:data.userId,
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
    SugPress.find({userId:data.userId,createdAt:{$lte:data.toDate,$gte:data.fromDate}},(err,result)=>{
        callback(err,result)
    })
}