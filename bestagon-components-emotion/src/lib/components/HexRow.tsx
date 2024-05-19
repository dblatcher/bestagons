import React, { CSSProperties, ReactNode } from "react";
import { AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP, getHexDimensionsForSize } from "../helpers";
import { HexContainerContext } from "../hex-container-context";
import { buildHexagonBoxCss } from "../shared-styles";
import { HertitableHexProps, HexSize } from "../types";
import { useStatefulRef } from "../use-stateful-ref";
import { NumberedChildren } from "./NumberedChildren";
import { css } from "@emotion/react";

type Props = HertitableHexProps & {
    children: ReactNode
    extraHeight?: boolean
    hexClassNames?: string[]
    xOffset?: number
    startLow?: boolean
}

const containerCss = (
    extraHeight?: boolean,
    size?: HexSize
) => css({
    position: 'relative',
    pointerEvents: 'none',
    minHeight: getHexDimensionsForSize(size).height * (extraHeight ? 1.5 : 1),
})


const higherLevelGetCoordinates = (xOffset = 0, startLow = false) =>
    (position: number): { x: number, y: number } | undefined => {
        if (position === -1) {
            return undefined
        }
        const offsetPosition = position + Math.floor(xOffset)
        const isOdd = offsetPosition % 2 === 1;
        const translateY = startLow
            ? isOdd ? 0 : 50
            : isOdd ? 50 : 0;
        const translateX = offsetPosition * (100 * AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP)
        return {
            x: translateX,
            y: translateY,
        }
    }

export const HexRow: React.FunctionComponent<Props> = ({
    children,
    extraHeight,
    xOffset,
    startLow,
    hexClassNames = [],
    size = 'normal',
    ...heritables
}) => {
    const [container, containerRef] = useStatefulRef()
    const getCoordinates = higherLevelGetCoordinates(xOffset, startLow)

    return (
        <HexContainerContext.Provider value={{
            container, getClassNames: () => hexClassNames, getCoordinates: getCoordinates, ...heritables,
            getCss: buildHexagonBoxCss, size,
        }}>
            <section
                css={containerCss(extraHeight, size)}
                ref={containerRef}
            >
                <NumberedChildren children={children} />
            </section>
        </HexContainerContext.Provider>
    )
}

