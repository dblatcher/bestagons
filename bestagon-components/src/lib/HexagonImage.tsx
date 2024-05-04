import React, { CSSProperties, ReactNode } from "react";
import styles from './bestagon-components.module.css';
import { useHexContainer } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";
import { AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP } from "./helpers";

interface Props {
    children?: ReactNode
    polygonStyle?: CSSProperties
    polygonClassNames?: string[]
    onClick?: React.MouseEventHandler<HTMLElement>
    src: string
}


const xCo1 = 1 - AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP
const xCo2 = AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP

export const HexagonImage: React.FunctionComponent<Props> = ({ children, polygonStyle, polygonClassNames, onClick, src }) => {

    const [box, boxRef] = useStatefulRef<HTMLDivElement>()

    const { container, getPosition, getStyle, getClassNames, polygonClassNames: inheritedPolygonClassNames = [] } = useHexContainer()
    const positionInRow = getPosition(box)
    const classNames = getClassNames(positionInRow, container)
    const positioningStyle = getStyle(positionInRow, container)

    const polygonClassList = [
        ...(inheritedPolygonClassNames ?? []),
        ...(polygonClassNames ?? []),
    ]

    return <div className={classNames.join(" ")} style={positioningStyle} ref={boxRef}>
        <img src={src}
            onClick={onClick}
            style={{
                zIndex: 0,
                cursor: onClick && 'pointer',
                position: 'absolute',
                width: '100%',
                height: '100%',
                inset: 0,
                clipPath: `polygon(
                ${xCo1 * 100}% 0%, 
                ${xCo2 * 100}% 0%, 
                100% 50%, 
                ${xCo2 * 100}% 100%, 
                ${xCo1 * 100}% 100%, 
                0% 50%
            )`
            }} />
        <svg className={styles.hexBox_svg} viewBox="0 0 723 626">
            <polygon
                points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314"
                fill="none"
                stroke="black"
                strokeWidth="1"
                style={polygonStyle ?? { fill: 'none' }}
                className={polygonClassList.join(" ")}
            />
        </svg>
        <div className={styles.hexBox_content}>
            {children}
        </div>
    </div>
}

