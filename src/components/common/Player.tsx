import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../reducer/index";
import { SDKREADY } from "../../slices/SdkReady";
import styled from 'styled-components';
import axios from 'axios';

import PlayInfo from '../player/layout/PlayInfo'
import TrackBar from '../player/layout/TrackBar'
import PlayControl from '../player/layout/PlayControl'

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

const Player = (props) => {
  const isSdkReady =useSelector( (state: RootState) => state.SdkReady.isSdkReady)

  const dispatch = useDispatch();
  const [sdkPlayer, setSdkPlayer] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      dispatch(SDKREADY())
    };
  }, []);

  const initPlayer = async () => {
    if (!isSdkReady) {
      return null;
    }

    try {
      const token = await props.token;

      const player = new window.Spotify.Player({
        name: 'zei Spotify Web SDK',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 1,
      });
      setSdkPlayer(player);

      console.log('ready')
      /**
       * promise는 state에 담지 말기
       */
    } catch (error) {
      console.error('Error initializing player:', error);
    }
  };

  useEffect(() => {
    initPlayer();
  }, [isSdkReady, props.token]);

  return (
    <Container>
      <PlayInfo />
      <TrackBar />
      <PlayControl sdkPlayer={sdkPlayer} />
    </Container>
  );
}

export default Player;
