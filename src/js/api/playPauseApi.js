import axios from "axios";
import getToken from './getToken'

async function getDeviceId() {
  const accessToken = await getToken();

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

export async function PlayTrackInfo (playerId, playStamp, trackNumber) {
  let deviceIdData = await getDeviceId();
  const deviceId = deviceIdData.devices[0].id
  const accessToken = await getToken();
  const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
  const token = `Bearer ${accessToken.access_token}`; 

  try {
    const res =  await axios.put(url, 
    {
      "context_uri": playerId,
      "offset": {
          "position": trackNumber - 1 // 앨범의 몇 번째 트랙인지 구러면 이거도 받아서 봐야 됨 ㅁㅊ
      },
      "position_ms": playStamp // progress_ms
    },
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

export async function PauseTrackInfo (playerId, playStamp, trackNumber) {
  let deviceIdData = await getDeviceId();
  const deviceId = deviceIdData.devices[0].id
  const accessToken = await getToken();
  const url = `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`;
  const token = `Bearer ${accessToken.access_token}`; 

  try {
    const res =  await axios.put(url, 
    {
      "context_uri": playerId,
      "offset": {
          "position": trackNumber - 1 // 앨범의 몇 번째 트랙인지 구러면 이거도 받아서 봐야 됨 ㅁㅊ
      },
      "position_ms": playStamp // progress_ms
    },
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
