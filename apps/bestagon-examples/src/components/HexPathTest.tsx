// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  HexGrid,
  HexagonBox,
  attributeMap,
  useStatefulRef,
} from '@dblatcher/bestagons';
import React, { CSSProperties, useState } from 'react';
import { Coords, coordsMatch, findPath } from '../lib/grid-functions';
import { PlaceOnHex } from './PlaceOnHex';

interface Props {
  rows: number;
  width: number;
  startLow?: boolean;
}

const obstacles: Coords[] = [
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 3, y: 3 },
  { x: 3, y: 4 },
  { x: 4, y: 5 },
]

export const HexPathTest: React.FunctionComponent<Props> = ({ rows, width, startLow = false }) => {
  const [board, boardRef] = useStatefulRef<HTMLDivElement>();

  const [start] = useState<Coords>({ x: 0, y: 2 });
  const [dest, setDest] = useState<Coords>({ x: 4, y: 4 });
  const [path, setPath] = useState<Coords[]>(findPath(start, dest, { rows, width, startLow, obstacles }))

  const getStyle = (y: number, x: number): CSSProperties => {
    if (coordsMatch(start, { x, y })) {
      return {
        backgroundColor: 'pink',
      };
    }
    if (coordsMatch(dest, { x, y })) {
      return {
        backgroundColor: 'yellow',
      };
    }
    if (obstacles.some(obstacle => coordsMatch(obstacle, { x, y }))) {
      return {
        backgroundColor: 'grey',
      }
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
              setPath(findPath(start, { x, y }, { rows, width, startLow, obstacles }))
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
              <span style={{ fontSize: '2.5rem' }}>*</span>
            </PlaceOnHex>
          ))
          }

        </>)}
      </HexGrid>
    </>
  );
};
