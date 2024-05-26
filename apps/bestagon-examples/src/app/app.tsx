// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HexagonBox } from '@dblatcher/bestagons';
import { Board } from '../components/Board';
import { Examples } from '../components/Examples';
import { HexPathTest } from '../components/HexPathTest';

export function App() {
  return (
    <>
      <Board rows={5} width={5} />
      <HexPathTest rows={10} width={16} evenColsLow />
      <HexagonBox style={{
        lineBreak: 'anywhere',
        backgroundColor:'pink',
      }} anchor={{ href: 'https://www.redblobgames.com/grids/hexagons' }}>www.redblobgames.com/grids/hexagons</HexagonBox>
      <Examples />
    </>
  );
}

export default App;
