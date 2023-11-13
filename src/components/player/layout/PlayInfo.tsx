import styled from 'styled-components';

import { useSelector } from "react-redux"
import { RootState } from "../../../types/Type";

import LikeButton from "../components/buttons/LikeButton";
import PIPButton from "../components/buttons/PIPButton";
import AlbumCover from '../components/AlbumCover'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
`

const TitleBox = styled.div`
  transition:all .3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  const playState = useSelector((state: RootState) => state.playState);

  return (
    <Container>
      <AlbumCover />

      <TitleBox>
        <Title>{playState.TrackName}</Title>
        <Artist>{playState.ArtistName}</Artist>
      </TitleBox>

      <BtnBox>
        <LikeButton />
        <PIPButton />
      </BtnBox>

    </Container>
  );
}
