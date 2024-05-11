// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Board } from '../components/Board';
import { Examples } from '../components/Examples';


export function App() {
  return (<>

    <Board rows={6} width={7}/>
    <Examples />

  </>);
}

export default App;
