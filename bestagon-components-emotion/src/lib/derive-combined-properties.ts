import { CSSProperties } from "react"
import { HexContainerProps } from "./hex-container-context"
import { buildHexagonBoxCss, coordinatesInlineStyle } from "./shared-styles"
import { HertitableHexProps } from "./types"

export const getDerivedProperties = (
    hexContainer: HexContainerProps,
    directProperties: HertitableHexProps & { className?: string, style?: CSSProperties },
    positionInContainer: number,
) => {
    const {
        container,
        getClassNames,
        getCoordinates,
        polygonClassNames: inheritedPolygonClassNames = [],
        polygonStyle: inheritedPolygonStyle = {},
        hexStyle: inheritedHexStyle = {},
        getCss: inheritiedGetCss,
        size,
    } = hexContainer

    const classNames = getClassNames(positionInContainer)

    if (directProperties.className) {
        classNames.push(directProperties.className)
    }

    const coordinates = getCoordinates(positionInContainer)

    return {
        css:
            inheritiedGetCss
                ? inheritiedGetCss(positionInContainer, size, container)
                : buildHexagonBoxCss(-1, directProperties.size ?? 'normal')
        ,
        classNames,
        combinedHexStyle: {
            ...inheritedHexStyle,
            ...directProperties.hexStyle,
            ...directProperties.style,
            ...coordinatesInlineStyle(coordinates),
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

