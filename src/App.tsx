import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Player from './components/common/Player';
import Header from './components/common/Header';
import Container from './container/common/Container'

import styled from 'styled-components';
import { Reset } from 'styled-reset'

const Wrap = styled.div`
  display:flex;
  flex-wrap: wrap;
  width:100vw;
  height:100vh;
  /* overflow:hidden; */
`

// const App = () => (
//   <React.Fragment>
//     <Reset />
//     <div>Hi, I'm an app!</div>
//   </React.Fragment>
// )

function App() {
  return (
    <>
      <Reset />
      <Wrap className="App">
        <Header />
        <Container />
        <Player />
      </Wrap>
    </>
  );
}

export default App;
