/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

import axios from "axios";

var client_id = 'aa7601bf18b64ac1ac3e9ce8132c1853'; // Your client id
var client_secret = '6bc9825b4a114b61b6e843baed3c30bc'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  method: 'post',
  headers: {
    // 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
    // 'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
  responseType: 'json'
};

export default async function testApi() {
  try {
    const token = await axios(authOptions);

    return token;
  } catch (e) {
    console.error(e);
  }
  
  // axios.post(authOptions, function(error, response, body) {
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
  //     axios.get(options, function(error, response, body) {
  //       console.log(body);
  //     });
  //   }
  // });
}
