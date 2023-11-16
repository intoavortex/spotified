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
import VolumeBar from "../components/Bars/VolumeBar";

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

export default function PlayControl({ player }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!player) {
      return;
    }


    /* 플레이어 상태가 변경될 때마다 */
    // player.addListener('player_state_changed', (state) => {
      //   if (!state) {
        //     return;
        //   }
        //   dispatch(UpdatePlayerState(state))
        // });
  }, []);
  const [changeVolumeData, setChangeVolumeData] = useState('');
  const [clickVolumeData, setClickVolumeData] = useState('');
  const onVolumeChange = (volumeChangeData) => {
    setChangeVolumeData(volumeChangeData)
  }

  const onClickVolumeChange = (clickVolumeData) => {
    setClickVolumeData(clickVolumeData)
  }

  return (
    <Container>
      <LyricsButton />
      <PlayListButton />
      <DeviceConnectButton />

      <VolumeBox className='playerBarBox'>
        <VolumeButton player={ player } volumeData={changeVolumeData} onClickVolumeChange={onClickVolumeChange}/>
        <VolumeBar player={ player } onVolumeChange={onVolumeChange} clickVolumeData={clickVolumeData}/>
      </VolumeBox>
      <FullScreenButton />
    </Container>
  );
}
