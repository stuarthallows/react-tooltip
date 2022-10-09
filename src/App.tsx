import "./App.css";

import { Tooltip } from './Tooltip';

function App() {
  return (
    <div className="wrapper">
      <Tooltip placement='top' content={<div>I <em>am</em> a div</div>}>
        <div className='widget'>Top</div>
      </Tooltip>

      <Tooltip placement='right' content='Hello tooltip'>
        <div className='widget'>Right</div>
      </Tooltip>

      <Tooltip placement='bottom' content='Hello tooltip'>
        <div className='widget'>Bottom</div>
      </Tooltip>

      <Tooltip placement='left' content='Hello tooltip'>
        <div className='widget'>Left</div>
      </Tooltip>
    </div>
  );
}

export default App;
