import styled from 'styled-components';
import { useState } from 'react';

import { BsFillVolumeDownFill, BsFillVolumeOffFill, BsFillVolumeUpFill } from 'react-icons/bs';
import { RiPlayList2Fill } from 'react-icons/ri';
import { BiFullscreen } from 'react-icons/bi';
import { MdOutlineLyrics } from 'react-icons/md';
import { TbDevices } from 'react-icons/tb';


interface StyledType {
  isTopActive: boolean
}
interface BarStyledType {
  isPlayBar: number
  playBarPosition: number
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
  align-items: center;
`

const Btn = styled.button`
  background-color: transparent;
  border:none;
  cursor: pointer;
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
  const [volume, setVolume] = useState('max')

  return (
    <Container>
      <Btn title='가사'><MdOutlineLyrics size='20' className={'svgIcon'}/></Btn>
      <Btn title='플레이리스트'><RiPlayList2Fill size='20' className={'svgIcon'}/></Btn>
      <Btn title='다른기기와 연결'><TbDevices size='20' className={'svgIcon'}/></Btn>
      <VolumeBox className='playerBarBox'>
        <Btn title='볼륨' onClick={() => {
          if(volume === 'muted'){setVolume('slince')}
          if(volume === 'slince'){setVolume('max')}
          if(volume === 'max'){setVolume('muted')}
        }}>
          {volume === 'max' && <BsFillVolumeUpFill size='20' className={'svgIcon'}/>}
          {volume === 'slince' && <BsFillVolumeDownFill size='20' className={'svgIcon'}/>}
          {volume === 'muted' && <BsFillVolumeOffFill size='20' className={'svgIcon'}/>}
        </Btn>
        {/* <Btn title='볼륨'>
          <RiVolumeUpFill size='20' color={mouseHover}/>
          <RiVolumeDownFill size='20' color={mouseHover}/>
          <RiVolumeMuteFill size='20' color={mouseHover}/>
        </Btn> */}
        <Barbox>
          <VolumeBar></VolumeBar>
        </Barbox>
      </VolumeBox>
      <Btn title='전체화면'><BiFullscreen size='20' className={'svgIcon'}/></Btn>
    </Container>
  );
}
