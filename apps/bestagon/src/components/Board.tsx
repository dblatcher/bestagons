// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HexRow, HexagonBox } from '@bestagon-mono/bestagon-components';
import React, { CSSProperties, useState } from 'react';

interface Props {
    rows: number
    width: number
}


const getZeroBasedNumbers = (length: number) => {
    const list: number[] = new Array(length);
    list.fill(0);
    return list.map((_, index) => index);
}

const isHexAdjacent = (x1: number, y1: number, x2: number, y2: number, startLow = false): boolean => {
    const xDif = Math.abs(x1 - x2)
    const yDif = Math.abs(y1 - y2)
    if (xDif === 0 && yDif === 1) {
        return true
    }
    if (y1 === y2 && xDif === 1) {
        return true
    }
    const upIsAdjacent = x1 % 2 === (startLow ? 1 : 0)
    const adjacentY = upIsAdjacent ? 1 : -1;
    if (y1 - y2 === adjacentY && xDif === 1) {
        return true
    }
    return false
}

const startLow = false

export const Board: React.FunctionComponent<Props> = ({ rows, width }) => {

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const getStyle = (row: number, col: number): CSSProperties => {
        if (row === y && col === x) {
            return {
                backgroundColor: 'orange'
            }
        }
        if (isHexAdjacent(x, y, col, row, startLow)) {
            return {
                backgroundColor: 'yellow'
            }
        }
        return {}
    }

    const getSelectedElement = () => {
        return document.querySelector(`[data-col="${x}"][data-row="${y}"]`)
    }

    const logClientCoords = () => {
        const element = getSelectedElement()?.parentElement?.parentElement
        if (!element) {
            return
        }
        const {clientLeft,clientTop,} = element
        console.log({element, clientLeft,clientTop})
        console.log(element.getBoundingClientRect())
    }

    return (
        <div>
            
            {getZeroBasedNumbers(rows).map((row) => (
                <HexRow startLow={startLow} size='small' key={row} extraHeight={row === rows - 1}>
                    {getZeroBasedNumbers(width).map((col) => (
                        <HexagonBox
                            onClick={() => {
                                setX(col);
                                setY(row);
                            }}
                            style={getStyle(row, col)} key={col}
                        >
                            <span data-col={col} data-row={row}> {col} , {row}</span>
                        </HexagonBox>
                    ))}
                </HexRow>
            ))}
            <button onClick={logClientCoords}>t</button>
        </div>
    );
}

