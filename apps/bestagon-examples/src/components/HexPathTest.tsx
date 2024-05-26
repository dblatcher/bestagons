// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  HexGrid,
  HexagonBox,
  attributeMap,
  useStatefulRef,
} from '@dblatcher/bestagons';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { OffsetCoords, convertOffsetToAxial, coordsMatch, getDistance } from '../lib/grid-functions';
import { PlaceOnHex } from './PlaceOnHex';
import { findPathInefficiently } from '../lib/path-finding'
import { OffsetCoordinates } from './OffsetCoordinates';
import { AxialCoordinates } from './AxialCoordinates';

interface Props {
  rows: number;
  width: number;
  evenColsLow?: boolean;
  showAxialCoords?: boolean;
}

const obstacles: OffsetCoords[] = [
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 3, y: 3 },
  { x: 3, y: 4 },
  { x: 4, y: 5 },
]

export const HexPathTest: React.FunctionComponent<Props> = ({ rows, width, evenColsLow = false, showAxialCoords }) => {
  const [board, boardRef] = useStatefulRef<HTMLDivElement>();

  const [start] = useState<OffsetCoords>({ x: 5, y: 5 });
  const [dest, setDest] = useState<OffsetCoords>({ x: 5, y: 4 });
  const [path, setPath] = useState<OffsetCoords[]>(
    []
  )
  useEffect(() => {
    setPath(findPathInefficiently(start, dest, { rows, width, evenColsLow, obstacles }))
  }, [setPath])

  const [distance, setDistance] = useState(getDistance(start, dest, evenColsLow))

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
        path finding : distance = {distance}
      </div>
      <HexGrid
        ref={boardRef}
        evenColsLow={evenColsLow}
        rows={rows}
        width={width}
        size={60}
        makeHex={(x: number, y: number) => (
          <HexagonBox
            hexData={{ x, y }}
            onClick={() => {
              setDistance(getDistance(start, { x, y }, evenColsLow))
              setDest({ x, y })
              setPath(findPathInefficiently(start, { x, y }, { rows, width, evenColsLow, obstacles }))
            }}
            style={getStyle(y, x)}
            key={x}
          >
            {showAxialCoords
              ? <AxialCoordinates axial={convertOffsetToAxial({ x, y }, evenColsLow)} />
              : <OffsetCoordinates coords={{ x, y }} />
            }
          </HexagonBox>
        )}
      >
        {board && (<>

          {path.map((coord, index) => (
            <PlaceOnHex key={index}
              {...{ x: coord.x, y: coord.y, boardRef, findHex }}>
              <span style={{ fontSize: '2.25rem' }}>{index}</span>
            </PlaceOnHex>
          ))
          }

        </>)}
      </HexGrid>
    </>
  );
};
