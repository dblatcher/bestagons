// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HexRow, HexagonBox } from '@bestagon-mono/bestagon-components';
import styles from './app.module.css';


export function App() {
  return (
    <div>
      {/* <HexagonBox>test</HexagonBox>
      <HexagonBox polygonStyle={{
        fill: 'red',
        strokeWidth: 5,
      }}>
        <p>I am content</p>
        <p>in the HexagonBox</p>
      </HexagonBox> */}

      <HexRow>
        <HexagonBox>A</HexagonBox>
        <HexagonBox>B</HexagonBox>
        <HexagonBox>C</HexagonBox>
        <HexagonBox>D</HexagonBox>
        <HexagonBox>E</HexagonBox>
      </HexRow>
      <HexRow>
        <HexagonBox>1</HexagonBox>
        <span></span>
        <HexagonBox polygonStyle={{ fill: 'pink' }}>
          <div style={{
            textAlign: 'center',
            padding: 5,
            fontSize: 40,
          }}>
            2
          </div>
        </HexagonBox>
        <HexagonBox>3</HexagonBox>
        <HexagonBox>4</HexagonBox>
      </HexRow>
      <HexRow>
        <HexagonBox>A</HexagonBox>
        <HexagonBox>B</HexagonBox>
        <HexagonBox>C</HexagonBox>
        <HexagonBox>D</HexagonBox>
        <HexagonBox>E</HexagonBox>
      </HexRow>
    </div>
  );
}

export default App;
