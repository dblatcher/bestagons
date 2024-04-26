import React, { CSSProperties, ReactNode } from "react";
import styles from './bestagon-components.module.css';
import { HexContainerContext } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";
import { getChildIndex, getSizeClasses } from "./helpers";

interface Props {
    children: ReactNode
    extraHeight?: boolean
    size?: 'normal' | 'big' | 'small'
}

const getStyle = (position: number, container?: HTMLElement): CSSProperties => {
    if (!container || position == -1) {
        return {}
    }
    const isOdd = position % 2 === 1;
    const translateY = isOdd ? 50 : 0
    const translateX = position * 74.6
    return {
        transform: `translateX(${translateX}%) translateY(${translateY}%)`
    }
}

const getClassNamesForRow = (
    extraHeight?: boolean,
    size?: 'normal' | 'big' | 'small'
): string[] => {
    const heightClasses = extraHeight ? styles.hexRowExtraHeight : []
    return [styles.hexRow, getSizeClasses(size), heightClasses].flat()
}

const higherLevelGetClassNamesForBox = (sizeClasses: string[]) =>
    (position: number, container?: HTMLElement): string[] => {
        if (!container || position == -1) {
            return [styles.hexBox, ...sizeClasses,]
        }
        if (position % 2 === 1) {
            return [styles.hexBox, ...sizeClasses, styles.hexBoxAbsolute, styles.hexContainerInGridLower]
        }
        return [styles.hexBox, ...sizeClasses, styles.hexBoxAbsolute]
    }

export const HexRow: React.FunctionComponent<Props> = ({ children, extraHeight, size }) => {
    const [container, containerRef] = useStatefulRef()
    const getPosition = (child?: HTMLElement): number => getChildIndex(container, child)
    const getClassNames = higherLevelGetClassNamesForBox(getSizeClasses(size));
    const classNamesForRow = getClassNamesForRow(extraHeight, size)

    return (
        <HexContainerContext.Provider value={{
            container, getPosition, getClassNames, getStyle,
        }}>
            <section className={classNamesForRow.join(" ")} ref={containerRef}>
                {!!container && <>
                    {children}
                </>}
            </section>
        </HexContainerContext.Provider>
    )
}

