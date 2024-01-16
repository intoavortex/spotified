// import { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';

import { MdHomeFilled } from 'react-icons/md';
import { IoSearch } from "react-icons/io5";
import { LuLibrary } from "react-icons/lu";

import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
// import getTokenApi from '../../js/api/getToken';

const Container = styled.div`
  width: 100%;
  max-width:400px;
  height:calc(100vh - 90px);
  background-color:#000;
  padding-top:24px;
  box-sizing: border-box;
  display:flex;
  flex-direction:column;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
`

const Logo = styled.span`
  display:block;
  width:130px;
  margin-left:24px;
  a{
    display:block;
    width:100%;
    height:100%;
    z-index: 9;
  }
  img{
    width:100%;
  }
`

const MenuGroup = styled.div`
  padding:0 24px;
`

const Menu = styled.ul`
  text-align:left;
  margin-top:24px;
`

const MenuBtn = styled.li`
  color:#b3b3b3;
  height:40px;
  font-size:14px;
  &.active{
    color:#fff;
  }

  a{
    display: inline-block;
    /* width:100%; */
    height:100%;
    color:#b3b3b3;
    text-decoration: none;
    span{
      vertical-align: text-top;
    }
  }
`
const Line = styled.hr`
  background-color:#282828;
  border:none;
  height:1px;
`

// const AlbumCover = styled.div`
//   width:100%;
//   img{width:100%;}
// `


export default function Header() {
  return (
    <Container>
      <div>
        <Logo>
          <Link to={'/'}>
            <img src={logo} alt="LOGO"/>
          </Link>
        </Logo>
        <MenuGroup>
          <Menu>
            <MenuBtn className={'active'}>
              <Link to={'/'}>
                <MdHomeFilled />
                <span> 홈 </span>
              </Link>
            </MenuBtn>
            <MenuBtn>
              <IoSearch />
              <span> 검색</span>
            </MenuBtn>
          </Menu>
          <Line />
          <Menu>
            <MenuBtn>
              <LuLibrary />
              <span> 라이브러리</span>
            </MenuBtn>
            {/* <MenuBtn>플레이리스트 만들기</MenuBtn>
            <MenuBtn>좋아요 표시한 곡</MenuBtn> */}
            <MenuBtn>내가 만든 플레이리스트</MenuBtn>
          </Menu>
        </MenuGroup>
      </div>
    </Container>
  );
}
