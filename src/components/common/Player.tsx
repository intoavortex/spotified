import styled from 'styled-components';

const Container = styled.div`
  overflow:hidden;
  width:100%;
  height:90px;
  background-color:#181818;
  border-top:1px solid #282828;
  box-sizing: border-box;
  color:#fff;

  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content:center;
  align-items:space-between;
  padding:0 16px;
`

const TextBox = styled.h1`
  line-height:90px;
  font-size:80px;
`

function Player() {
  return (
    <Container>
      <div>현재 재생 중인 노래 제목 / 가수 / 좋아요 / PIP</div>
      <TextBox>어느 세월에 합니까?</TextBox>
      <div>가사 / 재생목록 / 기기에 연결하기 / 볼륨 / 전체화면</div>
    </Container>
  );
}

export default Player;
