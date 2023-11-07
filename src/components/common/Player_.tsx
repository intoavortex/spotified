import { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { AiFillHeart, AiOutlineHeart, AiFillStepForward, AiFillStepBackward } from 'react-icons/ai';
import { BsPip, BsFillVolumeDownFill, BsFillVolumeOffFill, BsFillVolumeUpFill } from 'react-icons/bs';
import { RiPlayList2Fill } from 'react-icons/ri';
import { BiFullscreen } from 'react-icons/bi';
import { IoMdShuffle } from 'react-icons/io';
import { MdOutlineLyrics, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { HiPlay, HiPause } from 'react-icons/hi';
import { TbRepeatOnce, TbRepeat, TbDevices } from 'react-icons/tb';

import getTokenApi from '../../js/api/getToken';

interface StyledType {
  isTopActive: boolean
}
interface BarStyledType {
  isPlayBar: number
  playBarPosition: number
}

const Container = styled.div`
  position:relative;
  /* overflow:hidden; */
  width:100%;
  height:90px;
  background-color:#181818;
  border-top:1px solid #282828;
  box-sizing: border-box;
  color:#fff;
  z-index:10;

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
    /* margin-top:-4px; */
  }

  button .svgIcon{
    transition: all .3s ease;
    fill:hsla(0,0%,100%,.7);
  }
  button:hover .svgIcon{
    fill:#fff;
  }
  button .svgStrokeIcon{
    transition: all .3s ease;
    stroke:hsla(0,0%,100%,.7);
  }
  button:hover .svgStrokeIcon{
    stroke:#fff;
  }

  .playerBarBox:hover a,
  .playerBarBox:hover .svgIcon{
    transition: all .13s ease;
  }
  .playerBarBox:hover a{
    /* background-color:#1ed760; */
    background-color:#feac00;
  }
  .playerBarBox:hover .svgIcon{
    fill:#fff;
  }

  .playerBarBox:hover > div > div{
    opacity:1;
    transition: all .13s ease;
  }
`

const NowPlaying = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
`

const TitleBox = styled.div`
  transition:all .3s ease;
  margin-left: 14px;
  margin-right: 14px;
  text-align: left;
`

const Title = styled.span`
  display: block;
  max-width:310px;
  font-size: 14px;
  line-height:22px;
  text-align: left;
  color:#fff;
`

const Artist = styled.span`
  display: block;
  max-width:310px;
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
  cursor: pointer;
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
  position: relative;
  width:100%;
  max-width:608px;
  /* height:4px; */
  /* padding:10px 0; */
`

const Barbox = styled.div`
  width:100%;
  max-width:608px;
  height:4px;
  background-color:hsla(0,0%,100%,.3);
  border-radius: 2px;
  overflow:hidden;
`

const PlayBar = styled.input`
  width:100%;
  background-color: transparent;
  /* accent-color: #00fd0a; */
  accent-color: #feac00;
  margin:0;
  position: relative;
  z-index: 2;

  &::-webkit-slider-runnable-track {
    width: 100%; height: 5px;
    /* padding:4px 0; */
    margin:0;
    cursor: pointer;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;  */
    background-color:hsla(0,0%,100%,.3);;
    border-radius: 6px;
    border: none;
    overflow:hidden;
    box-sizing: border-box;
  }

  &::-webkit-slider-thumb{
    width:5px;
    height:5px;
    border-radius: 3px;
    background-color: #fff;
    position:relative;
    /* top:-4px; */
    opacity: 1;
    /* z-index:2; */
    /* border: 4px solid #f00; */
    border:none;

    /* background:#fff url('//image.gsshop.com/ui/gsshop/cust/images/bg_size_slider.png') no-repeat 50% 50%;
    background-size:14px auto;
    border-radius:14px; */
    /* box-shadow:0 2px 4px 0 rgba(158, 121, 121, 0.82); */
    box-shadow: -704px 0 0 700px #fff;
    -webkit-appearance:none;
    transition: all .3s ease;
  }

  &::-moz-range-thumb{
    -webkit-appearance: none;
    width:100%;
    height:100%;
    background: #fff;
    border: none;
    border-radius:50%;
    cursor: pointer;
  }

  &:hover::-webkit-slider-thumb{
    background-color:#feac00;
    box-shadow: -703px 0 0 700px #feac00;
  }
`

const VolumeBar = styled.a`
  display:block;
  width:  40%;
  // isPlayBar
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

let TopAlbumCover = styled.div<StyledType>`
  width: 400px;
  position: absolute;
  left:${(props) => (props.isTopActive === true ? '-400px' : '0')};
  bottom:90px;
  z-index:1;
  transition:all .3s ease;

  img{width:100%;}
`
let LeftAlbumCover = styled.div<StyledType>`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  overflow: hidden;
  position:${(props) => (props.isTopActive === true ? 'relative' : 'absolute')};
  left:${(props) => (props.isTopActive === true ? '0' : '-400px')};
  bottom: 0;
  z-index:1;
  transition:all .3s ease;
  cursor: pointer;

  img{width:100%;}
  &:hover a{
    opacity: 1;
  }
`

const TopCoverBtn = styled.div<StyledType>`
  position: absolute;
  right:0;
  top:0;
  width:30px; height:30px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-right:10px;
  margin-top:10px;
  border:none;
  border-radius: 50%;
  background-color: black;
  opacity: 0.5;
  cursor: pointer;
  transition:all .3s ease;

  &:hover{
    opacity: 1;
  }
`

const LeftCoverBtn = styled.div<StyledType>`
  position: absolute;
  right:0;
  top:0;
  width:24px; height:24px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-right:5px;
  margin-top:5px;
  border:none;
  border-radius: 50%;
  background-color: black;
  opacity: 0;
  cursor: pointer;
  transition:all .3s ease;

  &:hover{
    opacity: 1;
    width:26px; height:26px;
    margin-right:7px;
    margin-top:7px;
  }
`

export default function BottomPlayer() {
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

  const [spotPlayer, setSpotPlayer] = useState<any>(null);
  const [isCoverToggle, setIsCoverToggle] = useState<any>(false);

  const [trackName, setTrackName] = useState<string>('');
  const [albumCover, setAlbumCover] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');

  const [isSeeking, setIsSeeking] = useState<number>(0);
  // 밀리세컨 계산 전 전체 트랙 시간
  const [allDuration, setAllDuration] = useState<number>(0);
  // 밀리세컨 계산 전 현재 트랙 시간
  const [allPlayTime, setAllPlayTime] = useState<number>(0);
  const [seekCirclePos, setSeekCirclePos] = useState<number>(0);

  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isSdkReady, setIsSdkReady] = useState<boolean>(false);

  // 트랙 시간(텍스트)
  const [duration, setDuration] = useState<{min:number, sec:number}>({min:0, sec:0});
  // 현재 트랙 시간(텍스트)
  const [playTime, setPlayTime] = useState<{min:number, sec:number}>({min:0, sec:0});



  /* sdk 초기 셋팅 --------------------------------------*/
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      setIsSdkReady(true);
    }
  }, [])

  /* 토큰 또 가져옴 또큰임 걍 */
  async function getToken(){
    const getToken = await getTokenApi();
    return getToken.access_token;
  }

  // 트랙 정보
  const playTrackInfo = useCallback(async (device_id) => {
    try {
      const token = await getToken();
      const res = await axios.put('https://api.spotify.com/v1/me/player', {
        device_ids: [device_id],
        play: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (err) {
      alert(err);
    }
  }, []);

  /*
  async function PlayTrackInfo (device_id) {
    try {
      const token = await getToken();
      const res = await axios.put('https://api.spotify.com/v1/me/player', {
        device_ids: [device_id],
        play: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (err) {
      alert(err);
    }
  };
  */

  /* --------------------------------------------------*/


  // currentState 가져오기
  // async function curState (spotPlayer) {
  //   await spotPlayer.getCurrentState().then(state => {
  //     if(state !== null && state.paused === false){
  //       // console.log(state);

  //     }
  //   });
  // }


  useEffect(() => {
    const initPlayer = async () => {
      if (!isSdkReady) {
        return null;
      }

      const token = await getToken();

      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 1,
      });

    /* 플레이어 상태가 변경될 때마다 */
    player.addListener('player_state_changed', (state) => {
      if (!state) {
        return;
      }

      // console.log(state);
      state.paused === true? setIsPlay(false) : setIsPlay(true);

      setTrackName(state.track_window.current_track.name === null? '':state.track_window.current_track.name);
      setArtistName(state.track_window.current_track.artists[0].name === null? '':state.track_window.current_track.artists[0].name);
      setAlbumCover(state.track_window.current_track.album.images[2].url === null? '':state.track_window.current_track.album.images[2].url);
      setAllDuration(state.duration);
      setAllPlayTime(state.position);
      setDuration({
        min: Math.floor((state.duration / 1000) / 60),
        sec: Math.floor((state.duration / 1000) % 60)
      })

      setPlayTime({
        min: Math.floor((state.position / 1000) / 60),
        sec: Math.floor((state.position / 1000) % 60)
      })

    });

    /* 클릭 이벤트 */
    const playBtn = document.getElementById('playerBtn');
    playBtn.addEventListener('click', () => {
      player.togglePlay();
      // console.log(isPlay);
    });

      setSpotPlayer(player);
    }

    initPlayer();
  }, [isSdkReady]);

  useEffect(() => {
    if (!spotPlayer) {
      return;
    }

    spotPlayer.connect();

    spotPlayer.addListener('ready', ({ device_id }) => {
      playTrackInfo(device_id)
      // curState(spotPlayer);
      spotPlayer.getCurrentState().then(state => {
        if(state !== null && state.paused === false){
          console.log(state);
        }
      })
    });

    // TODO: 클릭했을 때
    // spotPlayer.seek().then(state => {
    //   console.log('ㅅㅂ');

    //   const DurationState = durationSeekHandler();
    //   console.log(DurationState);
    //   // console.log(isSeeking);
    //   setIsSeeking(DurationState);


    //   setAllPlayTime(DurationState)

    //   // console.log(state);
    //   // console.log('하하 머리 터져');
    //   // setDuration({
    //   //   min: Math.floor((isSeeking / 1000) / 60),
    //   //   sec: Math.floor((isSeeking / 1000) % 60)
    //   // })

    //   setPlayTime({
    //     min: Math.floor((DurationState / 1000) / 60),
    //     sec: Math.floor((DurationState / 1000) % 60)
    //   })


    // });

  }, [spotPlayer, playTrackInfo, isPlay, playTime]);


  useEffect(() => {
    if (!spotPlayer) {
      return;
    }
    // function playTimeText() {
    //   spotPlayer.getCurrentState().then(state => {
    //     setPlayTime({
    //       min: Math.floor((state.position / 1000) / 60),
    //       sec: Math.floor((state.position / 1000) % 60)
    //     })
    //     setAllPlayTime(state.position)
    //     // let playBarValue = document.getElementById('playBarRange') as HTMLInputElement
    //     // playBarValue.value = state.position

    //     // setIsBarWidth((state.position / state.duration) * 100)
    //   })
    // }

      // let interval;
      // if(isPlay){
      //   interval = setInterval(playTimeText, 1000);
      //   console.log(isPlay);
      //   return () => {
      //       clearInterval(interval);
      //   }
      // }else if(!isPlay){
      //   clearInterval(interval)
      //   console.log(isPlay);
      // }
      // return () => clearInterval(interval);
  }, [spotPlayer, isPlay]);


  let playBarValue = document.getElementById('playBarRange') as any // any???!?!? 멍청해서 죄송하다~~
  const durationSeekHandler = () => {
    console.log('test test');
    console.log(playBarValue.value);
    // setIsSeeking(playBarValue.value);
    return playBarValue.value
  }

  const CoverHandler = () => {
    isCoverToggle? setIsCoverToggle(false) : setIsCoverToggle(true);
  }

  // let posX = 0;
  // const window_W = window.innerWidth;
  // const player_bar = document.getElementById('playerBarBox');
  // const bar_circle = document.getElementById('barCircle');
  // const bar_w = player_bar?.getBoundingClientRect().width;
  // const minPosX = (window_W - bar_w) / 2;
  // const maxPosX = ((window_W - bar_w) / 2) + bar_w;
  // const originalX = bar_circle?.getBoundingClientRect().x;

  // const PlaySeekHandler = (e, type) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   posX = e.clientX;
  //   posX = (Math.min(Math.max(posX - minPosX, 0), bar_w) / bar_w) * 100 ;
  //   setSeekCirclePos(posX)
  //   // console.log(seekCirclePos);
  // }

  return (
    // <Container  onDragEnter={(event) => PlaySeekHandler(event, 'enter')}
    //             onDragOver={(event) => { return PlaySeekHandler(event, 'over')}}
    //             onDrop={(event) => PlaySeekHandler(event, 'drop')}
    //             onDragLeave={(event) => PlaySeekHandler(event, 'leave')}>
    <Container>
      {/* 여기 나중에 컴포넌트로 각각 분리함 */}
      <NowPlaying>
        <TopAlbumCover isTopActive={isCoverToggle}>
          <TopCoverBtn onClick={() => {CoverHandler()}} isTopActive={isCoverToggle}>
            <MdKeyboardArrowDown size='20'/>
          </TopCoverBtn>
          <img src={albumCover} alt=''/>
        </TopAlbumCover>
        <LeftAlbumCover isTopActive={isCoverToggle}>
          <LeftCoverBtn onClick={() => {CoverHandler()}} isTopActive={isCoverToggle}>
            <MdKeyboardArrowDown size='20'/>
          </LeftCoverBtn>
          <img src={albumCover} alt=''/>
        </LeftAlbumCover>
        <TitleBox>
          <Title>{trackName}</Title>
          <Artist>{artistName}</Artist>
        </TitleBox>
        <BtnBox>
          <LikeBtn onClick={() => likes === false? setLikes(true) : setLikes(false)}>
            { likes === true ? <AiFillHeart size='20' color='#feac00'/> : <AiOutlineHeart size='20' className={'svgIcon'}/> }
          </LikeBtn>
          <LikeBtn><BsPip size='20' className={'svgIcon'}/></LikeBtn>
        </BtnBox>
      </NowPlaying>

      {/* 여기 나중에 컴포넌트로 각각 분리함 */}
      <div>
        <BtnBox>
          <Btn title='무작위' onClick={() => shuffle === false? setShuffle(true) : setShuffle(false)}>
            { shuffle === true ? <IoMdShuffle size='22' color='#feac00'/> : <IoMdShuffle size='22' className={'svgIcon'}/> }
          </Btn>
          <Btn title='이전곡'><AiFillStepBackward size='22' className={'svgIcon'}/></Btn>
          <Btn title='재생/일시정지' id="playerBtn">
            {isPlay === false ?
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
            {repeat === 'off' && <TbRepeat size='22' className={'svgStrokeIcon'}/>}
            {repeat === 'repeat' && <TbRepeat size='22' color='#feac00'/>}
            {repeat === 'one' && <TbRepeatOnce size='22' color='#feac00'/>}
          </Btn>
        </BtnBox>
        <PlayerBar>
         <PlayTime>{playTime.min}:{playTime.sec < 10? '0' + playTime.sec : playTime.sec}</PlayTime>
          <BarOverBox className='playerBarBox' id='playerBarBox'>
            <PlayBar type="range" id="playBarRange" min={0} max={allDuration} defaultValue={allPlayTime} onMouseUp={() => durationSeekHandler()}/>
            {/* <Barbox> */}
              {/* <Bar barWidth={barWidth}></Bar> */}
              {/* <PlayBar playBarPosition={seekCirclePos} isPlayBar={isBarWidth} isSeekingState={isSeeking}></PlayBar>
              <BarCircle  id='barCircle'
                          draggable
                          playBarPosition={seekCirclePos}
                          isSeekingState={isSeeking}
                          isPlayBar={isBarWidth}
                          onClick={() => {isSeeking? setIsSeeking(true) : setIsSeeking(false);}}
              ></BarCircle> */}
            {/* </Barbox> */}
          </BarOverBox>
          <PlayTime>{duration.min}:{duration.sec < 10? '0' + duration.sec : duration.sec}</PlayTime>
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
            <VolumeBar></VolumeBar>
          </Barbox>
        </VolumeBox>
        <Btn title='전체화면'><BiFullscreen size='20' className={'svgIcon'}/></Btn>
      </BtnBoxRight>
    </Container>
  );
}
