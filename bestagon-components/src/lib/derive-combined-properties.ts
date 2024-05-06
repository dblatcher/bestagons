import { removeSizeClasses, getSizeClasses } from "./helpers"
import { HexContainerProps } from "./hex-container-context"
import { HertitableHexProps } from "./types"

export const getDerivedProperties = (
    box: HTMLElement | undefined,
    hexContainer: HexContainerProps,
    directProperties: HertitableHexProps & { className?: string }
) => {
    const {
        container,
        polygonClassNames: inheritedPolygonClassNames = [],
        polygonStyle: inheritedPolygonStyle = {}
    } = hexContainer

    const positionInRow = hexContainer.getPosition(box)
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
        positioningStyle: hexContainer.getStyle(positionInRow, container),
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

