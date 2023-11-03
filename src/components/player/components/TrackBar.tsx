import { useState } from 'react';
import styled from 'styled-components';

import { AiFillStepForward, AiFillStepBackward } from 'react-icons/ai';
import { IoMdShuffle } from 'react-icons/io';
import { HiPlay, HiPause } from 'react-icons/hi';
import { TbRepeatOnce, TbRepeat } from 'react-icons/tb';

interface StyledType {
  isTopActive: boolean
}
interface BarStyledType {
  isPlayBar: number
  playBarPosition: number
}

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const Btn = styled.button`
  background-color: transparent;
  border:none;
  cursor: pointer;
`

const PlayerBar = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:100%;
  margin-top:3px;
`

const PlayTime = styled.span`
  color: #a7a7a7;
  font-size: 11px;
  min-width: 40px;
`

const BarOverBox = styled.div`
  position: relative;
  width:100%;
  max-width:608px;
  /* height:4px; */
  /* padding:10px 0; */
`

const PlayBar = styled.input`
  width:100%;
  background-color: transparent;
  /* accent-color: #00fd0a; */
  accent-color: #feac00;
  margin:0;
  position: relative;
  z-index: 2;

  &::-webkit-slider-runnable-track {
    width: 100%; height: 5px;
    /* padding:4px 0; */
    margin:0;
    cursor: pointer;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;  */
    background-color:hsla(0,0%,100%,.3);;
    border-radius: 6px;
    border: none;
    overflow:hidden;
    box-sizing: border-box;
  }

  &::-webkit-slider-thumb{
    width:5px;
    height:5px;
    border-radius: 3px;
    background-color: #fff;
    position:relative;
    /* top:-4px; */
    opacity: 1;
    /* z-index:2; */
    /* border: 4px solid #f00; */
    border:none;

    /* background:#fff url('//image.gsshop.com/ui/gsshop/cust/images/bg_size_slider.png') no-repeat 50% 50%;
    background-size:14px auto;
    border-radius:14px; */
    /* box-shadow:0 2px 4px 0 rgba(158, 121, 121, 0.82); */
    box-shadow: -704px 0 0 700px #fff;
    -webkit-appearance:none;
    transition: all .3s ease;
  }

  &::-moz-range-thumb{
    -webkit-appearance: none;
    width:100%;
    height:100%;
    background: #fff;
    border: none;
    border-radius:50%;
    cursor: pointer;
  }

  &:hover::-webkit-slider-thumb{
    background-color:#feac00;
    box-shadow: -703px 0 0 700px #feac00;
  }
`


export default function TrackBar() {
  // 셔플재생
  const [shuffle, setShuffle] = useState(false)
  // 반복재생
  const [repeat, setRepeat] = useState('off')
  const [isSeeking, setIsSeeking] = useState<number>(0);
  // 밀리세컨 계산 전 전체 트랙 시간
  const [allDuration, setAllDuration] = useState<number>(0);
  // 밀리세컨 계산 전 현재 트랙 시간
  const [allPlayTime, setAllPlayTime] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  // 트랙 시간(텍스트)
  const [duration, setDuration] = useState<{min:number, sec:number}>({min:0, sec:0});
  // 현재 트랙 시간(텍스트)
  const [playTime, setPlayTime] = useState<{min:number, sec:number}>({min:0, sec:0});

  let playBarValue = document.getElementById('playBarRange') as any // any???!?!? 멍청해서 죄송하다~~
  const durationSeekHandler = () => {
    return playBarValue.value
  }

  return (
    <div>
      <BtnBox>
        <Btn title='무작위' onClick={() => shuffle === false? setShuffle(true) : setShuffle(false)}>
          { shuffle === true ? <IoMdShuffle size='22' color='#feac00'/> : <IoMdShuffle size='22' className={'svgIcon'}/> }
        </Btn>
        <Btn title='이전곡'><AiFillStepBackward size='22' className={'svgIcon'}/></Btn>
        <Btn title='재생/일시정지' id="playerBtn">
          {isPlay === false ?
            <HiPlay size='40' color='#fff'/> :
            <HiPause size='40' color='#fff'/>
          }
        </Btn>
        <Btn title='다음곡'><AiFillStepForward size='22' className={'svgIcon'}/></Btn>

        <Btn title='반복' onClick={() => {
          if(repeat === 'off'){setRepeat('repeat')}
          if(repeat === 'repeat'){setRepeat('one')}
          if(repeat === 'one'){setRepeat('off')}
        }}>
          {repeat === 'off' && <TbRepeat size='22' className={'svgStrokeIcon'}/>}
          {repeat === 'repeat' && <TbRepeat size='22' color='#feac00'/>}
          {repeat === 'one' && <TbRepeatOnce size='22' color='#feac00'/>}
        </Btn>
      </BtnBox>
      <PlayerBar>
        <PlayTime>{playTime.min}:{playTime.sec < 10? '0' + playTime.sec : playTime.sec}</PlayTime>
        <BarOverBox className='playerBarBox' id='playerBarBox'>
          <PlayBar type="range" id="playBarRange" min={0} max={allDuration} defaultValue={allPlayTime} onMouseUp={() => durationSeekHandler()}/>
        </BarOverBox>
        <PlayTime>{duration.min}:{duration.sec < 10? '0' + duration.sec : duration.sec}</PlayTime>
      </PlayerBar>
    </div>
  );
}
