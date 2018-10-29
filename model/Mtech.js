const { mongoose } = require('../db.js');
const sha1=require('sha1')

const mtechSchema = new mongoose.Schema({
    "username": { type: String,index:{unique:true,dropDups:true}, required: true },
    "password": { type:String, required:true },
    "fullName": { type:String, required:true },
    "type":{type:String},  // type of admin
    "createdAt":{ type:Date, default:Date.now() },
    "lastLogin":{type:Date}
});

mtechSchema.pre('save',function(next){
    console.log("this",this);
    this.password=sha1(this.password);
    next();
})

module.exports = mongoose.model('Mtech', mtechSchema);