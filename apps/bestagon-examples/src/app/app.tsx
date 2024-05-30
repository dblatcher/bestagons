import { HexagonBox } from '@dblatcher/bestagons';
import { Board } from '../components/Board';
import { Examples } from '../components/Examples';
import { HexPathTest } from '../components/HexPathTest';
import { NestingComponentsExample } from '../components/NestingComponentsExample';

export function App() {
  return (
    <>
      <Board rows={5} width={5} />
      <HexPathTest rows={10} width={16} evenColsLow />
      <HexagonBox style={{
        lineBreak: 'anywhere',
        backgroundColor: 'pink',
      }} anchor={{ href: 'https://www.redblobgames.com/grids/hexagons' }}>www.redblobgames.com/grids/hexagons</HexagonBox>
      <Examples />
      <NestingComponentsExample />
    </>
  );
}

export default App;
