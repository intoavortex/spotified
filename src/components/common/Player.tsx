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

export default function Player() {
  return (
    <Container>
      <PlayInfo />
      <TrackBar />
      <PlayControl />
    </Container>
  );
}
