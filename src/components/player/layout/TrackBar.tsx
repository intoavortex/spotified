import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../types/Type";

import playTrackInfo from "../../../js/api/PlayTrackInfo";
import { NowPlayChange } from "../../../slices/PlayState";

import PlayBar from "../components/Bars/PlayBar";
import ShuffleButton from "../components/buttons/ShuffleButton";
import BackwardButton from "../components/buttons/BackwardButton";
import FowardButton from "../components/buttons/FowardButton";
import PlayButton from "../components/buttons/PlayButton";
import RepeatButton from "../components/buttons/RepeatButton";

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



export default function TrackBar({ player, token }) {
  const dispatch = useDispatch();
  const isPause = useSelector((state: RootState) => state.playState.IsPause);
  const duration = useSelector((state: RootState) => state.playState.Duration);
  const nowPlayPosition = useSelector((state: RootState) => state.playState.NowPlayPosition);

  const [durationText, setDurationText] = useState({min:0, sec:0})
  const [nowPlayPositionText, setNowPlayPositionText] = useState({min:0, sec:0})

  useEffect(() => {
    setDurationText({
      min: Math.floor((duration / 1000) / 60),
      sec: Math.floor((duration / 1000) % 60)
    })

    setNowPlayPositionText({
      min: Math.floor((nowPlayPosition / 1000) / 60),
      sec: Math.floor((nowPlayPosition / 1000) % 60)
    })
  }, [duration, nowPlayPosition])

  useEffect(() => {
    if (!player) return;

    function playTimeText() {

      player.getCurrentState().then(state => {
        dispatch(NowPlayChange(state));
      })
    }

    let interval;
    if(!isPause){
      interval = setInterval(playTimeText, 700);
      return () => {
          clearInterval(interval);
      }
    }else if(isPause){
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [isPause, nowPlayPosition, NowPlayChange])

  return (
    <div>
      <BtnBox>
        {/* 무작위 재생 */}
        <ShuffleButton />
        {/* 이전 트랙 재생 */}
        <BackwardButton />
        {/* 재생 일시정지 */}
        <PlayButton player={player}/>
        {/* 다음 트랙 재생 */}
        <FowardButton />
        {/* 반복 */}
        <RepeatButton />
      </BtnBox>

      <PlayerBar>
        {/* '그' 녀석 */}
        {/* <PlayTime>{nowPlayPosition}</PlayTime> */}
        <PlayTime>{nowPlayPositionText.min}:{nowPlayPositionText.sec < 10? '0' + nowPlayPositionText.sec : nowPlayPositionText.sec}</PlayTime>
        <PlayBar player={player}/>
        {/* <PlayTime>{duration}</PlayTime> */}
        <PlayTime>{durationText.min}:{durationText.sec < 10? '0' + durationText.sec : durationText.sec}</PlayTime>
      </PlayerBar>
    </div>
  );
}
