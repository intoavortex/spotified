import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
import getTokenApi from '../../js/api/getToken';

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
    /* margin-top:-4px; */
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
// styled-components에서 사용할 변수 타입 지정해주기
const Bar = styled.a<any>`
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

  const [artistName, setArtistName] = useState<string>('');
  const [trackName, setTrackName] = useState<string>('');
  const [playTrack, setPlayTrack] = useState<string>('');
  const [playState, setPlayState] = useState<Boolean>(false);
  const [active, setActive] = useState<Boolean>(false);
  const [duration, setDuration] = useState<{min:number, sec:number}>({min:0, sec:0});

  
  useEffect(() => {

    // TODO: Header.tsx에도 있음 하나로 통합시키는 게 맞음
    // 아 이게 아니억다다고고고...
    // async function getPlayStateApi(){
    //   const playStateInfo = await getPlayState();
    //   const playChk = playStateInfo.is_playing;
    //   playChk === true? setPlayState(true) : setPlayState(false);

    //   // console.log(playStateInfo);
    //   setTrackName(playStateInfo.item.name);
    //   setPlayTrack(playStateInfo.item.album.uri)

    // }
    // getPlayStateApi();
    
    
    /* 토큰 또 가져옴 또큰임 걍 */
    let tokenStr = '';
    let tokenBearerStr = '';
    
    async function getToken(){
      const getToken = await getTokenApi();
      tokenStr = getToken.access_token;
      tokenBearerStr = `Bearer ${getToken.access_token}`; 
    }
    getToken();
    
    /* sdk 초기 셋팅 */
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
  
    document.body.appendChild(script);
  
    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(tokenStr);
        },
        volume: 1,
      });

      // console.log(spotPlayer);

      spotPlayer.connect().then(success => {
        if (success) {
          // console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      })

      spotPlayer.addListener('ready', ({ device_id }) => {
        // axios.put('https://api.spotify.com/v1/me/player', 
        // {
        //   device_ids: [device_id],
        //   play: false,
        // },
        // {
        //   headers: {
        //     Authorization: tokenBearerStr,
        //   },
        // });
        /*
          위에 거 안 됐던 이유 => 또... 또 async.. 문제엿던 것이다 [킹!!!!!받음!!!!!]
        */
        (async function PlayTrackInfo (device_id) {
          try {
            const res = await axios.put('https://api.spotify.com/v1/me/player', {
              device_ids: [device_id],
              play: false,
            },
            {
              headers: {
                Authorization: tokenBearerStr,
              },
            });
            return res;
          } catch (err) {
            alert(err);
          }
        })(device_id);

        
        
        
      });
      
      spotPlayer.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }
        // console.log(state);
        state.paused === true? setPlayState(false) : setPlayState(true); 
        setTrackName(state.track_window.current_track.name);
        setArtistName(state.track_window.current_track.artists[0].name);
        // console.log(state);
        // console.log(state.position);
        // console.log(Math.floor((state.duration / 1000) % 60)); // 초
        // console.log(Math.floor((state.duration / 1000) / 60)); // 분
        setDuration({
          min: Math.floor((state.duration / 1000) / 60),
          sec: Math.floor((state.duration / 1000) % 60)
        })
        // console.log((state.position / 1000) % 60);
        
        // console.log(state.track_window.current_track.artists);
        // setPlayTrack(state.item.album.uri)
  
        // setTrack(state.track_window.current_track);
        // setPaused(state.paused);
        // setPosition(state.position);
        // setDuration(state.duration);
      
        // spotPlayer.getCurrentState().then((state) => {
        //   !state ? setActive(true) : setActive(false);
        // });
      });

      /* 클릭 이벤트 */
      const playBtn = document.getElementById('playerBtn');
      playBtn.addEventListener('click', (state) => {
        spotPlayer.togglePlay()
        // console.log(state);
      });


    }
  }, []);
  // console.log(typeof duration);
  

  // 스포티파이는 미쳑다 ..
  // async function getPlayStateApi(){
  //   const playStateInfo = await getPlayState();
  // }
  
  // setInterval(() => {
  //   getPlayStateApi();
  // }, 1000)

  // ㅋㅋㅋㅋㅋㅋ 이것도 아니엇던 ㅋㅋㅋㅋㅋㅋ 거ㅁ..?
  // async function PlayTrackApi(){
  //   const playStateInfo = await getPlayState();
  //   const nowPlayState = playStateInfo.is_playing;
  //   if(nowPlayState === true) {
  //     if(playState === false){
  //       setPlayState(true);
  //       await PlayTrackInfo('spotify:album:2yoIDnfb9b819VS5hsh9MZ', playStateInfo.progress_ms, playStateInfo.item.track_number);
  //     }else{
  //       setPlayState(false);
  //       await PauseTrackInfo('spotify:album:2yoIDnfb9b819VS5hsh9MZ', playStateInfo.progress_ms, playStateInfo.item.track_number);
  //     }
  //   }else{
  //     if(playState === false){
  //       setPlayState(true);
  //       await PlayTrackInfo('spotify:album:2yoIDnfb9b819VS5hsh9MZ', playStateInfo.progress_ms, playStateInfo.item.track_number);
  //     }else{
  //       setPlayState(false);
  //       await PauseTrackInfo('spotify:album:2yoIDnfb9b819VS5hsh9MZ', playStateInfo.progress_ms, playStateInfo.item.track_number);
  //     }
  //   }
    
  // }
  
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

export default Player;
