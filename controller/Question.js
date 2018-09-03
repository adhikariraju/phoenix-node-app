var Question=require("../model/Question");
exports.getQuestionByType=(type,cb)=>{
  Question.find({type:type},(err,result)=>{       
       cb(err,result);
  })
}

exports.getAllQuestion=(data,cb)=>{
  // Question.find({},(err,result)=>{
  //     var questions=[];
  //     result.map((question,index)=>{
  //       var question;
  //        question.viewedBy.map((id)=>{
  //          if(id.userId==data.userId){
  //             question
  //          }
  //        })
  //     })
  //      cb(err,result)    
  // })

  Question.aggregate([
    {
      $project:{
        introQuestions:1,
        questions:1,
        type:1,
        createdAt:1,
        dueDate:1,
        viewed:{
          $cond:[{$in:[{userId:data.userId},"$viewedBy"]},true,false]
         
        }
      }
    }
  ]).exec((err,result)=>{
    console.log("err||result",err||result)
    cb(err,result)    
  })
}

exports.markAsViewed=(data,cb)=>{
  Question.findByIdAndUpdate({_id:data.questionSetId},
                             {$push:{viewedBy:{userId:data.userId}}},
                             cb(err,res)); 
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