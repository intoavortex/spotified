import styled from 'styled-components';
import albumImg from '../../static/img/test.jpeg';

import { RxTriangleRight } from 'react-icons/rx';


const Container = styled.div`
  width:100%;
  min-width:165px;
  max-width:202px;
  color:#fff;
  font-size:25px;
  background-color:#181818;
  -webkit-box-flex: 1;
  background: #181818;
  border-radius: 6.25px;
  padding:16px;
  box-sizing:border-box;
  transition: background-color .3s ease;
  &:hover{
    background: #282828;
    .play{
      bottom:8px;
      opacity:1;
    }
  }
`

const ImgBox = styled.div`
  position: relative;
  width: 100%;
  height:100%;
  max-height:170px;
  margin-bottom:16px;
  border-radius: 6.25px;
  background-color: #333;
  -webkit-box-shadow: 0 8px 24px rgba(0,0,0,.5);
  box-shadow: 0 8px 24px rgba(0,0,0,.5);
  overflow:hidden;
  img{
    width:100%;
  }
`

const PlayBtn = styled.a`
  position:absolute;
  right:8px;
  bottom:-48px;
  width:48px;
  height:48px;
  /* background-color:#65d36e; */
  background-color:#e89f00;
  border-radius:50%;
  z-index:2;
  opacity:0;
  transition:all .3s ease;
`

const TextBox = styled.div`
  min-height:62px;
  text-align:left;
`

const Title = styled.a`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width:100%;
  display:inline-block;
  padding-bottom:4px;
  line-height:25.6px;
  font-size:16px;
  font-weight:bold;
  color:#fff;
`

const Desc = styled.a`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height:22.4px;
  font-size:14px;
  color:#b3b3b3;
  &:hover{
    text-decoration:underline;
  }
`

function CoverThumbnail() {


  return (
    <Container>
      <ImgBox>
        <img src={albumImg} alt="앨범 커버"/>
        <PlayBtn className={'play'} href=""><RxTriangleRight size='48' color='black'/></PlayBtn>
      </ImgBox>
      <TextBox>
        <Title>Pretender</Title>
        <Desc>어쩌구 저쩌구 어쩌구 저쩌구</Desc>
      </TextBox>
    </Container>
  );
}

export default CoverThumbnail;
