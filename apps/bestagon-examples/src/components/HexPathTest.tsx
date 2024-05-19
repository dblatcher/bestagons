// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  HexGrid,
  HexagonBox,
  attributeMap,
  useStatefulRef,
} from '@dblatcher/bestagons';
import React, { CSSProperties, useState } from 'react';
import { Coords, findPath } from '../lib/grid-functions';
import { PlaceOnHex } from './PlaceOnHex';

interface Props {
  rows: number;
  width: number;
  startLow?: boolean;
}

export const HexPathTest: React.FunctionComponent<Props> = ({ rows, width, startLow = false }) => {
  const [board, boardRef] = useStatefulRef<HTMLDivElement>();

  const [start, setStart] = useState<Coords>({ x: 1, y: 2 });
  const [dest, setDest] = useState<Coords>({ x: 4, y: 4 });



  const [path, setPath] = useState<Coords[]>(findPath(start, dest, { rows, width, startLow }))

  const getStyle = (row: number, col: number): CSSProperties => {
    if (row === start.y && col === start.x) {
      return {
        backgroundColor: 'pink',
      };
    }
    if (row === dest.y && col === dest.x) {
      return {
        backgroundColor: 'yellow',
      };
    }
    return {};
  };

  const findHex = (x: number, y: number) => {
    return (
      board?.querySelector(
        `[${attributeMap.x}="${x}"][${attributeMap.y}="${y}"]`
      ) ?? undefined
    );
  };

  return (
    <>
      <div>
        path finding
      </div>
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
              setDest({ x, y })
              setPath(findPath(start, { x, y }, { rows, width, startLow }))
            }}
            style={getStyle(y, x)}
            key={x}
          >
            <b>
              {x}, {y}
            </b>
          </HexagonBox>
        )}
      >
        {board && (<>

          {path.map((coord, index) => (
            <PlaceOnHex key={index}
              {...{ x: coord.x, y: coord.y, boardRef, findHex }}>
              <span>*</span>
            </PlaceOnHex>
          ))
          }

        </>)}
      </HexGrid>
    </>
  );
};
