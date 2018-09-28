var express=require('express');
var router=express.Router();
var verify=require('../utils/verify')
var WechatAPI = require('../utils/wechatapi');
var UserCtrl=require("../controller/User");


router.get('/',(req,res)=>{
    console.log("req.body",req.query);
    if (verify.verify_ux_signature(req.query.signature, req.query.timestamp, req.query.nonce)) {
        console.log("verified url");
      return res.send(req.query.echostr);
    }
    else{
      res.send({ error: "Error while verifying the signature" });
    }
});

router.post('/',(req,res)=>{
    console.log("req",req.body.content);
    let message=req.body.comment;
    console.log("wechat",WechatAPI)
    UserCtrl.findByOpenId(res.body.openid,(err,result)=>{
        if(result!==null){
            WechatAPI.sendText(result.assignedTo, message, (err, result) => {
                if (err) {
                    return res.send(err);
                }
                res.send(result);
            });
        }
    })    
})

module.exports=router;