var config = require("../config/config");
var axios = require('axios');

var ACCESS_TOKEN;
var AT_UPDATE_TIME;

exports.getAccessToken = function getAccessToken(callback) {
    var now = new Date();

    if (AT_UPDATE_TIME != undefined && now.getYear() == AT_UPDATE_TIME.getYear() && now.getMonth() == AT_UPDATE_TIME.getMonth() && now.getDay() == AT_UPDATE_TIME.getDay() && (now.getHours() - AT_UPDATE_TIME.getHours()) <= 1) {
        callback(ACCESS_TOKEN);
    }
    else {
        var at_tmp = ACCESS_TOKEN;
        axios.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + config.APPID + "&secret=" + config.APPSECRET)
        .then(result=> {
                var data = result.data;
                ACCESS_TOKEN = data.access_token;
                AT_UPDATE_TIME = new Date();
                callback(ACCESS_TOKEN);
            })
        .catch(function (e) {
            console.error(e);
        });
    }
}