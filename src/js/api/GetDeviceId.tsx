import axios from 'axios';
import { useSelector } from "react-redux"
import { RootState } from "../../types/Type";
import getToken from './getToken';


export default async function GetDeviceId() {
  const accessToken = await getToken()
  const url = `https://api.spotify.com/v1/me/player/devices`;
  const token = `Bearer ${accessToken.access_token}`;

  try {
    const res =  await axios.get(url,
    {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    alert(err);
  }
}
