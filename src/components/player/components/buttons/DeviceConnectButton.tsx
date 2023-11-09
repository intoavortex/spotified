import { TbDevices } from 'react-icons/tb';
import Button from "./common/Button";

export default function DeviceConnectButton() {
  return (
    <>
      <Button title='다른기기와 연결'><TbDevices size='20' className={'svgIcon'}/></Button>
    </>
  );
}
