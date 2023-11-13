import axios from 'axios';

export default async function playTrackInfo (device_id, token) {
  try {
    const res = await axios.put('https://api.spotify.com/v1/me/player', {
      device_ids: [device_id],
      play: false,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    alert(err);
  }
};
