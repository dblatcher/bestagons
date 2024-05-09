// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Board } from '../components/Board';
import { Examples } from '../components/Examples';


export function App() {
  return (<>

    <Board rows={4} width={6}/>
    <Examples />

  </>);
}

export default App;
