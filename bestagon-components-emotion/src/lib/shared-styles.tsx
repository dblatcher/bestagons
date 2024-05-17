import { SerializedStyles, css } from "@emotion/react"
import { getHexDimensionsForSize } from "./helpers"
import { HexSize } from "./types"

export const buildContainerCss = (
    extraHeight?: boolean,
    size?: HexSize
): SerializedStyles => {
    const dims = getHexDimensionsForSize(size)
    return css({
        position: 'relative',
        pointerEvents: 'none',
        minHeight: dims.height * (extraHeight ? 1.5 : 1),
    })
}

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