import React, { CSSProperties, ReactNode } from "react";
import styles from './bestagon-components.module.css';
import { HexContainerContext } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";

interface Props {
    children: ReactNode
    extraHeight?: boolean
}

const getClassNames = (position: number, container?: HTMLElement): string[] => {
    if (!container || position == -1) {
        return [styles.hexBox]
    }
    if (position % 2 === 1) {
        return [styles.hexBox, styles.hexBoxAbsolute, styles.hexContainerInGridLower]
    }
    return [styles.hexBox, styles.hexBoxAbsolute]
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


export const HexRow: React.FunctionComponent<Props> = ({ children, extraHeight }) => {
    const [container, containerRef] = useStatefulRef()

    const getPosition = (child?: HTMLElement): number => {
        if (!container || !child) {
            return -1
        }
        return Array.from(container.children).indexOf(child)
    }

    const classNames = extraHeight ? [styles.hexRow, styles.hexRowExtraHeight] : [styles.hexRow]

    return (
        <HexContainerContext.Provider value={{
            container, getPosition,
            getClassNames, getStyle,
        }}>
            <section className={classNames.join(" ")} ref={containerRef}>
                {!!container && <>
                    {children}
                </>}
            </section>
        </HexContainerContext.Provider>
    )
}

