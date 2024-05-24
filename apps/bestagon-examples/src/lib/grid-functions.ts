export interface Coords { x: number; y: number; };

export interface GridDef {
    rows: number;
    width: number;
    startLow: boolean;
    obstacles: Coords[],
}

export const isHexAdjacent = (
    c1: Coords,
    c2: Coords,
    startLow = false
): boolean => {
    const { x: x1, y: y1 } = c1
    const { x: x2, y: y2 } = c2
    const xDif = Math.abs(x1 - x2);
    const yDif = Math.abs(y1 - y2);
    if (xDif === 0 && yDif === 1) {
        return true;
    }
    if (y1 === y2 && xDif === 1) {
        return true;
    }
    const upIsAdjacent = x1 % 2 === (startLow ? 1 : 0);
    const adjacentY = upIsAdjacent ? 1 : -1;
    if (y1 - y2 === adjacentY && xDif === 1) {
        return true;
    }
    return false;
};


export const isInGrid = (coords: Coords, grid: GridDef) => {
    const { x, y } = coords;
    return x >= 0 && y >= 0 && x < grid.width && y < grid.rows
}

export const getAdjacents = (cell: Coords, grid: GridDef): Coords[] => {
    const { x, y } = cell;
    const yMinusOneIsAdjacent = cell.x % 2 === (grid.startLow ? 1 : 0);
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
export const getOpenAdjacents = (cell: Coords, grid: GridDef): Coords[] =>
    getAdjacents(cell, grid)
        .filter(_ =>
            !grid.obstacles.some(obstacle => coordsMatch(obstacle, _))
        )

export const getDistance = (start: Coords, end: Coords, startLow: boolean): number => {
    return 0
}

export const coordsMatch = (a: Coords, b: Coords) => a.x == b.x && a.y === b.y
