import { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { IoMdShuffle } from 'react-icons/io';
import Button from "./common/Button";
import getTokenApi from '../../../../js/api/getToken';

// import PlayTrackShuffle from "../../../../js/api/PlayTrackShuffle";
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../types/Type";
import { ShuffleTrack } from "../../../../slices/PlayState";
import GetDeviceId from "../../../../js/api/GetDeviceId";

export default function ShuffleButton() {
  const dispatch = useDispatch();
  const IsShuffle = useSelector((state: RootState) => state.playState.IsShuffle);

  const PlayTrackShuffle = useCallback(async (IsShuffle) => {
    try {
      const token = await getTokenApi();
      let deviceIdData = await GetDeviceId();
      const deviceId = deviceIdData.devices[0].id

      const res = await axios.put(`https://api.spotify.com/v1/me/player/shuffle?state=${IsShuffle}`, {
        device_ids: deviceId,
        state: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  }, []);


  const ShuffleHandler = (e) => {
    e.stopPropagation();
    PlayTrackShuffle(IsShuffle)
    IsShuffle === true? dispatch(ShuffleTrack(false)) : dispatch(ShuffleTrack(true));
  }

  return (
    <>
      <Button title='무작위' onClick={(e) => ShuffleHandler(e)}>
        { IsShuffle === true ?
          <IoMdShuffle size='22' color='#feac00'/> :
          <IoMdShuffle size='22' className={'svgIcon'}/>
        }
      </Button>
    </>
  );
}
