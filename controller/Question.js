var Question=require("../model/Question");


exports.getQuestionByType=(type,cb)=>{
  Question.find({type:type},(err,result)=>{       
       cb(err,result);
  })
};

exports.getQuestionById=(id,cb)=>{
  Question.find({_id:id},(err,result)=>{
    cb(err,result); 
  })
};

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
          $cond:[{$in:[data.userId,"$viewedBy.userId"]},true,false]
         
        }
      }
    }
  ]).exec((err,result)=>{
    console.log("err||result",err||result)
    cb(err,result)    
  })
}



exports.postQuestion=(quest,cb)=>{
      var data={
        type:quest.type,
        questions:quest.questions,
        introQuestions:quest.introQuestions,
        dueDate:Date.parse(quest.dueDate)
      };
      
      var question=new Question(data);
      question.save((err,result)=>{
         cb(err,result)
      });
}

//update options

exports.markAsViewed=(data,cb)=>{
  console.log(data)
  Question.findByIdAndUpdate({_id:data.questionSetId},
                             {$push:{viewedBy:{userId:data.userId}}},
                             (err,result)=>{
                               cb(err,result)
                              }); 
}

exports.updateCoreQuest=(parentId,coreId,question,cb)=>{
  Question.findByIdAndUpdate(
    {"_id":parentId,"coreQuestions._id":coreId},
    {$set:{"coreQuestions.$":question}},
    (err,result)=>{
      cb(err,result)
    }   
  )
}

exports.updateIntroQuest=(parentId,introId,question,cb)=>{
  Question.findByIdAndUpdate(
    {"_id":parentId,"introQuestions._id":introId},
    {$set:{"introQuestions.$":question}},
    (err,result)=>{
      cb(err,result)
    }   
  )
}
