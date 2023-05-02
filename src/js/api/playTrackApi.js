import axios from "axios";

async function getToken () {
  const url = `http://localhost:8888/access-token`;
  try {
    const res =  await axios.get(url);

    return res.data;
  } catch (err) {
    console.error(err);
  }
}


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

export default async function PlayTrackInfo (playerId) {
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
          "position": 0 // 앨범의 몇 번째 트랙인지 구러면 이거도 받아서 봐야 됨 ㅁㅊ
      },
      "position_ms": 0
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
