import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../types/Type";
import { UpdatePlayerState } from "../../../slices/PlayState";

import LyricsButton from "../components/buttons/LyricsButton";
import PlayListButton from "../components/buttons/PlayListButton";
import DeviceConnectButton from "../components/buttons/DeviceConnectButton";
import VolumeButton from "../components/buttons/VolumeButton";
import FullScreenButton from "../components/buttons/FullScreenButton";
import BarComponent from "../components/Bars/VolumeBar";

// import * as PlayTrackInfo from "../../../js/api/PlayTrackInfo";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
  align-items: center;
`

const VolumeBox = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:100%;
  max-width:125px;
  margin-right:4px;
`

// export default function PlayControl({ player, token }) {
export default function PlayControl() {
  // const playTrackInfo = useCallback(async (device_id) => {
  //   try {
  //     const res = await axios.put('https://api.spotify.com/v1/me/player', {
  //       device_ids: [device_id],
  //       play: false,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return res;
  //   } catch (err) {
  //     alert(err);
  //   }
  // }, []);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!player) {
  //     return;
  //   }

    // console.log(player);

    /* 플레이어 상태가 변경될 때마다 */
    // player.addListener('ready', ({ device_id }) => {
    //   playTrackInfo(device_id)

    //   player.getCurrentState().then( state => {
    //     if (!state) {
    //       console.error('User is not playing music through the Web Playback SDK');
    //       return;
    //     }

    //     console.log('❤️‍🔥 current', state);

    //   });

    // })

    // player.addListener('player_state_changed', (state) => {
    //   if (!state) {
    //     return;
    //   }
    //   dispatch(UpdatePlayerState(state))
    // });
  // }, [player]);

  return (
    <Container>
      <LyricsButton />
      <PlayListButton />
      <DeviceConnectButton />

      <VolumeBox className='playerBarBox'>
        <VolumeButton />
        <BarComponent/>
      </VolumeBox>
      <FullScreenButton />
    </Container>
  );
}
