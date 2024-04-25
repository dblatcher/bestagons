// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HexRow, HexagonBox } from '@bestagon-mono/bestagon-components';
import styles from './app.module.css';


export function App() {
  return (
    <div>
      <HexagonBox polygonStyle={{
        fill: 'red',
        strokeWidth: 5,
      }}>
        <button style={{
          maxWidth: '100%'
        }}>
          <p>I am content</p>
          <p>in the box</p>
        </button>
      </HexagonBox>

      <HexRow>
        <HexagonBox>A</HexagonBox>
        <HexagonBox>B</HexagonBox>
        <HexagonBox>C</HexagonBox>
        <HexagonBox>D</HexagonBox>
        <HexagonBox>E</HexagonBox>
      </HexRow>
      <HexRow extraHeight>
        <HexagonBox>1</HexagonBox>
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
        <span></span>
        <HexagonBox
          polygonClassNames={styles.fancyHex}
          onClick={(e) => { console.log(e) }}
        >4</HexagonBox>
      </HexRow>
      <p>Should be below the hexes and not over the top</p>
      <HexRow size='small'>
        <HexagonBox>A</HexagonBox>
        <HexagonBox>B</HexagonBox>
        <HexagonBox>C</HexagonBox>
      </HexRow>
      <HexRow size='small' extraHeight>
        <HexagonBox>A</HexagonBox>
        <HexagonBox>B</HexagonBox>
        <HexagonBox>C</HexagonBox>
      </HexRow>
    </div>
  );
}

export default App;
