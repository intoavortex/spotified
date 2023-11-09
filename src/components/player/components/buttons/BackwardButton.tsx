import { AiFillStepBackward } from 'react-icons/ai';
import Button from "./common/Button";

export default function BackwardButton() {
  return (
    <>
      <Button title='이전곡'><AiFillStepBackward size='22' className={'svgIcon'}/></Button>
    </>
  );
}
