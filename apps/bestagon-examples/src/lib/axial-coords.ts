const { abs } = Math

export interface AxialCoords { q: number; r: number; };

export const getAxialDistance = (a: AxialCoords, b: AxialCoords) => (abs(a.q - b.q)
    + abs(a.q + a.r - b.q - b.r)
    + abs(a.r - b.r)) / 2;

export const isAxialAdjacent = (
    axial1: AxialCoords,
    axial2: AxialCoords,
): boolean => {
    const rDiff = axial2.r - axial1.r
    const qDiff = axial2.q - axial1.q
    return abs(rDiff) <= 1 && abs(qDiff) <= 1 && abs(qDiff + rDiff) <= 1 && !(rDiff === 0 && qDiff === 0)
};