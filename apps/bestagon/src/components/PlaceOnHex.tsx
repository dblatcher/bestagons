import React, { ReactNode, useCallback, useEffect, useState } from "react"

interface Props {
    boardRef: React.RefObject<HTMLElement>
    x: number,
    y: number,
    findHex: { (x: number, y: number): Element | undefined }
    children: ReactNode
}

export const PlaceOnHex: React.FunctionComponent<Props> = ({ boardRef, findHex, x, y, children }) => {
    const getFigurePosition = useCallback(() => {
        const hex = findHex(x, y)
        const board = boardRef.current
        if (!board || !hex) {
            return undefined
        }
        const hexRect = hex.getBoundingClientRect()
        const boardRect = board.getBoundingClientRect()
        return ({
            x: hexRect.x - boardRect.x + hexRect.width / 2,
            y: hexRect.y - boardRect.y + hexRect.height / 2
        })
    }, [x, y, findHex, boardRef])

    const [figureX, setFigureX] = useState(getFigurePosition()?.x ?? 0)
    const [figureY, setFigureY] = useState(getFigurePosition()?.y ?? 0)

    const setFigurePosition = () => {
        const coords = getFigurePosition()
        if (!coords) {
            return
        }
        setFigureX(coords.x)
        setFigureY(coords.y)
    }

    useEffect(setFigurePosition, [boardRef, x, y])

    return (
        <span style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate(${figureX}px, ${figureY}px) translateX(-50%) translateY(-50%)`,
            transition: 'transform 1s',
        }}>
            {children}
        </span>
    )

}

