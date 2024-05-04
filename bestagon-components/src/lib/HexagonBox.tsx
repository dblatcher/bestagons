import React, { CSSProperties, ReactNode } from "react";
import styles from './bestagon-components.module.css';
import { useHexContainer } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";

interface Props {
    children: ReactNode
    polygonStyle?: CSSProperties
    polygonClassNames?: string[]
    onClick?: React.MouseEventHandler<HTMLElement>
    image?: { src: string }
}


export const HexagonBox: React.FunctionComponent<Props> = ({ children, polygonStyle, polygonClassNames, onClick, image }) => {

    const [box, boxRef] = useStatefulRef<HTMLDivElement>()

    const { container, getPosition, getStyle, getClassNames, polygonClassNames: inheritedPolygonClassNames = [] } = useHexContainer()
    const positionInRow = getPosition(box)
    const classNames = getClassNames(positionInRow, container)
    const positioningStyle = getStyle(positionInRow, container)

    const polygonClassList = [
        ...(inheritedPolygonClassNames ?? []),
        ...(polygonClassNames ?? []),
    ]

    // do to - if onClick, should be button
    return <div className={classNames.join(" ")}
        style={positioningStyle}
        ref={boxRef}
        onClick={onClick}
    >

        {image && (
            <img src={image.src}
                style={{
                    zIndex: 0,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    inset: 0,
                }} />
        )}

        <svg className={styles.hexBox_svg} viewBox="0 0 723 626">
            <polygon
                points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314"
                fill="none"
                stroke="black"
                strokeWidth="1"
                style={polygonStyle}
                className={polygonClassList.join(" ")}
            />
        </svg>
        {children && (
            <div className={styles.hexBox_content}>
                {children}
            </div>
        )}
    </div>
}

