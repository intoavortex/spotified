import axios from "axios";
import getToken from "./getToken";

export default async function RecentlyTrackInfo () {
  const accessToken = await getToken();
  const url = `https://api.spotify.com/v1/me/player/recently-played`;
  const token = `Bearer ${accessToken.access_token}`; 

  try {
    const res =  await axios.get(url, {
      headers: {
        Authorization: token
      }
    });
  
    return res.data;
  } catch (err) {
    alert('tq');
  }
}
