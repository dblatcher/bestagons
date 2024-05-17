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