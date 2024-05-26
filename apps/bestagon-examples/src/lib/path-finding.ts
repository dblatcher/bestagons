import { OffsetCoords, GridDef, coordsMatch, getOpenAdjacents, getDistance } from "./grid-functions";

export const pathFindFailures = {
    NO_ROUTE: 'no route',
    NOT_FOUND_WITHIN_STEPS: 'not found within maximum steps',
    TOO_FAR: 'too far to reach within maximum steps',
}


export type PathfindFailCode = keyof typeof pathFindFailures

export const breadthFirstSearch = (start: OffsetCoords, dest: OffsetCoords, grid: GridDef, maxPathLength = 12): { path: OffsetCoords[], failure?: PathfindFailCode } => {
    console.time('pathfind expand')
    const stepsFrom = (path: OffsetCoords[]) => {
        const lastPlace = path[path.length - 1]
        return getOpenAdjacents(lastPlace, grid).map(
            adjacent => [...path, adjacent]
        )
    }

    const extendAllPaths = (paths: OffsetCoords[][]) => {
        return paths.map(stepsFrom).flat(1)
    }

    const hasReachedGoal = (path: OffsetCoords[]): boolean => {
        const lastPlace = path[path.length - 1]
        return coordsMatch(lastPlace, dest)
    }

    const lastPlaceReachedSoonerInOtherPath = (path: OffsetCoords[], paths: OffsetCoords[][]) => {
        const lastPlace = path[path.length - 1]
        return paths.some(
            otherPath => {
                const indexOfLastPlaceInOtherPath = otherPath.findIndex(otherPlace => coordsMatch(otherPlace, lastPlace))
                return indexOfLastPlaceInOtherPath !== -1 && indexOfLastPlaceInOtherPath < path.length - 1
            }
        )
    }
    const purgePaths = (paths: OffsetCoords[][]): OffsetCoords[][] => {
        return paths.filter(path => !lastPlaceReachedSoonerInOtherPath(path, paths))
    }

    const expandUntilReach = (pathsInProgress: OffsetCoords[][], maxPathLength: number, currentStep = 0): OffsetCoords[] | PathfindFailCode => {
        currentStep = currentStep + 1
        const extendedPaths = extendAllPaths(pathsInProgress)
        const succesfulPath = extendedPaths.find(hasReachedGoal)
        if (succesfulPath) {
            return succesfulPath
        }
        if (pathsInProgress.length == 0) {
            return 'NO_ROUTE'
        }
        if (currentStep >= maxPathLength) {
            return 'NOT_FOUND_WITHIN_STEPS'
        }
        return expandUntilReach(purgePaths(extendedPaths), maxPathLength, currentStep)
    }

    const isTooFar = getDistance(start, dest, grid.evenColsLow) > maxPathLength
    const result = isTooFar ? 'TOO_FAR' : expandUntilReach([[start]], maxPathLength)
    console.timeEnd('pathfind expand')

    if (typeof result === 'string') {
        return {
            path: [],
            failure: result,
        }
    }
    return {
        path: result
    }
};
