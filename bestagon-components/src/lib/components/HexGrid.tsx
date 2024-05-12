// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactNode, forwardRef } from 'react';
import { getZeroBasedNumbers } from '../helpers';
import { HexSize } from '../types';
import { HexRow } from './HexRow';

interface Props {
    rows: number
    width: number
    size?: HexSize
    startLow?: boolean
    makeHex: { (x: number, y: number): ReactNode }
    ref?: React.RefObject<HTMLDivElement>
    children?: ReactNode
}

export const HexGrid = forwardRef<HTMLDivElement, Props>(
    ({ rows, width, makeHex, startLow = false, children, size }, ref) => {

        return (
            <div
                ref={ref}
                style={{
                    position: 'relative'
                }}>
                {
                    getZeroBasedNumbers(rows).map((row) => (
                        <HexRow startLow={startLow}
                            size={size}
                            key={row}
                            extraHeight={row === rows - 1}
                        >
                            {getZeroBasedNumbers(width).map((col) => makeHex(col, row))}
                        </HexRow>
                    ))
                }
                {children}
            </div>
        );
    })

