var express=require('express');
var router=express.Router();
var verify=require('../utils/verify')
const axios = require('axios');
var config=require('../config/config');
var User=require('../model/User')
var WechatAPI = require('wechat-api');

var api = new WechatAPI(config.APPID,config.APPSECRET);

function getAccessToken(callback){
        axios.get(`https://api.wechat.com/cgi-bin/token?grant_type=client_credential&appid=${config.APPID}&secret=${config.APPSECRET}`)
          .then(result => {
            callback(result.data.access_token);
        })
}

function getUserInfo(){
    axios.get(`https://api.wechat.com/cgi-bin/user/info?access_token=${AccessToken}&openid=${apiRes.data.openid}&lang=en_US`)
        .then(result => {
            
        })
        .catch(error => {
            res.status(500).send(error);
        });
}


router.use("/sso",(req,res,next)=>{
    console.log("request in sso", req.body);
    const code = req.body.code;
    

    axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.APPID}&secret=${config.APPSECRET}&js_code=${code}&grant_type=authorization_code`)
             .then(apiRes => {
                          console.log("apires",apiRes.data.openid)
                          User.where({openid:apiRes.data.openid}).findOne(
                             function(err,user){
                                 console.log("user",user);
                                if(err) res.status(400).send("Error while logging in");
                                else if(user===null||user===""){
                                    let user = new User({
                                        openid: apiRes.data.openid,
                                        "session_key": apiRes.data.session_key,
                                        "nickname":req.body.userInfo.nickname,
                                        "sex":req.body.userInfo.gender,
                                        "country":req.body.userInfo.country,
                                        "city":req.body.userInfo.city,
                                        "province":req.body.userInfo.province,
                                        "language":req.body.userInfo.language
                                    })

                                    user.save(function (err, result) {
                                        if(err){
                                            console.log("err",err);
                                        }
                                        console.log("result",result)
                                        next();
                                    });                             
                                }

                                 else if(user!==null||user===""){
                                     console.log("user has already signed up")
                                     res.send({status:true,message:"Existing user logged in"})
                                 }

                             }
                          )       
        })
        .catch((e) => {
            console.log("error while getting openid")             
             res.send(e);
        });
})

router.post("/sso",(req,res)=>{
   res.send({status:true,message:"New user signed up"});
})

router.use("/",(req,res,next)=>{
    if(verify.verify_ux_signature(req.query.signature,req.query.timestamp,req.query.nonce)){
        next();
    };
    res.status(40001).send({error:"Error while verifying the signature"});
})

router.get('/',(req,res)=>{
    
    res.send(req.query.echostr);
})

module.exports=router;