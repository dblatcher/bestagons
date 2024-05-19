export const isHexAdjacent = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    startLow = false
): boolean => {
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