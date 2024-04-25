import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import styles from './bestagon-components.module.css';
import { useRowContext } from "./HexRow";

interface Props {
    children: ReactNode
    polygonStyle?: CSSProperties
}

const positionToClassNames = (position: number, container?: HTMLElement): string[] => {
    if (!container || position == -1) {
        return [styles.hexContainer]
    }
    if (position % 2 === 1) {

        return [styles.hexContainer, styles.hexContainerInGrid, styles.hexContainerInGridLower]
    }
    return [styles.hexContainer, styles.hexContainerInGrid]
}

const positionToStyle = (position: number, container?: HTMLElement): CSSProperties => {
    if (!container || position == -1) {
        return {}
    }
    const isOdd = position % 2 === 1;
    const translateY = isOdd ? 50 : 0
    return {
        transform: `translateX(${position * 75}%) translateY(${translateY}%)`
    }
}



export const HexagonBox: React.FunctionComponent<Props> = ({ children, polygonStyle }) => {

    const containerRef = useRef<HTMLDivElement>(null)
    const [container, setContainer] = useState<HTMLDivElement | undefined>(undefined)


    useEffect(() => {
        const { current } = containerRef
        if (!current || container === current) {
            return
        }
        setContainer(current)
    })

    const { container: rowContainer, getPosition } = useRowContext()
    const positionInRow = getPosition(container)
    const classNames = positionToClassNames(positionInRow, container)
    const positioningStyle = positionToStyle(positionInRow, container)
    console.log({ rowContainer, container, positionInRow })

    return <div className={classNames.join(" ")} style={positioningStyle} ref={containerRef}>
        <svg className={styles.hexContainerSvg} viewBox="0 0 723 626">
            <polygon
                points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314"
                fill="none"
                stroke="black"
                strokeWidth="1"
                style={polygonStyle}
            />
        </svg>
        <div>
            {children}
        </div>
    </div>
}

