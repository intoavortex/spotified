import { useState } from 'react';

import { BsFillVolumeDownFill, BsFillVolumeOffFill, BsFillVolumeUpFill } from 'react-icons/bs';
import Button from "./common/Button";

export default function VolumeButton() {

  const [volume, setVolume] = useState('max')

  return (
    <>
      <Button title='볼륨' onClick={() => {
          if(volume === 'muted'){setVolume('slince')}
          if(volume === 'slince'){setVolume('max')}
          if(volume === 'max'){setVolume('muted')}
        }}>
        {volume === 'max' && <BsFillVolumeUpFill size='20' className={'svgIcon'}/>}
        {volume === 'slince' && <BsFillVolumeDownFill size='20' className={'svgIcon'}/>}
        {volume === 'muted' && <BsFillVolumeOffFill size='20' className={'svgIcon'}/>}
      </Button>
    </>
  );
}
