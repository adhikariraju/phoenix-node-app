var config = require('../config/config')
var axios = require("axios");
exports.getOidAndSession=(code,cb)=>{
    console.log("code on wechat ctrl",code);
  axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.APPID}&secret=${config.APPSECRET}&js_code=${code}&grant_type=authorization_code`)
    .then(apiRes => {
        if(apiRes){
            cb(null,apiRes.data)
        }        
    })
    .catch((e) => {
         cb(e,null)
    })
};