var Question=require("../model/Question");
exports.getQuestionByType=(type,cb)=>{
  Question.find({type:type},(err,result)=>{       
       cb(err,result);
  })
}

exports.getAllQuestion=(cb)=>{
  Question.find({},(err,result)=>{
       cb(err,result)    
  })
}

exports.postQuestion=(quest,cb)=>{
      var data={
        type:quest.type,
        questions:quest.questions,
        introQuestions:quest.introQuestions
      }
      var question=new Question(data);
      question.save((err,result)=>{
         cb(err,result)
      });
}