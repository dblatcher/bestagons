import { css } from "@emotion/react"
import { CSSProperties } from "react"
import { getHexDimensionsForSize } from "./helpers"
import { HexSize } from "./types"


export const buildHexagonBoxCss = (position: number, size: HexSize, container?: HTMLElement) => {
    const dims = getHexDimensionsForSize(size)
    return css({
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);',
        boxSizing: 'border-box',
        pointerEvents: 'all',
        width: dims.width,
        height: dims.height,
        padding: `0 ${dims.width * (1 / 4)}px`,
        left: position === -1 ? undefined : 0,
        top: position === -1 ? undefined : 0,
        position: position === -1 ? 'relative' : 'absolute',
    })
}

export const coordinatesInlineStyle = (coordinates?: { x: number, y: number }): CSSProperties => {
    if (!coordinates) { return {} }
    const { x, y } = coordinates;
    return {
        transform: `translateX(${x}%) translateY(${y}%)`
    }
}

export const hexButtonCss = css({
    backgroundColor: 'unset',
    textAlign: 'unset',
    cursor: 'pointer',
    border: 'none',

    '>svg': {
        'polygon': {
            strokeWidth: 4,
            stroke: 'gray'
        }
    },

    '&:focus': {
        '>svg': {
            'polygon': {
                strokeWidth: 8,
                stroke: 'black'
            }
        }
    },

    '&:hover': {
        '>svg': {
            'polygon': {
                fill: 'rgba(10, 10, 10, .1)',
                stroke: 'black'
            }
        }
    },
})

export const hexAnchorCss = css({
    display: 'block',
})