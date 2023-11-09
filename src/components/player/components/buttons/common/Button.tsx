import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  background-color: transparent;
  border:none;
  cursor: pointer;
`

interface Iprops {
  children?: ReactNode,
  title?: string,
  onClick?:React.MouseEventHandler<HTMLElement>,
  id?: string,
}

export default function Button({ children, title, onClick, id }:Iprops) {
  return (
    <>
      <Btn title={title} onClick={onClick} id={id}>{children}</Btn>
    </>
  );
}
