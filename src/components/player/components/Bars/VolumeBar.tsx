import { useEffect, useState } from "react";
import Bar from "./common/Bar";

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../types/Type";

import { volumeControl, setVolume } from "../../../../slices/PlayState";

export default function VolumeBar({ player, onVolumeChange, clickVolumeData }) {
  const dispatch = useDispatch();
  const VolumeRange = useSelector((state: RootState) => state.playState.VolumeRange);

  // useEffect(() => {
  //   if (!player) return;
  //   player.setVolume(VolumeRange / 100);
  // }, [VolumeRange])

  /**
   * 실행 순서 명확히
   *
   */

  useEffect(() => {
    if (!clickVolumeData) return;
    player.setVolume(parseInt(clickVolumeData) / 100);

    const volumeBarValue = document.getElementById('volumeBarRange') as HTMLInputElement
    volumeBarValue.value = String(VolumeRange)
  }, [clickVolumeData])

  const volumeHandler = (e) => {
    e.preventDefault();
    player.setVolume(e.target.value / 100);
    dispatch(volumeControl(e.target.value))
    const volumeChangeData = e.target.value;
    onVolumeChange(volumeChangeData)
  }

  return (
    <>
      <Bar id="volumeBarRange" minValue={0} maxValue={100} onMouseUp={(e) => { volumeHandler(e)
       }} defaultValue={100}/>
    </>
  );
}
