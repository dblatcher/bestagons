// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HexRow, HexWrapper, HexagonBox, HexagonImage } from '@bestagon-mono/bestagon-components';
import styles from './app.module.css';


export function App() {
  return (
    <div>
      <HexagonBox>
        <button style={{
          maxWidth: '100%',
        }}>
          <p>I am content</p>
          <p>in the box</p>
        </button>
      </HexagonBox>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <HexagonBox onClick={() => { alert('clicked') }}>
        click me
      </HexagonBox>
      <br></br>

      <HexWrapper size='normal' hexClassNames={[styles.yellowHex]} polygonStyle={{ display: 'none' }}>
        <HexagonBox
          image={{ src: './fruit.png' }}
          onClick={(event) => {
            console.log(event.target)
          }}>A</HexagonBox>
        <HexagonImage src='./fruit.png' onClick={() => { alert('clicked') }}>
          <div style={{
            maxWidth: '100%',
            backgroundColor: 'pink'
          }}>
            <p>I am content</p>
            <p>in the box</p>
          </div>
        </HexagonImage>
        <HexagonBox className={styles.blueHex}>C</HexagonBox>
        <HexagonBox>D</HexagonBox>
        <HexagonBox>E</HexagonBox>
        <HexagonImage src='./feathers.png' />
        <HexagonBox>G</HexagonBox>
        <HexagonBox>H</HexagonBox>
        <HexagonBox>I</HexagonBox>
        <HexagonBox>J</HexagonBox>
        <HexagonBox>K</HexagonBox>
      </HexWrapper>

      <HexRow startLow polygonClassNames={[styles.fancyFrame]} hexClassNames={[styles.blueHex]}>
        <HexagonBox>A</HexagonBox>
        <HexagonBox polygonClassNames={[styles.blackFrame]}>B</HexagonBox>
        <HexagonBox>C</HexagonBox>
        <HexagonBox>D</HexagonBox>
        <HexagonBox>E</HexagonBox>
      </HexRow>
      <HexRow startLow extraHeight>
        <HexagonBox>1</HexagonBox>
        <HexagonBox>
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
          polygonClassNames={[styles.fancyFrame]}
          onClick={(e) => { console.log(e) }}
        >4</HexagonBox>
      </HexRow>
      <p>Should be below the hexes and not over the top</p>
      <HexRow size='small' xOffset={1}>
        <HexagonBox onClick={() => { console.log('A') }}>A</HexagonBox>
        <HexagonBox>A</HexagonBox>
        <HexagonBox>A</HexagonBox>
      </HexRow>
      <HexRow size='small' polygonStyle={{ strokeWidth: 1 }}>
        <HexagonBox>B</HexagonBox>
        <HexagonBox>B</HexagonBox>
        <HexagonBox>B</HexagonBox>
        <HexagonBox>B</HexagonBox>
        <HexagonBox>B</HexagonBox>
      </HexRow>
      <HexRow size='small' polygonClassNames={[styles.fancyFrame]} hexClassNames={[styles.blueHex]}>
        <HexagonBox>C</HexagonBox>
        <HexagonBox>C</HexagonBox>
        <HexagonBox>C</HexagonBox>
        <HexagonBox>C</HexagonBox>
        <HexagonBox>C</HexagonBox>
      </HexRow>
      <HexRow size='small'>
        <HexagonBox onClick={() => { console.log('d') }}>D</HexagonBox>
        <HexagonBox>D</HexagonBox>
        <HexagonBox>D</HexagonBox>
        <HexagonBox>D</HexagonBox>
        <HexagonBox>D</HexagonBox>
      </HexRow>
      <HexRow size='small' xOffset={2}>
        <HexagonBox>E</HexagonBox>
      </HexRow>
    </div>
  );
}

export default App;
