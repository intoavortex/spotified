import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AiFillHeart, AiOutlineHeart, AiFillStepForward, AiFillStepBackward } from 'react-icons/ai';
import { BsPip, BsFillVolumeDownFill, BsFillVolumeOffFill, BsFillVolumeUpFill } from 'react-icons/bs';
import { RiPlayList2Fill } from 'react-icons/ri';
import { BiFullscreen } from 'react-icons/bi';
import { IoMdShuffle } from 'react-icons/io';
import { MdOutlineLyrics } from 'react-icons/md';
import { HiPlay, HiPause } from 'react-icons/hi';
import { TbRepeatOnce, TbRepeat, TbDevices } from 'react-icons/tb';

// import TrackInfo from '../../js/api/trackApi'
import { PlayTrackInfo, PauseTrackInfo } from '../../js/api/playPauseApi'
// import RecentlyTrackInfo from '../../js/api/recentlyPlay'
import getPlayState from '../../js/api/getPlayState';

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
    width: 100%;
    max-width: 528px;
  }

  > div:first-child + div{
    width:100%;
    max-width:704px;
    margin-top:-4px;
  }

  button .svgIcon{
    transition: all .3s ease;
    fill:hsla(0,0%,100%,.7);
  }
  button:hover .svgIcon{
    fill:#fff;
  }

  .playerBarBox:hover a,
  .playerBarBox:hover .svgIcon{
    transition: all .13s ease;
  }
  .playerBarBox:hover a{
    background-color:#1ed760;
  }
  .playerBarBox:hover .svgIcon{
    fill:#fff;
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
const BtnBoxRight = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
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

const PlayerBar = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:100%;
  margin-top:3px;
`

const PlayTime = styled.span`
  color: #a7a7a7;
  font-size: 11px;
  min-width: 40px;
`

const BarOverBox = styled.div`
  width:100%;
  max-width:608px;
  height:4px;
  padding:4px 0;
`

const Barbox = styled.div`
  width:100%;
  max-width:608px;
  height:4px;
  background-color:hsla(0,0%,100%,.3);
  border-radius: 2px;
  overflow:hidden;
`
// styled-components에서 사용할 변수 타입 지정해주기
const Bar = styled.a<any>`
  display:block;
  width:0;
  height:100%;
  border-radius: 2px;
  background-color: #fff;
  /* transform:translateX(-100%); */
`

const VolumeBox = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:100%;
  max-width:125px;
  margin-right:4px;
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
  // mouseOver
  // const [mouseHover, setMouseHover] = useState('hsla(0,0%,100%,.7)')

  const [playerState, setPlayerState] = useState<string>('');

  const [artistName, setArtistName] = useState<string>('');
  const [trackName, setTrackName] = useState<string>('');
  const [playTrack, setPlayTrack] = useState<string>('');
  const [playState, setPlayState] = useState<Boolean>(false);
  const [barState, setBarState] = useState<number>(0);

  
  useEffect(() => {
    
    // async function TrackApi(){
    //   const PlayerData = await TrackInfo('7zKieV1uXBhucwmYM4sCzW');
    //   setArtistName(PlayerData.artists[0].name);
    //   setTrackName(PlayerData.name);
    //   setPlayTrack(PlayerData.uri)
    //   // console.log(PlayerData)
    // }
    // TrackApi();

    // async function RecentlyTrackApi(){
    //   const RecentPlay = await RecentlyTrackInfo();
    //   // setArtistName(RecentPlay.artists[0].name);
    //   // setTrackName(RecentPlay.name);
    //   setPlayTrack(RecentPlay.items[0].track.href)
    //   // console.log(typeof RecentPlay.items[0].track.href)
    //   // console.log(RecentPlay)
    //   // console.log(RecentPlay.items[0].track.href);
      
    // }
    // RecentlyTrackApi();

    // TODO: Header.tsx에도 있음 하나로 통합시키는 게 맞음
    async function getPlayStateApi(){
      const playStateInfo = await getPlayState();
      const playChk = playStateInfo.is_playing;
      playChk === true? setPlayState(true) : setPlayState(false);

      console.log(playStateInfo);
      

      // setArtistName(playStateInfo.item.artists[0].name);
      setTrackName(playStateInfo.item.name);
      setPlayTrack(playStateInfo.item.album.uri)

    }
    getPlayStateApi();

    
  }, []);

  let barWidth:any = 0;
  async function getPlayStateApi(){
    const playStateInfo = await getPlayState();
    const duration = playStateInfo.item.duration_ms;
    const progress = playStateInfo.progress_ms;
    let all = progress / duration

    barWidth = all * 100;
    ;
  }
  
  setInterval(() => {
    getPlayStateApi();
    console.log(barWidth);
    // setBarState(barWidth)
  }, 1000)

  // useEffect(() => {
  //   console.log('test');
    
  // }, []);

  async function PlayTrackApi(){
    const playStateInfo = await getPlayState();
    const nowPlayState = playStateInfo.is_playing;
    if(nowPlayState === true) {
      if(playState === false){
        setPlayState(true);
        await PlayTrackInfo('spotify:album:2yoIDnfb9b819VS5hsh9MZ', playStateInfo.progress_ms, playStateInfo.item.track_number);
      }else{
        setPlayState(false);
        await PauseTrackInfo('spotify:album:2yoIDnfb9b819VS5hsh9MZ', playStateInfo.progress_ms, playStateInfo.item.track_number);
      }
    }else{
      if(playState === false){
        setPlayState(true);
        await PlayTrackInfo('spotify:album:2yoIDnfb9b819VS5hsh9MZ', playStateInfo.progress_ms, playStateInfo.item.track_number);
      }else{
        setPlayState(false);
        await PauseTrackInfo('spotify:album:2yoIDnfb9b819VS5hsh9MZ', playStateInfo.progress_ms, playStateInfo.item.track_number);
      }
    }
    
  }
  
  return (
    <Container>
      {/* 여기 나중에 컴포넌트로 각각 분리함 */}
      <NowPlaying>
        <TitleBox>
          <Title>{trackName}</Title>
          <Artist>{artistName}</Artist>
        </TitleBox>
        <BtnBox>
          <LikeBtn onClick={() => likes === false? setLikes(true) : setLikes(false)}>
            { likes === true ? <AiFillHeart size='20' color='#1ed760'/> : <AiOutlineHeart size='20' className={'svgIcon'}/> }
          </LikeBtn>
          <LikeBtn><BsPip size='20' className={'svgIcon'}/></LikeBtn>
        </BtnBox>
      </NowPlaying>

      {/* 여기 나중에 컴포넌트로 각각 분리함 */}
      <div>
        <BtnBox>
          <Btn title='무작위' onClick={() => shuffle === false? setShuffle(true) : setShuffle(false)}>
            { shuffle === true ? <IoMdShuffle size='22' color='#1ed760'/> : <IoMdShuffle size='22' className={'svgIcon'}/> }
          </Btn>
          <Btn title='이전곡'><AiFillStepBackward size='22' className={'svgIcon'}/></Btn>
          <Btn title='재생/일시정지' onClick={() => PlayTrackApi()}>
            {playState === false ? 
              <HiPlay size='40' color='#fff'/> :
              <HiPause size='40' color='#fff'/> 
            }
          </Btn>
          <Btn title='다음곡'><AiFillStepForward size='22' className={'svgIcon'}/></Btn>

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
        <PlayerBar>
          <PlayTime>0:00</PlayTime>
          <BarOverBox className='playerBarBox'>
            <Barbox>
              {/* <Bar barWidth={barWidth}></Bar> */}
              <Bar style={{width:barWidth + '%'}}></Bar>
            </Barbox>
          </BarOverBox>
          <PlayTime>5:26</PlayTime>
        </PlayerBar>
      </div>
      
      {/* 여기 나중에 컴포넌트로 각각 분리함 */}
      <BtnBoxRight>
        <Btn title='가사'><MdOutlineLyrics size='20' className={'svgIcon'}/></Btn>
        <Btn title='플레이리스트'><RiPlayList2Fill size='20' className={'svgIcon'}/></Btn>
        <Btn title='다른기기와 연결'><TbDevices size='20' className={'svgIcon'}/></Btn>
        <VolumeBox className='playerBarBox'>
          <Btn title='볼륨' onClick={() => {
            if(volume === 'muted'){setVolume('slince')}
            if(volume === 'slince'){setVolume('max')}
            if(volume === 'max'){setVolume('muted')}
          }}>
            {volume === 'max' && <BsFillVolumeUpFill size='20' className={'svgIcon'}/>}
            {volume === 'slince' && <BsFillVolumeDownFill size='20' className={'svgIcon'}/>}
            {volume === 'muted' && <BsFillVolumeOffFill size='20' className={'svgIcon'}/>}
          </Btn>
          {/* <Btn title='볼륨'>
            <RiVolumeUpFill size='20' color={mouseHover}/>
            <RiVolumeDownFill size='20' color={mouseHover}/>
            <RiVolumeMuteFill size='20' color={mouseHover}/>
          </Btn> */}
          <Barbox>
            <Bar></Bar>
          </Barbox>
        </VolumeBox>
        <Btn title='전체화면'><BiFullscreen size='20' className={'svgIcon'}/></Btn>
      </BtnBoxRight>
    </Container>
  );
}

export default Player;
