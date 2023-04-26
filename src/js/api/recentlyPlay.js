import axios from "axios";

export default async function RecentlyTrackInfo () {
  const url = `https://api.spotify.com/v1/me/player/recently-played`;
  // const url = `https://api.spotify.com/v1/me/player/recently-played&limit=10&after=${trackId}`;
  const auth = 'BQBrLz5B6rORmr-sZdP8ARsdRAbhpvE2ng_WCQZK9kRg3ip_5ElMxouk2i3mz1OsQV2Z_MtQqmjOEjGgCULQ1ODoUSxZ7RCwaefP3RRNXZ0_Th_HITaf';
  const token = `Bearer ${auth}`; 

  // console.log(trackId)

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
