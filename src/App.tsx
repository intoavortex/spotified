import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import './App.css';
// import Player from './components/common/Player_';
import Player from './components/common/Player';
import SideList from './components/common/SideList';
import Container from './container/common/Container'

import styled from 'styled-components';
import { Reset } from 'styled-reset'

const Wrap = styled.div`
  display:flex;
  flex-wrap: wrap;
  width:100vw;
  height:100vh;
  overflow:hidden;
`


function App() {

  return (
    <>
      <Reset />
      <Wrap className="App">
        <SideList />
        <Container />
        <Player />
      </Wrap>
    </>
  );
}

export default App;
