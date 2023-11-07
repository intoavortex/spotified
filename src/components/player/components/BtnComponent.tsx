import { useState } from 'react';
import styled from 'styled-components';

import { TbRepeatOnce, TbRepeat } from 'react-icons/tb';
import { AiFillStepForward, AiFillStepBackward } from 'react-icons/ai';
import { IoMdShuffle } from 'react-icons/io';
import { HiPlay, HiPause } from 'react-icons/hi';
import { BsFillVolumeDownFill, BsFillVolumeOffFill, BsFillVolumeUpFill } from 'react-icons/bs';
import { RiPlayList2Fill } from 'react-icons/ri';
import { BiFullscreen } from 'react-icons/bi';
import { MdOutlineLyrics } from 'react-icons/md';
import { TbDevices } from 'react-icons/tb';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPip } from 'react-icons/bs';

const Btn = styled.button`
  background-color: transparent;
  border:none;
  cursor: pointer;
`

const BtnH = styled.button`
  height:40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color:transparent;
  border:none;
`


export default function BtnComponent({ btnFnc }) {
  // 반복재생
  const [repeat, setRepeat] = useState('off')
  // 셔플재생
  const [shuffle, setShuffle] = useState(false)
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [volume, setVolume] = useState('max')
  const [likes, setLikes] = useState(false)

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
      {/* // TODO: 반복이랑 볼륨은 생긴 건 비슷하게 생겼는데 역할이 달라서 나눠야 하는가? * */}
      {/* 반복 */}
      { btnFnc === 'repeatTrack' &&
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

      {/* 볼륨 */}
      { btnFnc === 'volume' &&
        <Btn title='볼륨' onClick={() => {
          if(volume === 'muted'){setVolume('slince')}
          if(volume === 'slince'){setVolume('max')}
          if(volume === 'max'){setVolume('muted')}
        }}>
          {volume === 'max' && <BsFillVolumeUpFill size='20' className={'svgIcon'}/>}
          {volume === 'slince' && <BsFillVolumeDownFill size='20' className={'svgIcon'}/>}
          {volume === 'muted' && <BsFillVolumeOffFill size='20' className={'svgIcon'}/>}
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

      {/* 가사 보이기 */}
      { btnFnc === 'lyrics' &&
        <Btn title='가사'><MdOutlineLyrics size='20' className={'svgIcon'}/></Btn>
      }

      {/* 플레이리스트 */}
      { btnFnc === 'playList' &&
        <Btn title='플레이리스트'><RiPlayList2Fill size='20' className={'svgIcon'}/></Btn>
      }

      {/* 다른 기기와 연결 */}
      { btnFnc === 'deviceConnect' &&
        <Btn title='다른기기와 연결'><TbDevices size='20' className={'svgIcon'}/></Btn>
      }

      {/* 전체화면 */}
      { btnFnc === 'fullscreen' &&
        <Btn title='전체화면'><BiFullscreen size='20' className={'svgIcon'}/></Btn>
      }

      {/* 좋아요 */}
      { btnFnc === 'likes' &&
        <BtnH onClick={() => likes === false? setLikes(true) : setLikes(false)}>
          { likes === true ? <AiFillHeart size='20' color='#feac00'/> : <AiOutlineHeart size='20' className={'svgIcon'}/> }
        </BtnH>
      }

      {/* PIP */}
      { btnFnc === 'pip' &&
        <BtnH><BsPip size='20' className={'svgIcon'}/></BtnH>
      }
    </>
  );
}
