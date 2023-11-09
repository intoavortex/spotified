import { useState } from 'react';

import { IoMdShuffle } from 'react-icons/io';
import Button from "./common/Button";

export default function ShuffleButton() {

  const [shuffle, setShuffle] = useState(false)

  return (
    <>
      <Button title='무작위' onClick={() => shuffle === false? setShuffle(true) : setShuffle(false)}>
        { shuffle === true ? <IoMdShuffle size='22' color='#feac00'/> : <IoMdShuffle size='22' className={'svgIcon'}/> }
      </Button>
    </>
  );
}
