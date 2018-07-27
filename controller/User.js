var User = require('../model/User')

exports.findByOpenId=(oid,cb)=>{
    User.where({ openid: oid }).findOne(
        function (err, user) {
            cb(err,user);
        }
    )
}

exports.updateSession=(id,session,cb)=>{
  User.findOneAndUpdate({_id:id},{$set:{session_key:session}},{new:true},(err,result)=>{
     if(err) cb(err,null)
     
     else{
        cb(null,result) 
     }
  })
}



exports.registerUser=(data,cb)=>{
    
    let user = new User({
        openid: data.openid,
        "session_key": data.session_key
    })

    user.save(function (err, result) {
        if (err) {
            cb(err,null);
        }
        cb(null,result);
    });
}