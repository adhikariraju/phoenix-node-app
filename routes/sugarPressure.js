var express=require("express");
var router=express.Router();
var sugpressCtrl=require('../controller/SugPress');
var verify = require("../utils/verify")

function validateFields() {
   return (req,res,next)=>{
     var userId=req.body.userId||"";
     var sugar=req.body.sugar||"";   
     var pressure=req.body.pressure||""; 
       if(userId==""||sugar==""||pressure==""){
          return res.status(400).send({message:"All fields are required",success:false})
       }
       next();
   } 
}

router.use(verify.verifyUser);

router.get('/',(req,res)=>{
   sugpressCtrl.getAllByUserId(req.decoded.userId,(err,result)=>{
       if(err){
          return res.status(400).send({err:"error while getting"});
       } 
       res.status(200).send({result:result,success:true});
   })
});


router.post('/', validateFields(), (req, res) => {
    var data = {
        userId: req.decoded.userId,
        ...req.body
    };
    sugpressCtrl.save(data, (err, result) => {
        if (err) {
            console.log("error while posting sugpress", err);
            return res.status(400).send({ message: "Error while posting", success: false })
        }
        res.status(202).send({ message: "Post Success", success: true });
    })
});

//getting recent date (weekly) result.
//for medical tech
router.get('/getRecent',(req,res)=>{
    console.log("inside getrecent by id")
    let userId = req.params.userId||req.query.userId||req.decoded.userId;
    var currentDate=new Date(Date.now());
    currentDate.setDate(currentDate.getDate()-7);
    var fromDate=currentDate.valueOf();
    var parameter = {userId: userId, fromDate: fromDate, toDate: Date.now()}
    sugpressCtrl.getAllWithinDate(parameter,(err,result)=>{
        if(err){
            return res.status(400).send({err:"Error while getting"})
        }
        res.status(200).send({result:result,success:true});
    })
});

router.get("/:userId/:fromDate-:toDate",(req,res)=>{
    var userId = req.params.userId || req.query.userId || req.decoded.userId;
    var fromDate=req.params.fromDate.valueOf();
    var toDate=req.params.toDate.valueOf();
    sugpressCtrl.getAllWithinDate({userId,fromDate,toDate},(err,result)=>{
        if(err){
            return res.status(400).send({err:"error while getting"})
        }
        res.status(200).send({result:result,success:true})
    })
})

module.exports=router;