import { AiFillStepForward } from 'react-icons/ai';
import Button from "./common/Button";

export default function FowardButton() {
  return (
    <>
      <Button title='다음곡' onClick={() => { console.log('foward') }}><AiFillStepForward size='22' className={'svgIcon'}/></Button>
    </>
  );
}
