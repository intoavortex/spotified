import { useState } from 'react';
import styled from 'styled-components';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPip } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface StyledType {
  isTopActive: boolean
}
interface BarStyledType {
  isPlayBar: number
  playBarPosition: number
}

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

let TopAlbumCover = styled.div<StyledType>`
  width: 400px;
  position: absolute;
  left:${(props) => (props.isTopActive === true ? '-400px' : '0')};
  bottom:90px;
  z-index:1;
  transition:all .3s ease;

  img{width:100%;}
`
let LeftAlbumCover = styled.div<StyledType>`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  overflow: hidden;
  position:${(props) => (props.isTopActive === true ? 'relative' : 'absolute')};
  left:${(props) => (props.isTopActive === true ? '0' : '-400px')};
  bottom: 0;
  z-index:1;
  transition:all .3s ease;
  cursor: pointer;

  img{width:100%;}
  &:hover a{
    opacity: 1;
  }
`

const TopCoverBtn = styled.div<StyledType>`
  position: absolute;
  right:0;
  top:0;
  width:30px; height:30px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-right:10px;
  margin-top:10px;
  border:none;
  border-radius: 50%;
  background-color: black;
  opacity: 0.5;
  cursor: pointer;
  transition:all .3s ease;

  &:hover{
    opacity: 1;
  }
`

const LeftCoverBtn = styled.div<StyledType>`
  position: absolute;
  right:0;
  top:0;
  width:24px; height:24px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-right:5px;
  margin-top:5px;
  border:none;
  border-radius: 50%;
  background-color: black;
  opacity: 0;
  cursor: pointer;
  transition:all .3s ease;

  &:hover{
    opacity: 1;
    width:26px; height:26px;
    margin-right:7px;
    margin-top:7px;
  }
`
export default function PlayInfo() {
  // 좋아요
  const [likes, setLikes] = useState(false)

  const [isCoverToggle, setIsCoverToggle] = useState<any>(false);

  const [trackName, setTrackName] = useState<string>('');
  const [albumCover, setAlbumCover] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');

  const CoverHandler = () => {
    isCoverToggle? setIsCoverToggle(false) : setIsCoverToggle(true);
  }


  return (
    <Container>
      <TopAlbumCover isTopActive={isCoverToggle}>
        <TopCoverBtn onClick={() => {CoverHandler()}} isTopActive={isCoverToggle}>
          <MdKeyboardArrowDown size='20'/>
        </TopCoverBtn>
        <img src={albumCover} alt=''/>
      </TopAlbumCover>
      <LeftAlbumCover isTopActive={isCoverToggle}>
        <LeftCoverBtn onClick={() => {CoverHandler()}} isTopActive={isCoverToggle}>
          <MdKeyboardArrowDown size='20'/>
        </LeftCoverBtn>
        <img src={albumCover} alt=''/>
      </LeftAlbumCover>
      <TitleBox>
        <Title>{trackName}</Title>
        <Artist>{artistName}</Artist>
      </TitleBox>
      <BtnBox>
        <LikeBtn onClick={() => likes === false? setLikes(true) : setLikes(false)}>
          { likes === true ? <AiFillHeart size='20' color='#feac00'/> : <AiOutlineHeart size='20' className={'svgIcon'}/> }
        </LikeBtn>
        <LikeBtn><BsPip size='20' className={'svgIcon'}/></LikeBtn>
      </BtnBox>
    </Container>
  );
}
