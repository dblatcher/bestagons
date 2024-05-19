import React, { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react";
import { AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP, countChildren, getHexDimensionsForSize } from "../helpers";
import { HexContainerContext } from "../hex-container-context";
import { buildHexagonBoxCss } from "../shared-styles";
import { HertitableHexProps, HexSize } from "../types";
import { useStatefulRef } from "../use-stateful-ref";
import { NumberedChildren } from "./NumberedChildren";
import { css } from "@emotion/react";

type Props = HertitableHexProps & {
    children: ReactNode
    extraHeight?: boolean
    startLow?: boolean
    hexClassNames?: string[]
}

const containerCss = (
    size: HexSize,
    rowCount: number,
    numberOfChildElements: number, hexesPerRow: number,
    startLow: boolean
) => {
    const numberInLastRow = numberOfChildElements % hexesPerRow
    const hexesHigh = startLow
        ? rowCount + .5
        : (numberInLastRow === 1) ? rowCount : rowCount + .5;

    return css({
        position: 'relative',
        pointerEvents: 'none',
        minHeight: getHexDimensionsForSize(size).height * hexesHigh,
    })
}

const higherLevelGetStyleForBox = (hexesPerRow: number, startLow = false,) =>
    (position: number, container?: HTMLElement): CSSProperties => {
        if (position === -1) {
            return {}
        }
        if (!container) {
            return { visibility: 'hidden' }
        }
        const row = Math.floor(position / hexesPerRow)
        const spacesInPreviousRows = row * hexesPerRow
        const offsetPosition = position - spacesInPreviousRows
        const isOdd = offsetPosition % 2 === 1;
        const rowTranslate = 100 * row
        const translateY = startLow
            ? isOdd ? rowTranslate : rowTranslate + 50
            : isOdd ? rowTranslate + 50 : rowTranslate;
        const translateX = offsetPosition * (100 * AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP)
        return {
            transform: `translateX(${translateX}%) translateY(${translateY}%)`,
        }
    }


const getHexesPerRow = (containerWidth: number, hexWidth: number): number => {
    const spacePerHex = hexWidth * AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP;
    const extraSpaceForLastHex = hexWidth * (1 - AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP)
    const numberThatWouldFitWithoutExtra = Math.floor(containerWidth / spacePerHex)
    if (containerWidth > (numberThatWouldFitWithoutExtra * spacePerHex) + extraSpaceForLastHex) {
        return Math.max(1, numberThatWouldFitWithoutExtra)
    }
    return Math.max(1, numberThatWouldFitWithoutExtra - 1)
}

export const HexWrapper: React.FunctionComponent<Props> = ({
    children,
    extraHeight,
    startLow = false,
    hexClassNames = [],
    size = 'normal',
    ...heritables
}) => {
    const [containerWidth, setContainerWidth] = useState(1000)
    const [container, containerRef] = useStatefulRef((container) => {
        setContainerWidth(container.clientWidth)
    })
    const numberOfChildElements = countChildren(children)
    const hexDims = getHexDimensionsForSize(size);
    const hexesPerRow = getHexesPerRow(containerWidth, hexDims.width)
    const rowCount = Math.ceil(numberOfChildElements / hexesPerRow)

    const handleResize = useCallback(() => {
        setContainerWidth(container?.clientWidth ?? containerWidth)
    }, [container, containerWidth, numberOfChildElements])

    useEffect(() => {
        window?.addEventListener('resize', handleResize)
        return () => {
            window?.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    const getStyle = higherLevelGetStyleForBox(hexesPerRow, startLow)

    return (
        <HexContainerContext.Provider value={{
            container, getClassNames: () => hexClassNames, getStyle, ...heritables,
            getCss: buildHexagonBoxCss, size,
        }}>
            <section
                css={containerCss(size, rowCount, numberOfChildElements, hexesPerRow, startLow)}
                ref={containerRef}
            >
                <NumberedChildren children={children} />
            </section>
        </HexContainerContext.Provider>
    )
}

