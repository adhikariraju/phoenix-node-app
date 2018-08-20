const { mongoose } = require('../db.js');

const coreQuestion=new mongoose.Schema({
  questionId:{type:mongoose.SchemaTypes.ObjectId,required:true},
  answerId:{type:mongoose.SchemaTypes.ObjectId,required:true}
})

const answerSchema = new mongoose.Schema({
    userId:{type:mongoose.SchemaTypes.ObjectId,required:true},
    type:{type:String,required:true},
    questionSetId:{type:mongoose.SchemaTypes.ObjectId,required:true},
    questionnaire:[coreQuestion]
});

module.exports = mongoose.model('Answer',answerSchema);