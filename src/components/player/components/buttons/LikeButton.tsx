import { useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Button from "./common/Button";

export default function LikeButton() {

  const [likes, setLikes] = useState(false)

  return (
    <>
      <Button onClick={() => likes === false? setLikes(true) : setLikes(false)}>
        { likes === true ? <AiFillHeart size='20' color='#feac00'/> : <AiOutlineHeart size='20' className={'svgIcon'}/> }
      </Button>
    </>
  );
}
