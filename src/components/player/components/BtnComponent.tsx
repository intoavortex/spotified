import { useState } from 'react';
import styled from 'styled-components';

import { TbRepeatOnce, TbRepeat } from 'react-icons/tb';
import { AiFillStepForward, AiFillStepBackward } from 'react-icons/ai';
import { IoMdShuffle } from 'react-icons/io';
import { HiPlay, HiPause } from 'react-icons/hi';

const Btn = styled.button`
  background-color: transparent;
  border:none;
  cursor: pointer;
`

export default function RepeatBtn({btnFnc}) {
  // 반복재생
  const [repeat, setRepeat] = useState('off')
  // 셔플재생
  const [shuffle, setShuffle] = useState(false)
  const [isPlay, setIsPlay] = useState<boolean>(false);

  // TODO: 버튼들을 이런 식으로 관리하는 게 옳은 건지 고민해볼 필요가 있음 -> 안 될 건 없지만 굳이?

  return (
    <>
      {/* 재생 일시정지 */}
      { btnFnc === 'playTrack' &&
        <Btn title='재생/일시정지' id="playerBtn">
          {isPlay === false ?
            <HiPlay size='40' color='#fff'/> :
            <HiPause size='40' color='#fff'/>
          }
        </Btn>
      }

      {/* 반복 */}
      {btnFnc === 'repeatTrack' &&
        <Btn title='반복' onClick={() => {
          repeat === 'off' && setRepeat('repeat')
          repeat === 'repeat' && setRepeat('one')
          repeat === 'one' && setRepeat('off')
        }}>
          {repeat === 'off' && <TbRepeat size='22' className={'svgStrokeIcon'}/>}
          {repeat === 'repeat' && <TbRepeat size='22' color='#feac00'/>}
          {repeat === 'one' && <TbRepeatOnce size='22' color='#feac00'/>}
        </Btn>
      }

      {/* 무작위 */}
      { btnFnc === 'shuffleTrack' &&
        <Btn title='무작위' onClick={() => shuffle === false? setShuffle(true) : setShuffle(false)}>
          { shuffle === true ? <IoMdShuffle size='22' color='#feac00'/> : <IoMdShuffle size='22' className={'svgIcon'}/> }
        </Btn>
      }

      {/* 이전 트랙 */}
      { btnFnc === 'backwardTrack' &&
        <Btn title='이전곡'><AiFillStepBackward size='22' className={'svgIcon'}/></Btn>
      }

      {/* 다음 트랙 */}
      { btnFnc === 'fowardTrack' &&
        <Btn title='다음곡' onClick={() => { console.log('foward') }}><AiFillStepForward size='22' className={'svgIcon'}/></Btn>
      }

    </>
  );
}
