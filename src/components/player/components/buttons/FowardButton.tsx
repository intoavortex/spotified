import { AiFillStepForward } from 'react-icons/ai';
import Button from "./common/Button";

export default function FowardButton({ player }) {
  const ForwardHandler = (e) => {
    e.stopPropagation();
    player.nextTrack();
  }
  return (
    <>
      <Button title='다음곡' onClick={(e) => { ForwardHandler(e) }}><AiFillStepForward size='22' className={'svgIcon'}/></Button>
    </>
  );
}
