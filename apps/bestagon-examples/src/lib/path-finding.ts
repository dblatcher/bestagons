import { Coords, GridDef, coordsMatch, getOpenAdjacents } from "./grid-functions";


export const findPathInefficiently = (start: Coords, dest: Coords, grid: GridDef, maxPathLength = 100): Coords[] => {
    const stepsFrom = (path: Coords[]) => {
        const lastPlace = path[path.length - 1]
        return getOpenAdjacents(lastPlace, grid).map(
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

    const lastPlaceReachedSoonerInOtherPath = (path: Coords[], paths: Coords[][]) => {
        const lastPlace = path[path.length - 1]
        return paths.some(
            otherPath => {
                const indexOfLastPlaceInOtherPath = otherPath.findIndex(otherPlace => coordsMatch(otherPlace, lastPlace))
                return indexOfLastPlaceInOtherPath !== -1 && indexOfLastPlaceInOtherPath < path.length - 1
            }
        )
    }
    const purgePaths = (paths: Coords[][]): Coords[][] => {
        return paths.filter(path => !lastPlaceReachedSoonerInOtherPath(path, paths))
    }

    const expandUntilReach = (pathsInProgress: Coords[][], maxPathLength: number, currentStep = 0): Coords[] | undefined => {
        currentStep = currentStep + 1
        const extendedPaths = extendAllPaths(pathsInProgress)
        const succesfulPath = extendedPaths.find(hasReachedGoal)
        console.log({
            currentStep,
            pathsInProgress: pathsInProgress.length,
            succesfulPath: !!succesfulPath
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
