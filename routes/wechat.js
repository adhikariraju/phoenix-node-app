var express=require('express');
var router=express.Router();
var verify=require('../utils/verify')
router.use("/",(req,res,next)=>{
    if(verify.verify_ux_signature(req.query.signature,req.query.timestamp,req.query.nonce)){
        next();
    };
    res.send({error:"Error while verifying the signature"});
})

router.get('/',(req,res)=>{
    
    res.send(req.query.echostr);
})

module.exports=router;