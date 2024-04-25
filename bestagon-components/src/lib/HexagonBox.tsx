import React, { CSSProperties, ReactNode } from "react";
import styles from './bestagon-components.module.css';
import { useHexContainer } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";

interface Props {
    children: ReactNode
    polygonStyle?: CSSProperties
}


export const HexagonBox: React.FunctionComponent<Props> = ({ children, polygonStyle }) => {

    const [box, boxRef] = useStatefulRef<HTMLDivElement>()

    const { container, getPosition, getStyle, getClassNames } = useHexContainer()
    const positionInRow = getPosition(box)
    const classNames = getClassNames(positionInRow, container)
    const positioningStyle = getStyle(positionInRow, container)

    return <div className={classNames.join(" ")} style={positioningStyle} ref={boxRef}>
        <svg className={styles.hexBoxSvg} viewBox="0 0 723 626">
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

