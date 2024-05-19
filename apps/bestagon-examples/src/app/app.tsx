// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HexagonBox } from '@dblatcher/bestagons';
import { Board } from '../components/Board';
import { Examples } from '../components/Examples';
import { HexPathTest } from '../components/HexPathTest';

export function App() {
  return (
    <>
      <HexPathTest rows={6} width={6} />
    </>
  );
}

export default App;
