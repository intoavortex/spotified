import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../types/Type";
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
  flex-wrap:nowrap;
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
  const isSdkReady = useSelector((state: RootState) => state.SdkReady.isSdkReady);
  const dispatch = useDispatch();
  const [sdkPlayer, setSdkPlayer] = useState(null);

  const playTrackInfo = useCallback(async (device_id) => {
    try {
      const res = await axios.put('https://api.spotify.com/v1/me/player', {
        device_ids: [device_id],
        play: false,
      },
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      return res;
    } catch (err) {
      alert(err);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      dispatch(SDKREADY(true));
    };
  }, []);

  const initPlayer = async () => {
    try {
      if (!props.token) {
        console.error('Token is undefined.');
        return;
      }

      const player = new window.Spotify.Player({
        name: 'zei Web Player',
        getOAuthToken: cb => { cb(props.token); },
        volume: 0.2
      });

      setSdkPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        playTrackInfo(device_id)

        player.getCurrentState().then( state => {
          if (!state) {
            console.error('User is not playing music through the Web Playback SDK');
            return;
          }

          console.log('❤️‍🔥 current', state);

        });
      });

      player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      })
    } catch (error) {
      console.error('Error initializing player:', error);
    }
  };

  useEffect(() => {
    if (isSdkReady) {
      initPlayer();
    }
  }, [isSdkReady, props.token]);

  return (
    <Container>
      <PlayInfo />
      <TrackBar />
      <PlayControl/>
    </Container>
  );
}

export default Player;
