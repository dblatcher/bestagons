import React, { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react";
import styles from './bestagon-components.module.css';
import { HexContainerContext } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";
import { getChildIndex, getSizeClasses } from "./helpers";

interface Props {
    children: ReactNode
    extraHeight?: boolean
    size?: 'normal' | 'big' | 'small'
    startLow?: boolean
}

const higherLevelGetStyleForRow = (hexWidth: number, startLow = false,) =>
    (position: number, container?: HTMLElement): CSSProperties => {
        if (!container || position == -1) {
            return {}
        }

        const row = Math.floor(position / hexWidth)

        const spacesInPreviousRows = row * hexWidth

        const offsetPosition = position - spacesInPreviousRows
        const isOdd = offsetPosition % 2 === 1;

        const rowTranslate = 100 * row

        const translateY = startLow
            ? isOdd ? rowTranslate : rowTranslate + 50
            : isOdd ? rowTranslate + 50 : rowTranslate;
        const translateX = offsetPosition * 74.6
        return {
            transform: `translateX(${translateX}%) translateY(${translateY}%)`
        }
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

const getClassNamesForRow = (
    extraHeight?: boolean,
    size?: 'normal' | 'big' | 'small'
): string[] => {
    const heightClasses = extraHeight ? styles.hexRowExtraHeight : []
    return [styles.hexRow, getSizeClasses(size), heightClasses].flat()
}

export const HexWrapper: React.FunctionComponent<Props> = ({ children, extraHeight, size = 'normal', startLow }) => {
    const [containerWidth, setContainerWidth] = useState(1000)
    const [numberOfChildElements, setNumberOfChildElements] = useState(1)
    const [container, containerRef] = useStatefulRef((container) => {
        setContainerWidth(container.clientWidth)
        setNumberOfChildElements(container.children.length)
    })

    const hexWidth = Math.floor(containerWidth / 130)
    const rowCount = Math.ceil(numberOfChildElements / hexWidth)


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
    const getClassNames = higherLevelGetClassNamesForBox(getSizeClasses(size));
    const getStyle = higherLevelGetStyleForRow(hexWidth, startLow)
    const classNamesForRow = getClassNamesForRow(extraHeight, size)

    return (
        <HexContainerContext.Provider value={{
            container, getPosition, getClassNames, getStyle,
        }}>
            <section className={classNamesForRow.join(" ")} ref={containerRef} style={{
                minHeight: 130 * (.5 + rowCount)
            }}>
                {children}
            </section>
        </HexContainerContext.Provider>
    )
}

