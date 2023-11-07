import { useState } from 'react';
import styled from 'styled-components';

import BarComponent from "../components/BarComponent";
import BtnComponent from "../components/BtnComponent";

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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



export default function TrackBar() {
  // 트랙 시간(텍스트)
  const [duration, setDuration] = useState<{min:number, sec:number}>({min:0, sec:0});
  // 현재 트랙 시간(텍스트)
  const [playTime, setPlayTime] = useState<{min:number, sec:number}>({min:0, sec:0});

  return (
    <div>
      <BtnBox>
        {/* 무작위 재생 */}
        <BtnComponent btnFnc={'shuffleTrack'}/>
        {/* 이전 트랙 재생 */}
        <BtnComponent btnFnc={'backwardTrack'}/>
        {/* 재생 일시정지 */}
        <BtnComponent btnFnc={'playTrack'}/>
        {/* 다음 트랙 재생 */}
        <BtnComponent btnFnc={'fowardTrack'}/>
        {/* 반복 */}
        <BtnComponent btnFnc={'repeatTrack'}/>
      </BtnBox>

      <PlayerBar>
        {/* '그' 녀석 */}
        <PlayTime>{playTime.min}:{playTime.sec < 10? '0' + playTime.sec : playTime.sec}</PlayTime>
        <BarComponent />
        <PlayTime>{duration.min}:{duration.sec < 10? '0' + duration.sec : duration.sec}</PlayTime>
      </PlayerBar>
    </div>
  );
}
