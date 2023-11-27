import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../types/Type";

import { volumeControl, setVolume } from "../../../../slices/PlayState";

import { BsFillVolumeDownFill, BsFillVolumeOffFill, BsFillVolumeUpFill } from 'react-icons/bs';
import Button from "./common/Button";

export default function VolumeButton({ player, volumeData, onClickVolumeChange }) {
  const dispatch = useDispatch();
  const VolumeRange = useSelector((state: RootState) => state.playState.VolumeRange);


  useEffect(() => {
    if(!volumeData) return;
    dispatch(setVolume(volumeData))
  }, [volumeData])

  const volumehandler = (e) => {
    console.log(VolumeRange);

    player.setVolume(VolumeRange / 100);
    dispatch(volumeControl(VolumeRange));
    onClickVolumeChange(String(VolumeRange))
  }

  return (
    <>
      <Button title='볼륨' onClick={(e) => { volumehandler(e) }}>
        {VolumeRange > 61 && VolumeRange <= 100 && <BsFillVolumeUpFill size='20' className={'svgIcon'}/>}
        {VolumeRange > 1 && VolumeRange <= 60 && <BsFillVolumeDownFill size='20' className={'svgIcon'}/>}
        {VolumeRange < 1 && <BsFillVolumeOffFill size='20' className={'svgIcon'}/>}
      </Button>
    </>
  );
}
