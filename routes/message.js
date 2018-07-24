var express=require('express');
var router=express.Router();
var verify=require('../utils/verify')
var WechatAPI = require('../utils/wechatapi');
var receiverID="adsfasdfasdfadsfasdfasdf::"


router.get('/',(req,res)=>{
    if (verify.verify_ux_signature(req.query.signature, req.query.timestamp, req.query.nonce)) {
        res.send(req.query.echostr);
    };
    res.status(40001).send({ error: "Error while verifying the signature" });
});

router.post('/',(req,res)=>{
    console.log("req",req.body.xml.Content[0]);
    let message=req.body.xml.Content[0];
    console.log("wechat",WechatAPI)
    WechatAPI.sendText(receiverID,message,(err,result)=>{
        if(err){
            console.log("error of message api",err)
           return res.send(err);
        }
        console.log("result of message api",result)
        res.send(result);
    });

})

module.exports=router;