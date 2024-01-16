import { useState } from 'react';
import styled from 'styled-components';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../types/Type";
import { IsCoverToggle } from "../../../slices/PlayState";

interface StyledType {
  $isTopActive: boolean
}

let TopAlbumCover = styled.div<StyledType>`
  width:100%;
  max-width: 400px;
  position: absolute;
  left:${(props) => (props.$isTopActive === true ? '-400px' : '0')};
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

let LeftAlbumCover = styled.div<StyledType>`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  overflow: hidden;
  position:${(props) => (props.$isTopActive === true ? 'relative' : 'absolute')};
  left:${(props) => (props.$isTopActive === true ? '0' : '-400px')};
  bottom: 0;
  z-index:1;
  transition:all .3s ease;
  cursor: pointer;

  img{width:100%;}
  &:hover a{
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
  transform: rotate(-180deg);
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

export default function AlbumCover() {
  const playState = useSelector((state: RootState) => state.playState);
  const dispatch = useDispatch();

  const CoverHandler = () => {
    playState.isCoverToggle? dispatch(IsCoverToggle(false)) : dispatch(IsCoverToggle(true));
  }

  return (
    <>
      <TopAlbumCover $isTopActive={playState.isCoverToggle}>
        <TopCoverBtn onClick={() => {CoverHandler()}} $isTopActive={playState.isCoverToggle}>
          <MdKeyboardArrowDown size='20'/>
        </TopCoverBtn>
        <img src={playState.AlbumCover} alt=''/>
      </TopAlbumCover>

      <LeftAlbumCover $isTopActive={playState.isCoverToggle}>
        <LeftCoverBtn onClick={() => {CoverHandler()}} $isTopActive={playState.isCoverToggle}>
          <MdKeyboardArrowDown size='20'/>
        </LeftCoverBtn>
        <img src={playState.AlbumCover} alt=''/>
      </LeftAlbumCover>

    </>
  );
}
