import axios from "axios";

export default async function PlayTrackInfo (playerId) {
  const url = `https://api.spotify.com/v1/me/player/play?device_id=${playerId}`;
  const auth = 'BQBrLz5B6rORmr-sZdP8ARsdRAbhpvE2ng_WCQZK9kRg3ip_5ElMxouk2i3mz1OsQV2Z_MtQqmjOEjGgCULQ1ODoUSxZ7RCwaefP3RRNXZ0_Th_HITaf';
  const token = `Bearer ${auth}`; 

  // console.log(trackId)
  try {
    const res =  await axios.put(url, 
    {
      "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
      "offset": {
          "position": 5
      },
      "position_ms": 0
    },
    {
      headers: {
        'Accept' : 'application/json',
        Authorization: token,
        'Content-Type': 'application/json'
      },
    });
  
    return res.data;
  } catch (err) {
    alert(err);
  }
}
