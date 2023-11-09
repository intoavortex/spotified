import { useState } from 'react';

import { HiPlay, HiPause } from 'react-icons/hi';
import Button from "./common/Button";

export default function PlayButton() {

  const [isPlay, setIsPlay] = useState<boolean>(false);

  return (
    <>
      <Button title='재생/일시정지' id="playerBtn">
        {isPlay === false ?
          <HiPlay size='40' color='#fff'/> :
          <HiPause size='40' color='#fff'/>
        }
      </Button>
    </>
  );
}
