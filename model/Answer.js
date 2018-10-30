const { mongoose } = require('@root/db.js');
const Mtech=require("@model/Mtech");

const subAnswerSchema=new mongoose.Schema({
  questionId:{type:mongoose.SchemaTypes.ObjectId,required:true},
  label:{type:String,required:true},
  answer:[{label:String,optionId:String}]
})

const answerSchema = new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,required:true},
    mtechFillup:{type:Boolean, default:false},
    mtech:{type:mongoose.SchemaTypes.ObjectId,ref:'Mtech'},
    createdAt:{type:Date,default:Date.now()},
    type:{type:String,required:true},
    questionSetId:{type:mongoose.SchemaTypes.ObjectId,required:true},
    introQuestions:{type:[subAnswerSchema]},
    coreQuestions:{type:[subAnswerSchema]}
});

module.exports = mongoose.model('Answer',answerSchema);