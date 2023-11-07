import styled from 'styled-components';
import { useState } from 'react';

import BtnComponent from "../components/BtnComponent";

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

export default function PlayControl() {
  return (
    <Container>
      <BtnComponent btnFnc={'lyrics'} />
      <BtnComponent btnFnc={'playList'} />
      <BtnComponent btnFnc={'deviceConnect'} />

      <VolumeBox className='playerBarBox'>
        <BtnComponent btnFnc={'volume'} />
        <Barbox>
          <VolumeBar></VolumeBar>
        </Barbox>
      </VolumeBox>
      <BtnComponent btnFnc={'fullscreen'} />
    </Container>
  );
}
