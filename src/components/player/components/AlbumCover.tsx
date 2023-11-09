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

export default function AlbumCover() {
  const [isCoverToggle, setIsCoverToggle] = useState<any>(false);

  const [albumCover, setAlbumCover] = useState<string>('');

  const CoverHandler = () => {
    isCoverToggle? setIsCoverToggle(false) : setIsCoverToggle(true);
  }

  return (
    <>
      <TopAlbumCover isTopActive={isCoverToggle}>
        <TopCoverBtn onClick={() => {CoverHandler()}} isTopActive={isCoverToggle}>
          <MdKeyboardArrowDown size='20'/>
        </TopCoverBtn>
        <img src={albumCover} alt=''/>
      </TopAlbumCover>
    </>
  );
}
