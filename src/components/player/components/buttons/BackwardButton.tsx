import { AiFillStepBackward } from 'react-icons/ai';
import Button from "./common/Button";

export default function BackwardButton({ player }) {
  const BackwardHandler = (e) => {
    e.stopPropagation();
    player.previousTrack();
  }

  return (
    <>
      <Button title='이전곡' onClick={(e) => { BackwardHandler(e) }}><AiFillStepBackward size='22' className={'svgIcon'}/></Button>
    </>
  );
}
