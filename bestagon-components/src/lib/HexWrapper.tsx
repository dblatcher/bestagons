import React, { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react";
import styles from './bestagon-components.module.css';
import { HexContainerContext } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";
import { AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP, getChildIndex, getHexDimensionsForSize, getSizeClasses } from "./helpers";
import { HertitableHexProps } from "./types";

type Props = HertitableHexProps & {
    children: ReactNode
    extraHeight?: boolean
    startLow?: boolean
    hexClassNames?: string[]
}

const higherLevelGetStyleForBox = (hexesPerRow: number, startLow = false,) =>
    (position: number, container?: HTMLElement): CSSProperties => {
        if (!container || position == -1) {
            return {}
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
            transform: `translateX(${translateX}%) translateY(${translateY}%)`
        }
    }


const higherLevelGetClassNamesForBox = (sizeClasses: string[], hexClassNames: string[]) =>
    (position: number, container?: HTMLElement): string[] => {
        const base = [styles.hexBox, ...sizeClasses, ...hexClassNames]
        if (!container || position == -1) {
            return base
        }
        if (position % 2 === 1) {
            return [...base, styles.hexBoxAbsolute, styles.hexContainerInGridLower]
        }
        return [...base, styles.hexBoxAbsolute]
    }

const getClassNamesForContainer = (
    extraHeight?: boolean,
    size?: 'normal' | 'big' | 'small'
): string[] => {
    const heightClasses = extraHeight ? styles.hexRowExtraHeight : []
    return [styles.hexRow, getSizeClasses(size), heightClasses].flat()
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
    size = 'normal',
    startLow,
    polygonClassNames,
    hexClassNames = [],
    polygonStyle,
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


    const handleResize = useCallback((event: any) => {
        setContainerWidth(container?.clientWidth ?? containerWidth)
        setNumberOfChildElements(container?.children.length ?? 1)
    }, [container, numberOfChildElements])

    useEffect(() => {
        window?.addEventListener('resize', handleResize)
        return () => {
            window?.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    const getPosition = (child?: HTMLElement): number => getChildIndex(container, child)
    const getClassNames = higherLevelGetClassNamesForBox(getSizeClasses(size), hexClassNames);
    const getStyle = higherLevelGetStyleForBox(hexesPerRow, startLow)
    const classNamesForContainer = getClassNamesForContainer(extraHeight, size)

    return (
        <HexContainerContext.Provider value={{
            container, getPosition, getClassNames, getStyle, polygonClassNames, polygonStyle
        }}>
            <section
                className={classNamesForContainer.join(" ")}
                ref={containerRef}
                style={{
                    minHeight: hexDims.height * (.5 + rowCount),
                }}
            >
                {children}
            </section>
        </HexContainerContext.Provider>
    )
}

