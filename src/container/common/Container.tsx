import styled from "styled-components";

import Header from "../../components/common/Header";
import CoverThumbnailList from "../../components/list/CoverThumbnailList";

const Wrap = styled.div`
  width: calc(100% - 400px);
  height:calc(100vh - 90px);
  background-color: rgb(83, 83, 83);
  background-image:linear-gradient(rgba(0,0,0,.6) 0,#121212 100%);
`

const ContentCotainer = styled.div`
  width:100%;
  height:calc(100% - 64px);
  padding:24px 32px;
  overflow-y:auto;
  box-sizing: border-box;
  &::-webkit-scrollbar{
    width:8px;
    display:block;
    /* background-color:red; */
  }
  &::-webkit-scrollbar-button{
    display:none;
  }
  &::-webkit-scrollbar-thumb{
    display:block;
    background-color:hsla(0,0%,100%,.3);
    border-radius:15px;
  }
  &::-webkit-scrollbar-track{
    display:none;
  }
  &::-webkit-scrollbar-track-piece{
    display:none;
  }
  /* &::-webkit-scrollbar-corner: — 수평 스크롤바와 수직 스크롤바가 교차하는 곳의 하단 모서리. 주로 브라우저 창의 우측 하단 모서리에 위치한다. */
  /* &::-webkit-resizer  */
`

const Contents = styled.div`
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  gap:24px;
`

export function Container() {
  return(
    <Wrap>
      <Header />
      <ContentCotainer>
        <Contents>
          <CoverThumbnailList title={'아니 기능 할 거'}/>
          <CoverThumbnailList title={'개만내 진짜루~'}/>
          <CoverThumbnailList title={'재생목록2'}/>
        </Contents>
      </ContentCotainer>
    </Wrap>
  )
}

export default Container;
