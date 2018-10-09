var User = require('../model/User')


exports.setAssignStatus=(userId,status,callback)=>{
    User.findOneAndUpdate({_id:userId},{$set:{assigned:status}},(err,result)=>{
        if(!result){
          return callback(err,null);
        }
        callback(null,result);
    })
}


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

exports.setUserInfo=(id,userInfo,cb)=>{
    let nickname=userInfo.nickName||""
    let sex=userInfo.gender||""
    let city=userInfo.city||""
    let province=userInfo.province||""
    let country=userInfo.country||""
    let headimgurl=userInfo.avatarUrl||""
    let unionId=userInfo.unionId||""
    let mobile=userInfo.mobile||""
    User.findOneAndUpdate({_id:id},{
        nickname:nickname,
        sex:sex,
        city:city,
        province:province,
        country:country,
        headimgurl:headimgurl,
        unionId:unionId,
        mobile:mobile,
        verified:true
    },{new:true},(err,result)=>{
        
        if(err) cb(err,null)
     
        else{
           cb(null,result) 
        }
    })
}

exports.signupUser=(userInfo,cb)=>{
    console.log("userInfo in signupUser",userInfo)
    let nickname = userInfo.nickName || ""
    let sex = userInfo.gender || ""
    let city = userInfo.city || ""
    let province = userInfo.province || ""
    let country = userInfo.country || ""
    let headimgurl = userInfo.avatarUrl || ""
    let unionId = userInfo.unionId || ""
    let mobile = userInfo.mobile || ""

    var user=new User({
        session_key:userInfo.session_key,
        openid:userInfo.openid,
        nickname: nickname,
        sex: sex,
        city: city,
        province: province,
        country: country,
        headimgurl: headimgurl,
        unionId: unionId,
        mobile: mobile,
        verified: true
    });
    console.log("inside user save");
    
    user.save((err, result) => {
        if (err) cb(err, null);

        else {
            cb(null, result)
        }
    });
}





exports.getSession=(id,cb)=>{
    User.findById({_id:id},(err,result)=>{
        if(err) cb(err,null)
        else {
            cb(null,result);
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