const { mongoose } = require('../db');
const Mtech = require("./Mtech");
const User=require("./User")


const deviceSchema=new mongoose.Schema({
    "model":{type:String,required:true},
    "platform":{type:String},
    "manufacturer":{type:String,required:true},
    "version":{type:String,required:true},
    "uuid":{type:String,required:true},
    "ip":{type:String,required:true}
 });    
 

const qrlogSchema = new mongoose.Schema({
    "mtech": { type:mongoose.SchemaTypes.ObjectId,required:true, ref:'Mtech' },
    "patientRef": { type:mongoose.SchemaTypes.ObjectId,required:true, ref:'User' },
    "deviceInfo": { type:deviceSchema,required:true },
    "createdAt": { type:Date, default:Date.now() },
    });

module.exports = mongoose.model('QRLog', qrlogSchema);