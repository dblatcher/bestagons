export interface OffsetCoords { x: number; y: number; };
export interface AxialCoords { q: number; r: number; };

const { abs } = Math

export interface GridDef {
    rows: number;
    width: number;
    evenColsLow: boolean;
    obstacles: OffsetCoords[],
}

export const isHexAdjacent = (
    c1: OffsetCoords,
    c2: OffsetCoords,
    evenColsLow = false
): boolean => {
    const { x: x1, y: y1 } = c1
    const { x: x2, y: y2 } = c2
    const xDif = abs(x1 - x2);
    const yDif = abs(y1 - y2);
    if (xDif === 0 && yDif === 1) {
        return true;
    }
    if (y1 === y2 && xDif === 1) {
        return true;
    }
    const upIsAdjacent = x1 % 2 === (evenColsLow ? 1 : 0);
    const adjacentY = upIsAdjacent ? 1 : -1;
    if (y1 - y2 === adjacentY && xDif === 1) {
        return true;
    }
    return false;
};


export const isInGrid = (coords: OffsetCoords, grid: GridDef) => {
    const { x, y } = coords;
    return x >= 0 && y >= 0 && x < grid.width && y < grid.rows
}

export const getAdjacents = (cell: OffsetCoords, grid: GridDef): OffsetCoords[] => {
    const { x, y } = cell;
    const yMinusOneIsAdjacent = cell.x % 2 === (grid.evenColsLow ? 1 : 0);
    const adjacentY = yMinusOneIsAdjacent ? y - 1 : y + 1;
    return [
        { x: x - 1, y },
        { x: x + 1, y },
        { x: x, y: y - 1 },
        { x: x, y: y + 1 },
        { x: x - 1, y: adjacentY },
        { x: x + 1, y: adjacentY },
    ].filter(_ => isInGrid(_, grid))
}
export const getOpenAdjacents = (cell: OffsetCoords, grid: GridDef): OffsetCoords[] =>
    getAdjacents(cell, grid)
        .filter(_ =>
            !grid.obstacles.some(obstacle => coordsMatch(obstacle, _))
        )

export const convertOffsetToAxial = (coords: OffsetCoords, evenColsLow = false): AxialCoords => {
    const col = coords.x
    const row = coords.y

    const isOdd = (v: number) => !!(v & 1)
    const colAdjust = evenColsLow
        ? -((col / 2) + (isOdd(col) ? .5 : 0))
        : -(col - (col & 1)) / 2

    const q = col
    const r = row + colAdjust
    return { q, r }
}

const getAxialDistance = (a: AxialCoords, b: AxialCoords) =>
    (abs(a.q - b.q)
        + abs(a.q + a.r - b.q - b.r)
        + abs(a.r - b.r)) / 2

export const getDistance = (start: OffsetCoords, end: OffsetCoords, evenColsLow: boolean): number =>
    getAxialDistance(
        convertOffsetToAxial(start, evenColsLow),
        convertOffsetToAxial(end, evenColsLow)
    )



export const coordsMatch = (a: OffsetCoords, b: OffsetCoords) => a.x == b.x && a.y === b.y
