import React, { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react";
import { AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP, getHexDimensionsForSize } from "../helpers";
import { HexContainerContext } from "../hex-container-context";
import { buildContainerCss, buildHexagonBoxCss } from "../shared-styles";
import { HertitableHexProps } from "../types";
import { useStatefulRef } from "../use-stateful-ref";
import { NumberedChildren } from "./NumberedChildren";

type Props = HertitableHexProps & {
    children: ReactNode
    extraHeight?: boolean
    startLow?: boolean
    hexClassNames?: string[]
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
        return numberThatWouldFitWithoutExtra
    }
    return numberThatWouldFitWithoutExtra - 1
}

export const HexWrapper: React.FunctionComponent<Props> = ({
    children,
    extraHeight,
    startLow,
    hexClassNames = [],
    size = 'normal',
    ...heritables
}) => {
    const [containerWidth, setContainerWidth] = useState(1000)
    const [numberOfChildElements, setNumberOfChildElements] = useState(1)
    const [container, containerRef] = useStatefulRef((container) => {
        setContainerWidth(container.clientWidth)
        setNumberOfChildElements(container.children.length)
    })

    const hexDims = getHexDimensionsForSize(size);

    const hexesPerRow = getHexesPerRow(containerWidth, hexDims.width)
    const rowCount = Math.ceil(numberOfChildElements / hexesPerRow)


    const handleResize = useCallback(() => {
        setContainerWidth(container?.clientWidth ?? containerWidth)
        setNumberOfChildElements(container?.children.length ?? 1)
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
                css={buildContainerCss(extraHeight, size)}
                ref={containerRef}
                style={{
                    minHeight: hexDims.height * (.5 + rowCount),
                }}
            >
                <NumberedChildren children={children} />
            </section>
        </HexContainerContext.Provider>
    )
}

