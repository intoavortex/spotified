import { useEffect, useState } from 'react';

import { HiPlay, HiPause } from 'react-icons/hi';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../types/Type";
import { PlayTrack } from "../../../../slices/PlayState";

import Button from "./common/Button";


export default function PlayButton({ player }) {
  const dispatch = useDispatch();
  const isPause = useSelector((state: RootState) => state.playState.IsPause);

  const PlayerHandler = (e) => {
    e.stopPropagation();
    player.togglePlay();
    isPause === true? dispatch(PlayTrack(false)) : dispatch(PlayTrack(true));
  }

  return (
    <>
      <Button title='재생/일시정지' id="playerBtn" onClick={PlayerHandler}>
        {isPause === true ?
          <HiPlay size='40' color='#fff'/> :
          <HiPause size='40' color='#fff'/>
        }
      </Button>
    </>
  );
}
