// let request = require('request'); // "Request" library

// let client_id = 'aa7601bf18b64ac1ac3e9ce8132c1853'; // Your client id
// let client_secret = '6bc9825b4a114b61b6e843baed3c30bc'; // Your secret

// // your application requests authorization
// let authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error:any, response:any, body:any) {
//   if (!error && response.statusCode === 200) {

//     // use the access token to access the Spotify Web API
//     var token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/users/jmperezperez',
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function(error:any, response:any, body:any) {
//       console.log(body);
//     });
//   }
// });