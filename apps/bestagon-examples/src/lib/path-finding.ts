import { OffsetCoords, GridDef, coordsMatch, getOpenAdjacents, getDistance } from "./grid-functions";

export const pathFindFailures = {
    NO_ROUTE: 'no route',
    NOT_FOUND_WITHIN_STEPS: 'not found within maximum steps',
    TOO_HARD: 'not found within loop limit',
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


type AStarPath = {
    steps: OffsetCoords[]
    cost: number
    heuristicScore: number
    reachedGoal: boolean
}

/** sort of working, but needs more thought */
export const aStar = (start: OffsetCoords, dest: OffsetCoords, grid: GridDef, maxPathLength = 10): { path: OffsetCoords[], failure?: PathfindFailCode } => {

    const getStepCost = (_from: OffsetCoords, _to: OffsetCoords) => 1;

    /**low is good */
    const calculateScore = (lastInPath: OffsetCoords) => getDistance(lastInPath, dest, grid.evenColsLow)
    const lowScoreLowCostFirst = (a: AStarPath, b: AStarPath) => (a.heuristicScore - b.heuristicScore) || (a.cost - b.cost)

    const branchPath = (path: AStarPath): AStarPath[] => {
        const lastHex = path.steps[path.steps.length - 1];
        const neighboursToLast = getOpenAdjacents(lastHex, grid)

        const neighboursToLastNotVisitedAlready = neighboursToLast.filter(neighbour => !path.steps.some(hex => coordsMatch(hex, neighbour)))
        return neighboursToLastNotVisitedAlready.map(neighbour => ({
            steps: [...path.steps, neighbour],
            cost: path.cost + getStepCost(lastHex, neighbour),
            heuristicScore: calculateScore(neighbour),
            reachedGoal: coordsMatch(neighbour, dest)
        })).sort(lowScoreLowCostFirst)
    }

    //**assumes paths are sorted */
    const extendBestIncompletePath = (paths: AStarPath[]): AStarPath[] => {
        const copy = [...paths]
        const bestPath = copy.find(path => !path.reachedGoal)
        if (!bestPath) {
            return copy
        }
        const branched = branchPath(bestPath)
        copy.splice(copy.indexOf(bestPath), 1, ...branched)
        return copy
    }

    const paths: AStarPath[] = getOpenAdjacents(start, grid).map(neighbour => (
        {
            steps: [start, neighbour],
            cost: getStepCost(start, neighbour),
            heuristicScore: calculateScore(neighbour),
            reachedGoal: coordsMatch(neighbour, dest),
        }
    )).sort(lowScoreLowCostFirst)



    const timesToTry = 500
    const recursiveExtend = (paths: AStarPath[], cycle = 0): AStarPath | PathfindFailCode => {
        cycle++

        // need to track the lowest cost to each node found so far
        // so i can prune the paths that take longer to get somewhere than an earlier path
        //
        // A - B - C - E
        //     \  /
        //       D
        //
        // don't explore A-B-D-C-E when A-B-C-E was a dead end
        // remember, A-B-C-E is already popped out of the array

        // need to not extend paths further if already past max steps
        const withBestPathExtended = extendBestIncompletePath(paths).sort(lowScoreLowCostFirst)
        if (withBestPathExtended.length === 0) {
            return 'NO_ROUTE'
        }
        const bestSuccess = withBestPathExtended.find(path => path.reachedGoal)
        if (bestSuccess) {
            console.table(withBestPathExtended)
            return bestSuccess
        }
        if (cycle >= timesToTry) {
            console.table(withBestPathExtended)
            return 'TOO_HARD'
        }
        return recursiveExtend(withBestPathExtended, cycle)
    }

    const result = recursiveExtend(paths)


    if (typeof result === 'string') {
        return {
            path: [],
            failure: result
        }
    }

    return { path: result.steps }


}