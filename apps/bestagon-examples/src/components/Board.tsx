// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  HexGrid,
  HexagonBox,
  attributeMap,
  useStatefulRef,
} from '@dblatcher/bestagons';
import React, { CSSProperties, useState } from 'react';
import { convertOffsetToAxial, isHexAdjacent } from '../lib/grid-functions';
import { AxialCoordinates } from './AxialCoordinates';
import { PlaceOnHex } from './PlaceOnHex';
import { OffsetCoordinates } from './OffsetCoordinates';

interface Props {
  rows: number;
  width: number;
  startLow?: boolean;
  showAxialCoords?: boolean;
}


export const Board: React.FunctionComponent<Props> = ({ rows, width, startLow = false, showAxialCoords = false }) => {
  const [board, boardRef] = useStatefulRef<HTMLDivElement>();
  const [x, setX] = useState<number>(2);
  const [y, setY] = useState<number>(3);

  const getStyle = (row: number, col: number): CSSProperties => {
    if (row === y && col === x) {
      return {
        backgroundColor: 'orange',
      };
    }
    if (isHexAdjacent({ x, y }, { x: col, y: row }, startLow)) {
      return {
        backgroundColor: 'yellow',
      };
    }
    return {};
  };

  const findHex = (x: number, y: number) => {
    return (
      board?.querySelector(
        `[${attributeMap.x}="${x}"][${attributeMap.y} = "${y}"]`
      ) ?? undefined
    );
  };

  return (
    <HexGrid
      ref={boardRef}
      startLow={startLow}
      rows={rows}
      width={width}
      size={60}
      makeHex={(x: number, y: number) => (
        <HexagonBox
          hexData={{ x, y }}
          onClick={() => {
            setX(x);
            setY(y);
          }}
          style={getStyle(y, x)}
          key={x}
        >
          {showAxialCoords
            ? <AxialCoordinates axial={convertOffsetToAxial({ x, y }, startLow)} />
            : <OffsetCoordinates coords={{ x, y }} />
          }
        </HexagonBox>
      )}
    >
      {board && (
        <>
          <PlaceOnHex {...{ x, y, boardRef, findHex }}>
            <span>Here</span>
          </PlaceOnHex>
          <PlaceOnHex {...{ x: x - 1, y, boardRef, findHex }}>
            <span>not here</span>
          </PlaceOnHex>
        </>
      )}
    </HexGrid>
  );
};
