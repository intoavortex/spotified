import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart, AiFillStepForward, AiFillStepBackward } from 'react-icons/ai';
import { BsPip, BsFillVolumeDownFill, BsFillVolumeOffFill, BsFillVolumeUpFill } from 'react-icons/bs';
import { RiPlayList2Fill } from 'react-icons/ri';
// import { RiVolumeUpFill, RiPlayList2Fill } from 'react-icons/ri';
import { BiFullscreen } from 'react-icons/bi';
import { IoMdShuffle } from 'react-icons/io';
import { MdOutlineLyrics } from 'react-icons/md';
// import { HiPlay, HiPause } from 'react-icons/hi';
import { HiPlay } from 'react-icons/hi';
// import { TbRepeatOff, TbRepeatOnce, TbRepeat, TbDevices } from 'react-icons/tb';
import { TbRepeatOnce, TbRepeat, TbDevices } from 'react-icons/tb';
import { useState } from 'react';


const Container = styled.div`
  overflow:hidden;
  width:100%;
  height:90px;
  background-color:#181818;
  border-top:1px solid #282828;
  box-sizing: border-box;
  color:#fff;

  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:space-between;
  align-items:center;
  padding:0 16px;

  > div{
    width:calc(100% / 3);
  }
`

const NowPlaying = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
`

const TitleBox = styled.div`
  margin-right: 14px;
  text-align: left;
`

const Title = styled.span`
  display: block;
  max-width:380px;
  font-size: 14px;
  line-height:22px;
  text-align: left;
  color:#fff;
`

const Artist = styled.span`
  display: block;
  max-width:380px;
  font-size: 11px;
  line-height: 18px;
  text-align: left;
  color:#B3B3B3;
`

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const LikeBtn = styled.button`
  height:40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color:transparent;
  border:none;
`

const Btn = styled.button`
  background-color: transparent;
  border:none;
`

function Player() {

  // 좋아요
  const [likes, setLikes] = useState(false)
  // 셔플재생
  const [shuffle, setShuffle] = useState(false)
  // 반복재생
  const [repeat, setRepeat] = useState('off')
  // 볼륨 조절
  const [volume, setVolume] = useState('max')

  return (
    <Container>
      {/* 여기 나중에 컴포넌트로 각각 분리함 */}
      <NowPlaying>
        <TitleBox>
          <Title>PretenderPretenderPretenderPretenderPretenderPretender</Title>
          <Artist>OFFICIAL HIGE DANDISM</Artist>
        </TitleBox>
        <BtnBox>
          <LikeBtn onClick={() => likes === false? setLikes(true) : setLikes(false)}>
            { likes === true ? <AiFillHeart size='20' color='#1ed760'/> : <AiOutlineHeart size='20' color='white'/> }
          </LikeBtn>
          <LikeBtn><BsPip size='20' color='white'/></LikeBtn>
        </BtnBox>
      </NowPlaying>

      {/* 여기 나중에 컴포넌트로 각각 분리함 */}
      <div>
        <BtnBox>
          <Btn title='무작위' onClick={() => shuffle === false? setShuffle(true) : setShuffle(false)}>
            { shuffle === true ? <IoMdShuffle size='22' color='#1ed760'/> : <IoMdShuffle size='22' color='white'/> }
          </Btn>
          <Btn title='이전곡'><AiFillStepBackward size='22' color='white'/></Btn>
          <Btn title='재생/일시정지'>
            <HiPlay size='38' color='white'/>
            {/* <HiPause size='38' color='white'/> */}
          </Btn>
          <Btn title='다음곡'><AiFillStepForward size='22' color='white'/></Btn>

          <Btn title='반복' onClick={() => {
            if(repeat === 'off'){setRepeat('repeat')}
            if(repeat === 'repeat'){setRepeat('one')}
            if(repeat === 'one'){setRepeat('off')}
          }}>
            {repeat === 'off' && <TbRepeat size='22' color='#fff'/>}
            {repeat === 'repeat' && <TbRepeat size='22' color='#1ed760'/>}
            {repeat === 'one' && <TbRepeatOnce size='22' color='#1ed760'/>}
          </Btn>
        </BtnBox>
        <div>
          <span>0:00</span>
          <div>
            <div>재생바</div>
          </div>
          <span>5:26</span>
        </div>
      </div>
      
      {/* 여기 나중에 컴포넌트로 각각 분리함 */}
      <div>
        <Btn title='가사'><MdOutlineLyrics size='22' color='white'/></Btn>
        <Btn title='플레이리스트'><RiPlayList2Fill size='22' color='white'/></Btn>
        <Btn title='다른기기와 연결'><TbDevices size='22' color='white'/></Btn>
        <div>
          <Btn title='볼륨' onClick={() => {
            if(volume === 'muted'){setVolume('slince')}
            if(volume === 'slince'){setVolume('max')}
            if(volume === 'max'){setVolume('muted')}
          }}>
            {volume === 'max' && <BsFillVolumeUpFill size='22' color='#fff'/>}
            {volume === 'slince' && <BsFillVolumeDownFill size='22' color='#fff'/>}
            {volume === 'muted' && <BsFillVolumeOffFill size='22' color='#fff'/>}
          </Btn>
          {/* <Btn title='볼륨'>
            <RiVolumeUpFill size='22' color='white'/>
            <RiVolumeDownFill size='22' color='white'/>
            <RiVolumeMuteFill size='22' color='white'/>
          </Btn> */}
          <div>음량조절바</div>
        </div>
        <Btn title='전체화면'><BiFullscreen size='22' color='white'/></Btn>
      </div>
    </Container>
  );
}

export default Player;
