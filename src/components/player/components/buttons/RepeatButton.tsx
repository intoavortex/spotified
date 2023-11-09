import { useState } from 'react';

import { TbRepeatOnce, TbRepeat } from 'react-icons/tb';
import Button from "./common/Button";

export default function RepeatButton() {

  const [repeat, setRepeat] = useState('off')

  return (
    <>
      <Button title='반복' onClick={() => {
          repeat === 'off' && setRepeat('repeat')
          repeat === 'repeat' && setRepeat('one')
          repeat === 'one' && setRepeat('off')
        }}>
        {repeat === 'off' && <TbRepeat size='22' className={'svgStrokeIcon'}/>}
        {repeat === 'repeat' && <TbRepeat size='22' color='#feac00'/>}
        {repeat === 'one' && <TbRepeatOnce size='22' color='#feac00'/>}
      </Button>
    </>
  );
}
