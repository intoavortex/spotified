import { useState } from "react";
import Bar from "./common/Bar";

export default function PlayBar() {
  const [testState, setTestState] = useState(1324);

  return (
    <>
      <Bar minValue={testState} maxValue={testState} onMouseUp={() => { console.log('PlayBar');
       }} defaultValue={testState}/>
    </>
  );
}
