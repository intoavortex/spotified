import styled from 'styled-components';
import CoverThumbnail from './CoverThumbnail';


const Container = styled.div`
  margin-bottom:16px;
`

const ListHeader = styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content:space-between;
  align-items:center;
`

const ListContainer = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  gap:24px;
`

const Title = styled.h2`
  text-align:left;
  font-size:42px;
  margin-bottom:16px;
  line-height:34px;
  font-size:24px;
  color:#fff;
  font-weight:700;
`

const AllTrackView = styled.a`
  color:#b3b3b3;
  line-height:22.4px;
  font-size:14px;
  &:hover{
    text-decoration:underline;
  }
`

interface ThumbnailListProps {
  title:string,
}

function CoverThumbnailList(props:ThumbnailListProps) {
  return (
    <Container>
      <ListHeader>
        <Title>{props.title}</Title>
        <AllTrackView>모두 표시</AllTrackView>
      </ListHeader>
      <ListContainer>
        <CoverThumbnail />
        <CoverThumbnail />
      </ListContainer>
    </Container>
  );
}

export default CoverThumbnailList;
