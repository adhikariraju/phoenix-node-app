const {mongoose}=require('../db');

var sugPressSchema=new mongoose.Schema({
    userId:{type:mongoose.SchemaTypes.ObjectId,required:true},
    createdAt:{type:Date,default:Date.now()},
    sugar:{type:String,required:true},
    pressure:{type:String,required:true}
})

module.exports=mongoose.model('SugPress',sugPressSchema);