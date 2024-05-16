import React, { CSSProperties, ReactNode } from "react";
import { NumberedChildren } from "./NumberedChildren";
import styles from '../bestagon-components.module.css';
import { AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP, getSizeClasses } from "../helpers";
import { HexContainerContext } from "../hex-container-context";
import { HertitableHexProps, HexSize } from "../types";
import { useStatefulRef } from "../use-stateful-ref";

type Props = HertitableHexProps & {
    children: ReactNode
    extraHeight?: boolean
    hexClassNames?: string[]
    xOffset?: number
    startLow?: boolean
}

const higherLevelGetStyleForBox = (xOffset = 0, startLow = false) =>
    (position: number, container?: HTMLElement): CSSProperties => {
        if (position ===  -1) {
            return {}
        }
        if (!container) {
            return { visibility: 'hidden' }
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
        if (!container || position ===  -1) {
            return base
        }
        if (position % 2 === 1) {
            return [...base, styles.hexBoxAbsolute, styles.hexContainerInGridLower]
        }
        return [...base, styles.hexBoxAbsolute]
    }

const getClassNamesForContainer = (
    extraHeight?: boolean,
    size?: HexSize 
): string[] => {
    const heightClasses = extraHeight ? styles.hexRowExtraHeight : []
    return [styles.hexRow, getSizeClasses(size), heightClasses].flat()
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
    const getClassNames = higherLevelGetClassNamesForBox(getSizeClasses(size), hexClassNames);
    const getStyle = higherLevelGetStyleForBox(xOffset, startLow)
    const classNamesForContainer = getClassNamesForContainer(extraHeight, size)

    return (
        <HexContainerContext.Provider value={{
            container, getClassNames, getStyle, ...heritables
        }}>
            <section
                className={classNamesForContainer.join(" ")}
                ref={containerRef}
            >
                <NumberedChildren children={children} />
            </section>
        </HexContainerContext.Provider>
    )
}

