import styled from 'styled-components';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { BiUser } from 'react-icons/bi';
import { RxTriangleDown, RxExternalLink } from 'react-icons/rx';

const Container = styled.div`
  position:relative;
  padding:16px 32px;
  height:64px;
  box-sizing: border-box;
`

const FlexContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  flex-direction:row;
  justify-content: space-between;
  align-items:center;
`

const HistoryBtnBox = styled.div`
  display:flex;
  gap:16px;
`

const Btn = styled.a`
  display:flex;
  flex-wrap:wrap;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:32px;
  height:32px;
  border-radius:50%;
  background-color:rgba(0,0,0,.7);
`

const UserBtn = styled.a`
  display:flex;
  flex-wrap:wrap;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:8px;
  padding:2px;
  border-radius:23px;
  box-sizing:border-box;
  background-color:black;
`

const UserIcon = styled.span`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:28px;
  height:28px;
  border-radius:50%;
  background-color:#535353;
  margin-left:2px;
`

const UserId = styled.span`
  display:inline-block;
  max-width:110px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height:32px;
  font-size:14px;
  font-weight:bold;
  color:#fff;
`

const ArrowIcon = styled.span`
  display:inline-block;
  margin-right:6px;
`

const MoreInfo = styled.div`
  position:absolute;
  right:32px; 
  top:63px;
  width:196px;
  padding:4px;
  border-radius:4px;
  background-color:#282828;
  box-sizing:border-box;
  box-shadow: 0 16px 24px rgba(0,0,0,.3), 0 6px 8px rgba(0,0,0,.2);
  z-index:2;
`

const BtnGroup = styled.div`
  display:flex;
  flex-direction:column;
  text-align:left;
  border-bottom:1px solid hsla(0,0%,100%,.1);
`

// const Line = styled.hr`
//   height:1px;
//   border:none;
//   background-color:hsla(0,0%,100%,.1);
// `

const Link = styled.a`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items:center;
  height:40px;
  padding:0 8px 0 12px;
  line-height:40px;
  font-size:14px;
  color:hsla(0,0%,100%,.9);
  text-decoration:none;
  text-align:left;
  box-sizing:border-box;
  &:hover{
    background-color:hsla(0,0%,100%,.1);
  }
`


function ContainerHeader() {
  return (
    <Container>
      <FlexContainer>
        <HistoryBtnBox>
          <Btn href={'#none'} title="뒤로 가기">
            <SlArrowLeft color='white'/>
          </Btn>
          <Btn href={'#none'} title="앞으로 가기">
            <SlArrowRight color='white'/>
          </Btn>
        </HistoryBtnBox>
        <UserBtn>
          <UserIcon><BiUser size='18' color='white'/></UserIcon>
          <UserId>vouxx</UserId>
          <ArrowIcon><RxTriangleDown size='20' color='white'/></ArrowIcon>
        </UserBtn>
      </FlexContainer>
      <MoreInfo>
        <BtnGroup>
          <Link href='' title='계정'>
            <span>계정</span>
            <RxExternalLink size='17'/>
          </Link>
          <Link href='' title='프로필'>
            <span>프로필</span>
          </Link>
          <Link href='' title='설정'>
            <span>설정</span>
          </Link>
        </BtnGroup>
        <Link href='' title='로그아웃'>로그아웃</Link>
      </MoreInfo>
    </Container>
  );
}

export default ContainerHeader;
