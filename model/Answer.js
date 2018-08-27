const { mongoose } = require('../db.js');

const subAnswerSchema=new mongoose.Schema({
  questionId:{type:mongoose.SchemaTypes.ObjectId,required:true},
  label:{type:String,required:true},
  answer:[{label:String,optionId:String}]
})

const answerSchema = new mongoose.Schema({
    completedBy:{type:mongoose.SchemaTypes.ObjectId,required:true},
    createdAt:{type:Date,default:Date.now()},
    type:{type:String,required:true},
    questionSetId:{type:mongoose.SchemaTypes.ObjectId,required:true},
    introQuestions:{type:[subAnswerSchema]}
});

module.exports = mongoose.model('Answer',answerSchema);