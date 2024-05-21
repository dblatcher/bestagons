export interface Coords { x: number; y: number; };

interface GridDef {
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


const isInGrid = (coords: Coords, grid: GridDef) => {
    const { x, y } = coords;
    return x >= 0 && y >= 0 && x < grid.width && y < grid.rows
}

const getAdjacents = (cell: Coords, grid: GridDef): Coords[] => {
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
    ].filter(_ => isInGrid(_, grid) && !grid.obstacles.some(obstacle => coordsMatch(obstacle, _)))
}

export const coordsMatch = (a: Coords, b: Coords) => a.x == b.x && a.y === b.y

export const findPath = (start: Coords, dest: Coords, grid: GridDef, maxPathLength = 10): Coords[] => {
    const stepsFrom = (path: Coords[]) => {
        const lastPlace = path[path.length - 1]
        return getAdjacents(lastPlace, grid).map(
            adjacent => [...path, adjacent]
        )
    }

    const extendAllPaths = (paths: Coords[][]) => {
        return paths.map(stepsFrom).flat(1)
    }

    const hasReachedGoal = (path: Coords[]): boolean => {
        const lastPlace = path[path.length - 1]
        return coordsMatch(lastPlace, dest)
    }

    const purgePaths = (paths: Coords[][]): Coords[][] => {
        const lastPlaceReachedSoonerInOtherPath = (path: Coords[]) => {
            const lastPlace = path[path.length - 1]
            return paths.some(
                otherPath => {
                    const indexOfLastPlaceInOtherPath = otherPath.findIndex(otherPlace => coordsMatch(otherPlace, lastPlace))
                    return indexOfLastPlaceInOtherPath !== -1 && indexOfLastPlaceInOtherPath < path.length - 1
                }
            )
        }
        return paths.filter(path => !lastPlaceReachedSoonerInOtherPath(path))
    }

    const expandUntilReach = (pathsInProgress: Coords[][], maxPathLength: number, currentStep = 0): Coords[] | undefined => {
        currentStep = currentStep + 1
        const extendedPaths = extendAllPaths(pathsInProgress)
        const succesfulPath = extendedPaths.find(hasReachedGoal)
        console.log({
            currentStep,
            pathsInProgress: pathsInProgress.length,
            completedPaths: extendedPaths.filter(hasReachedGoal).length
        })
        if (succesfulPath) {
            return succesfulPath
        }
        if (currentStep >= maxPathLength) {
            return undefined
        }
        return expandUntilReach(purgePaths(extendedPaths), maxPathLength, currentStep)
    }

    const path = expandUntilReach([[start]], maxPathLength)
    return path || []
};
