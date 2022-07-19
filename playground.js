const axios = require("axios");

let headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)",
 "Authorization": "Bearer 9ab2a15c-f802-4800-855b-18687b4026f1" 
}

let reqOptions = {
  url: 'https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "record", "value": true}]',
  method: "GET",
  headers: headersList,
}

axios.request(reqOptions).then(function (response) {











  // console.log("stream",response.data);

for (const res of response.data) {



  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Authorization": "Bearer 9ab2a15c-f802-4800-855b-18687b4026f1" 
   }
   
   let reqOptions = {
     url: `https://livepeer.com/api/stream/${res.id}/sessions`,
     method: "GET",
     headers: headersList,
   }
   
   axios.request(reqOptions).then(function (response) {
     console.log(response.data);
   })
  }






})


 headersList = {
  "Accept": "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Authorization": "Bearer 9ab2a15c-f802-4800-855b-18687b4026f1" 
 }
 
  reqOptions = {
   url: "https://livepeer.com/api/asset",
   method: "GET",
   headers: headersList,
 }
 
 axios.request(reqOptions).then(function (response) {
  //  console.log(response.data);
 })