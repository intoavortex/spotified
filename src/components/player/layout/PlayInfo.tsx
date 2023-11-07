import { useState } from 'react';
import styled from 'styled-components';

import BtnComponent from '../components/BtnComponent'
import AlbumCoverComponent from '../components/AlbumCoverComponent'

const Container = styled.div`
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

const LikeBtn = styled.button`
  height:40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color:transparent;
  border:none;
`


export default function PlayInfo() {
  const [isCoverToggle, setIsCoverToggle] = useState<any>(false);

  const [trackName, setTrackName] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');

  const CoverHandler = () => {
    isCoverToggle? setIsCoverToggle(false) : setIsCoverToggle(true);
  }

  return (
    <Container>
      <AlbumCoverComponent coverPosition={'top'} />
      <AlbumCoverComponent coverPosition={'left'} />

      <TitleBox>
        <Title>{trackName}</Title>
        <Artist>{artistName}</Artist>
      </TitleBox>

      <BtnBox>
        <BtnComponent btnFnc={'likes'}/>
        <BtnComponent btnFnc={'pip'}/>
      </BtnBox>

    </Container>
  );
}
