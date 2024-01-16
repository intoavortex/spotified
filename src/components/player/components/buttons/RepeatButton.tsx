import { useEffect, useCallback } from 'react';
import axios from "axios";

import { TbRepeatOnce, TbRepeat } from 'react-icons/tb';
import Button from "./common/Button";

import GetToken from '../../../../js/api/GetToken';
import GetDeviceId from "../../../../js/api/GetDeviceId";

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../types/Type";
import { SetRepeat } from "../../../../slices/PlayState";

export default function RepeatButton() {

  const dispatch = useDispatch();
  const IsRepeat = useSelector((state: RootState) => state.playState.IsRepeat);


  const PlayTrackRepeat = useCallback(async (IsRepeat) => {
    try {
      const token = await GetToken();
      let deviceIdData = await GetDeviceId();
      const deviceId = deviceIdData.devices[0].id

      const res = await axios.put(`https://api.spotify.com/v1/me/player/repeat?state=${IsRepeat}`, {
        device_ids: deviceId,
        state: 'off',
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

  /**
   * api 받아와서 보여주기
   */

  const RepeatHandler = (e) => {
    e.preventDefault();
    dispatch(SetRepeat(IsRepeat))
  }

  useEffect(() => {
    PlayTrackRepeat(IsRepeat)
  }, [IsRepeat]);

  return (
    <>
      <Button title='반복' onClick={(e) => { RepeatHandler(e) }}>
        {IsRepeat === 'off' && <TbRepeat size='22' className={'svgStrokeIcon'}/>}
        {IsRepeat === 'track' && <TbRepeatOnce size='22' color='#feac00' />}
        {IsRepeat === 'context' && <TbRepeat size='22' color='#feac00'/>}
      </Button>
    </>
  );
}
