import { useState, useEffect } from "react";
import Bar from "./common/Bar";

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../types/Type";

import { NowPlayChange } from "../../../../slices/PlayState";

export default function PlayBar({ player }) {
  const dispatch = useDispatch();
  const isPause = useSelector((state: RootState) => state.playState.IsPause);
  const duration = useSelector((state: RootState) => state.playState.Duration);
  const nowPlayPosition = useSelector((state: RootState) => state.playState.NowPlayPosition);

  const durationSeekHandler = (e) => {
    e.preventDefault();
    player.seek(parseInt(e.target.value)).then(() => {
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
    });
  }

  return (
    <>
      <Bar minValue={0} maxValue={duration} onMouseUp={(e) => { durationSeekHandler(e)}} defaultValue={nowPlayPosition}/>
    </>
  );
}
