import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../types/Type";
import GetDeviceId from "./GetDeviceId";

export default async function PlayTrackShuffle (shuffle_state) {
  const PlayerToken = useSelector((state: RootState) => state.playState.PlayerToken);
  let deviceIdData = await GetDeviceId();

  try {
    const res = await axios.put(`https://api.spotify.com/v1/me/player/shuffle`, {
      device_ids: [deviceIdData],
      state: shuffle_state,
    },
    {
      headers: {
        Authorization: `Bearer ${PlayerToken}`,
      },
    });

    console.log(res);
    return res;

  } catch (err) {
    console.log(err);
  }
};
