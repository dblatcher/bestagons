import React, { CSSProperties, ReactNode } from "react";
import styles from './bestagon-components.module.css';
import { HexContainerContext } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";
import { AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP, getChildIndex, getSizeClasses } from "./helpers";

interface Props {
    children: ReactNode
    extraHeight?: boolean
    size?: 'normal' | 'big' | 'small'
    xOffset?: number
    startLow?: boolean
    polygonClassNames?: string[]
    hexClassNames?: string[]
}

const higherLevelGetStyleForBox = (xOffset = 0, startLow = false) =>
    (position: number, container?: HTMLElement): CSSProperties => {
        if (!container || position == -1) {
            return {}
        }
        const offsetPosition = position + Math.floor(xOffset)
        const isOdd = offsetPosition % 2 === 1;
        const translateY = startLow
            ? isOdd ? 0 : 50
            : isOdd ? 50 : 0;
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

export const HexRow: React.FunctionComponent<Props> = ({
    children,
    extraHeight,
    size,
    xOffset,
    startLow,
    polygonClassNames,
    hexClassNames = [],
}) => {
    const [container, containerRef] = useStatefulRef()
    const getPosition = (child?: HTMLElement): number => getChildIndex(container, child)
    const getClassNames = higherLevelGetClassNamesForBox(getSizeClasses(size), hexClassNames);
    const getStyle = higherLevelGetStyleForBox(xOffset, startLow)
    const classNamesForContainer = getClassNamesForContainer(extraHeight, size)

    return (
        <HexContainerContext.Provider value={{
            container, getPosition, getClassNames, getStyle, polygonClassNames,
        }}>
            <section
                className={classNamesForContainer.join(" ")}
                ref={containerRef}
            >
                {!!container && <>
                    {children}
                </>}
            </section>
        </HexContainerContext.Provider>
    )
}

