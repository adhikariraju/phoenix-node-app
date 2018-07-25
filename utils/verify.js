var config=require('../config/config')
var sha1=require('sha1');

exports.verify_ux_signature=(signature,timestamp,nonce)=>{
   if(signature===null||timestamp===null||nonce===null){
      return false;
   }
   let TOKEN=config.WX_TOKEN;
    //Sort the token, timestamp, and nonce parameters alphabetically.
    let wxarray=[TOKEN,timestamp,nonce];
    wxarray.sort();

    
    //Combine the parameters into a string and encrypt it using SHA - 1.
    let wxStr=wxarray[0]+wxarray[1]+wxarray[2];
    let encwxStr=sha1(wxStr);

       
    /* Compare the encrypted string with the signature.If they are identical, 
       the request has been verified as being sent by the WeChat Official Account System.
    */
   
     console.log("boolean",encwxStr===signature);
     return encwxStr===signature;
};