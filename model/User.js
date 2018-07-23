const { mongoose } = require('../db.js');

const userSchema = new mongoose.Schema({
    openid:{type:String,required:true},
    session_key:String,
    "nickname":String,
    "sex": Number,
    "city": String,
    "province": String,
    "country": String,
    "headimgurl": String,
    "unionId": String,
    "mobile":String
});

module.exports = mongoose.model('User',userSchema);
