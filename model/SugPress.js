const {mongoose}=require('../db');

var sugPressSchema=new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,required:true},
    createdAt:{type:Date,default:Date.now()},
    sugar:{type:String,required:true},
    pressure:{type:String,required:true},
    mtechFillup:{type:Boolean,default:false},
    mtech:{type:mongoose.SchemaTypes.ObjectId}
})

module.exports=mongoose.model('SugPress',sugPressSchema);