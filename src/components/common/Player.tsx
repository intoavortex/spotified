import { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import PlayInfo from '../player/layout/PlayInfo'
import TrackBar from '../player/layout/TrackBar'
import PlayControl from '../player/layout/PlayControl'

import getTokenApi from '../../js/api/getToken';

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

const track = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}

export default function Player(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [sdkPlayer, setSdkPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {

          const player = new window.Spotify.Player({
              name: 'Web Playback SDK',
              getOAuthToken: cb => { cb(props.token); },
              volume: 0.5
          });

          setSdkPlayer(player);

          player.addListener('ready', ({ device_id }) => {
              console.log('Ready with Device ID', device_id);
          });

          player.addListener('not_ready', ({ device_id }) => {
              console.log('Device ID has gone offline', device_id);
          });

          player.connect();

      };
  }, []);

  return (
    <Container>
      <PlayInfo />
      <TrackBar />
      <PlayControl />
    </Container>
  );
}
