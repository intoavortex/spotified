import React from 'react';
// import logo from './logo.svg';
import { useEffect, useState } from 'react';

import './App.css';
// import Player from './components/common/Player_';
import Player from './components/common/Player';
import SideList from './components/common/SideList';
import Container from './container/common/Container'

import styled from 'styled-components';
import { Reset } from 'styled-reset'
import axios from 'axios';

const Wrap = styled.div`
  display:flex;
  flex-wrap: wrap;
  width:100vw;
  height:100vh;
  overflow:hidden;
`


function App() {
  const [token, setToken] = useState('');

  async function getToken() {
    const res = await axios.get('http://localhost:8888/access-token');
    setToken(res.data.access_token);
  }

  useEffect(() => {
    getToken();
    if (!token) return console.log('토큰 없음');
    console.log('token success: ', token);

  }, [token]);

  return (
    <>
      <Reset />
      { (token === '') ? '로그인하시게' :
        <Wrap className="App">
          <SideList />
          <Container />
          {/* <Player /> */}
          <Player token={token}/>
        </Wrap>
      }
    </>
  );
}

export default App;
