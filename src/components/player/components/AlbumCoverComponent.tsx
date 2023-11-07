import { useState } from 'react';
import styled from 'styled-components';

import { MdKeyboardArrowDown } from 'react-icons/md';

interface StyledType {
  isTopActive: boolean
}

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

export default function AlbumCoverComponent({ coverPosition }) {
  const [isCoverToggle, setIsCoverToggle] = useState<any>(false);

  const [albumCover, setAlbumCover] = useState<string>('');

  const CoverHandler = () => {
    isCoverToggle? setIsCoverToggle(false) : setIsCoverToggle(true);
  }

  return (
    <>
      { coverPosition === 'top' &&
        <TopAlbumCover isTopActive={isCoverToggle}>
          <TopCoverBtn onClick={() => {CoverHandler()}} isTopActive={isCoverToggle}>
            <MdKeyboardArrowDown size='20'/>
          </TopCoverBtn>
          <img src={albumCover} alt=''/>
        </TopAlbumCover>
      }

      { coverPosition === 'left' &&
        <LeftAlbumCover isTopActive={isCoverToggle}>
          <LeftCoverBtn onClick={() => {CoverHandler()}} isTopActive={isCoverToggle}>
            <MdKeyboardArrowDown size='20'/>
          </LeftCoverBtn>
          <img src={albumCover} alt=''/>
        </LeftAlbumCover>
      }
    </>
  );
}