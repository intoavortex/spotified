import { useEffect, useState, useCallback } from 'react';
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
  width:100%;
  max-width:608px;
  height:4px;
  padding:10px 0;
`

const Barbox = styled.div`
  width:100%;
  max-width:608px;
  height:4px;
  background-color:hsla(0,0%,100%,.3);
  border-radius: 2px;
  overflow:hidden;
`
// 이놈임 이녀석이 '그' Bar임
const Bar = styled.a`
  display:block;
  width:30%;
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

  const [artistName, setArtistName] = useState<string>('');
  const [trackName, setTrackName] = useState<string>('');
  const [albumCover, setAlbumCover] = useState<string>('');
  const [albumCoverToggle, setAlbumCoverToggle] = useState<any>(false);
  const [playState, setPlayState] = useState<Boolean>(false);
  const [duration, setDuration] = useState<{min:number, sec:number}>({min:0, sec:0});
  const [playTime, setPlayTime] = useState<{min:number, sec:number}>({min:0, sec:0});
  const [isSdkReady, setIsSdkReady] = useState<boolean>(false);
  const [spotPlayer, setSpotPlayer] = useState<any>(null);


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
  async function curState (spotPlayer) {
    await spotPlayer.getCurrentState().then(state => {
      if(state !== null && state.paused === false){
        // console.log(state);

      }
    });
  }

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

    /* 플레이어 상태가 변경될 때마다 */
    spotPlayer.addListener('player_state_changed', (state) => {
      if (!state) {
        return;
      }
      // console.log(state);
      state.paused === true? setPlayState(false) : setPlayState(true); 

      setTrackName(state.track_window.current_track.name === null? '':state.track_window.current_track.name);
      setArtistName(state.track_window.current_track.artists[0].name === null? '':state.track_window.current_track.artists[0].name);
      setAlbumCover(state.track_window.current_track.album.images[2].url === null? '':state.track_window.current_track.album.images[2].url);
      setDuration({
        min: Math.floor((state.duration / 1000) / 60),
        sec: Math.floor((state.duration / 1000) % 60)
      })
      
      setPlayTime({
        min: Math.floor((state.position / 1000) / 60),
        sec: Math.floor((state.position / 1000) % 60)
      })

      spotPlayer.getCurrentState().then(state => {
        if(state !== null && state.paused === false){
          console.log(state);
        }
      })
    });

    /* 클릭 이벤트 */
    const playBtn = document.getElementById('playerBtn');
    playBtn.addEventListener('click', () => {
      spotPlayer.togglePlay();
    });


    
    
  }, [spotPlayer, playTrackInfo]);


  // useEffect(() => {
  //   // let positionState = curState();
  //   // setInterval(() => {
  //   //   setPlayTime({
  //   //     min: Math.floor((positionState.position / 1000) / 60),
  //   //     sec: Math.floor((positionState.position / 1000) % 60)
  //   //   })
  //   // }, 1000)
  // }, [playTime])


  
  const CoverHandler = () => {
    albumCoverToggle? setAlbumCoverToggle(false) : setAlbumCoverToggle(true);
  }

  return (
    <Container >
      {/* 여기 나중에 컴포넌트로 각각 분리함 */}
      <NowPlaying>
        <TopAlbumCover isTopActive={albumCoverToggle}>
          <TopCoverBtn onClick={() => {CoverHandler()}} isTopActive={albumCoverToggle}>
            <MdKeyboardArrowDown size='20'/>
          </TopCoverBtn>
          <img src={albumCover} alt=''/>
        </TopAlbumCover>
        <LeftAlbumCover isTopActive={albumCoverToggle}>
          <LeftCoverBtn onClick={() => {CoverHandler()}} isTopActive={albumCoverToggle}>
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
          <Btn title='재생/일시정지' id="playerBtn">
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
            {repeat === 'off' && <TbRepeat size='22' className={'svgStrokeIcon'}/>}
            {repeat === 'repeat' && <TbRepeat size='22' color='#1ed760'/>}
            {repeat === 'one' && <TbRepeatOnce size='22' color='#1ed760'/>}
          </Btn>
        </BtnBox>
        <PlayerBar>
          <PlayTime>{playTime.min}:{playTime.sec}</PlayTime>
          <BarOverBox className='playerBarBox'>
            <Barbox>
              {/* <Bar barWidth={barWidth}></Bar> */}
              <Bar></Bar>
            </Barbox>
          </BarOverBox>
          <PlayTime>{duration.min}:{duration.sec}</PlayTime>
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

