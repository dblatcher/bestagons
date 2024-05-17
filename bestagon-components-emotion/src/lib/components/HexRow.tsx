import React, { CSSProperties, ReactNode } from "react";
import styles from '../bestagon-components.module.css';
import { AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP, getSizeClasses } from "../helpers";
import { HexContainerContext } from "../hex-container-context";
import { buildContainerCss, buildHexagonBoxCss } from "../shared-styles";
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

const higherLevelGetStyleForBox = (xOffset = 0, startLow = false) =>
    (position: number, container?: HTMLElement): CSSProperties => {
        if (position === -1) {
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
    const getStyle = higherLevelGetStyleForBox(xOffset, startLow)

    return (
        <HexContainerContext.Provider value={{
            container, getClassNames: () => hexClassNames, getStyle, ...heritables,
            getCss: buildHexagonBoxCss, size,
        }}>
            <section
                css={buildContainerCss(extraHeight, size)}
                ref={containerRef}
            >
                <NumberedChildren children={children} />
            </section>
        </HexContainerContext.Provider>
    )
}

