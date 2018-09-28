var express = require('express');
var router = express.Router();
const axios = require('axios');
var config = require('../config/config');
var WechatAPI = require('wechat-api');
var UserCtrl=require('../controller/User')
var WeChatCtrl=require('../controller/Wechat')
var verify=require("../utils/verify")

// var api = new WechatAPI(config.APPID, config.APPSECRET);

// function getAccessToken(callback) {
//     axios.get(`https://api.wechat.com/cgi-bin/token?grant_type=client_credential&appid=${config.APPID}&secret=${config.APPSECRET}`)
//         .then(result => {
//             callback(result.data.access_token);
//         })
// }

// function getUserInfo() {
//     axios.get(`https://api.wechat.com/cgi-bin/user/info?access_token=${AccessToken}&openid=${apiRes.data.openid}&lang=en_US`)
//         .then(result => {

//         })
//         .catch(error => {
//             res.status(500).send(error);
//         });
// }

function checkExistence(){
    return (req,res,next)=>{
       let code=req.query.code;
      
        // if(!code||!userInfo.nickname||!userInfo.gender||!userInfo.country||!userInfo.language||!userInfo.sex||!userInfo.province||!userInfo.city){
        //     res.status(500).send({errMsg:"Some field is missing"})
        // }
        if(!code){
            res.send({errMsg:"Code is required"});
        }
        else{
            next();
        }
    }
}

router.get("/",checkExistence(),(req, res, next) => {
    const code = req.query.code;
    WeChatCtrl.getOidAndSession(code,function(err,data){
        if(data){
            console.log("data",data);
            UserCtrl.findByOpenId(data.openid, function (err, user) {
                if (err) res.status(500).send("Error while logging in");
                   
                else if (user === null || user === "") {
                   UserCtrl.registerUser({
                     openid:data.openid,
                     session_key:data.session_key
                  },(err,result)=>{
                       if(err) throw err;
                       else if(result){
                           res.send({
                              verified:result.verified,
                              sid:result._id
                           })
                       }
                  })
                }
                 
                else if (user !== null || user === "") {
                 
                  UserCtrl.updateSession(user._id,data.session_key,function(err,user){
                      if(err) throw err;
                      res.locals.user = user;
                      next();
                  })
                }
            })
        }

        else if(err){
          console.log(err);
          return res.status(500).send(err);
        }
    })   
})

router.get("/", (req, res) => {
    let user = res.locals.user
    console.log("user", user);
    res.send({ verified: user.verified, sid: user.sid })
});


router.use("/v2",(req,res)=>{
    console.log("inside v2");
    const code = req.query.code;
    WeChatCtrl.getOidAndSession(code, function (err, data) {
        if (data) {
            console.log("data", data);
            UserCtrl.findByOpenId(data.openid, function (err, user) {
                if (err) res.status(500).send("Error while logging in");
                
                // openId is not in list create a token using openId and sessionId for registration process.
                else if (user === null || user === "") {
                  var tempToken= verify.getUnverifiedUserToken(data);
                  return res.status(200).send({"verified":false,tempToken:tempToken})
                }
                
                // when there is a user with openId in DB.
                else if (user !== null || user === "") {

                    UserCtrl.updateSession(user._id, data.session_key, function (err, user) {
                        if (err){
                            throw err;
                        };
                        var token=verify.getToken(user._id);
                        res.locals.user = {verified:false,token:token};
                        next();
                    })
                }
            })
        }

        else if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })     
})

router.get("/v2", (req, res) => {
    let user = res.locals.user
    console.log("user", user);
    res.send({ verified: user.verified, token: user.token })
});


module.exports=router;