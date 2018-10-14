var Doctor=require("../model/Doctor");

exports.createDoctor=(data,callback)=>{
  var doctor=new Doctor({
     ...data
  });
  
  doctor.save((err,result)=>{
      callback(err,result);
  });
   
}

exports.getDoctorById=(data,callback)=>{
   Doctor.findById({_id:data.id},(err,result)=>{
       callback(err,result)
   })
}

exports.getAllDoctor=callback=>{
   Doctor.find({},(err,result)=>{
       callback(err,result);
   }); 
}