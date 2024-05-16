import { CSSProperties } from "react"
import { removeSizeClasses, getSizeClasses } from "./helpers"
import { HexContainerProps } from "./hex-container-context"
import { HertitableHexProps } from "./types"

export const getDerivedProperties = (
    hexContainer: HexContainerProps,
    directProperties: HertitableHexProps & { className?: string, style?: CSSProperties },
    positionInRow: number,
) => {
    const {
        container,
        polygonClassNames: inheritedPolygonClassNames = [],
        polygonStyle: inheritedPolygonStyle = {},
        hexStyle: inheritedHexStyle = {},
    } = hexContainer

    const classNames = hexContainer.getClassNames(positionInRow, container)

    if (directProperties.className) {
        classNames.push(directProperties.className)
    }

    // TO DO ? changing the size changes the posiitioning (uses %)
    // do I actually want to allow hexes in a container to be a different size to
    // the container?
    if (directProperties.size) {
        removeSizeClasses(classNames)
        classNames.push(...getSizeClasses(directProperties.size))
    }

    return {
        classNames,
        combinedHexStyle: {
            ...inheritedHexStyle,
            ...directProperties.hexStyle,
            ...directProperties.style,
            ...hexContainer.getStyle(positionInRow, container),
        },
        combinedPolygonClassNames: [
            ...inheritedPolygonClassNames,
            ...(directProperties.polygonClassNames ?? []),
        ],
        combinedPolygonStyle: {
            ...inheritedPolygonStyle,
            ...directProperties.polygonStyle,
        }
    }
}

