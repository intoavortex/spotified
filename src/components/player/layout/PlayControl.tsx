import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import LyricsButton from "../components/buttons/LyricsButton";
import PlayListButton from "../components/buttons/PlayListButton";
import DeviceConnectButton from "../components/buttons/DeviceConnectButton";
import VolumeButton from "../components/buttons/VolumeButton";
import FullScreenButton from "../components/buttons/FullScreenButton";
import BarComponent from "../components/Bars/VolumeBar";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
  align-items: center;
`

const Barbox = styled.div`
  width:100%;
  max-width:608px;
  height:4px;
  background-color:hsla(0,0%,100%,.3);
  border-radius: 2px;
  overflow:hidden;
`

const VolumeBar = styled.a`
  display:block;
  width:  40%;
  // isPlayBar
  height:100%;
  border-radius: 2px;
  background-color: #fff;
  /* transform:translateX(-100%); */
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

export default function PlayControl({ player }) {
  // useEffect(() => {
  //   if (!player) {
  //     return;
  //   }
  //   player.connect();

  //   /* 플레이어 상태가 변경될 때마다 */
  //   player.addListener('ready', ({ device_id }) => {
  //     console.log('The Web Playback SDK is ready to play music!');
  //     console.log('Device ID', device_id);
  //   })
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
