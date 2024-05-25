import { AxialCoords, getAxialDistance, isAxialAdjacent } from "./axial-coords";
export interface OffsetCoords { x: number; y: number; };

export interface GridDef {
    rows: number;
    width: number;
    evenColsLow: boolean;
    obstacles: OffsetCoords[],
}

export const coordsMatch = (a: OffsetCoords, b: OffsetCoords) => a.x == b.x && a.y === b.y

export const convertOffsetToAxial = (coords: OffsetCoords, evenColsLow = false): AxialCoords => {
    const col = coords.x
    const row = coords.y

    const colAdjust = evenColsLow
        ? -(col + (col & 1)) / 2
        : -(col - (col & 1)) / 2

    const q = col
    const r = row + colAdjust
    return { q, r }
}

export const isHexAdjacent = (
    coords1: OffsetCoords,
    coords2: OffsetCoords,
    evenColsLow = false
): boolean => isAxialAdjacent(
    convertOffsetToAxial(coords1, evenColsLow),
    convertOffsetToAxial(coords2, evenColsLow)
)

export const getDistance = (start: OffsetCoords, end: OffsetCoords, evenColsLow: boolean): number =>
    getAxialDistance(
        convertOffsetToAxial(start, evenColsLow),
        convertOffsetToAxial(end, evenColsLow)
    )


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


