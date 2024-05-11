import React, { useEffect, useState } from "react"

interface Props {
    boardRef: React.RefObject<HTMLElement>
    x: number, y: number,
    findHex: { (x: number, y: number): HTMLElement | undefined }
}

export const FigureOnHex: React.FunctionComponent<Props> = ({ boardRef, findHex, x, y }) => {

    const [figureX, setFigureX] = useState(0)
    const [figureY, setFigureY] = useState(0)
    const [doneInitialSet] = useState(false)

    const setFigurePosition = () => {
        const hex = findHex(x, y)
        const board = boardRef.current
        if (!board || !hex) {
            return
        }
        const hexRect = hex.getBoundingClientRect()
        const boardRect = board.getBoundingClientRect()
        setFigureX(hexRect.x - boardRect.x + hexRect.width / 2)
        setFigureY(hexRect.y - boardRect.y + hexRect.height / 2)
    }

    useEffect(()=>{
        console.log('init',x,y, findHex(x,y)?.getAttribute('style'))
        setFigurePosition()
    },[doneInitialSet])



    useEffect(setFigurePosition, [boardRef, x, y])

    return (
        <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            color: 'yellow',
            background: 'black',
            transform: `translate(${figureX}px, ${figureY}px) translateX(-50%) translateY(-50%)`,
            transition: 'transform 1s',
        }}>
            <span>*</span>
        </div>
    )

}

