// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Board } from '../components/Board';
import { HexPathTest } from '../components/HexPathTest';

export function App() {
  return (
    <>
      <Board rows={5} width={5} />
      <HexPathTest rows={10} width={16} startLow showAxialCoords/>
    </>
  );
}

export default App;
