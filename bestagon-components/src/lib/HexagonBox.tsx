import React, { CSSProperties, ReactNode } from "react";
import styles from './bestagon-components.module.css';
import { useHexContainer } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";

interface Props {
    children: ReactNode
    className?: string;
    polygonStyle?: CSSProperties
    polygonClassNames?: string[]
    onClick?: React.MouseEventHandler<HTMLElement>
    image?: { src: string }
}

const getDerivedProperties = (directClassName: string | undefined, polygonClassNames: string[], box: HTMLElement | undefined, hexContainer: ReturnType<typeof useHexContainer>) => {
    const { container, getPosition, getStyle, getClassNames, polygonClassNames: inheritedPolygonClassNames = [] } = hexContainer
    const positionInRow = getPosition(box)
    const classNames = [...getClassNames(positionInRow, container), directClassName]
    const positioningStyle = getStyle(positionInRow, container)
    const polygonClassList = [
        ...(inheritedPolygonClassNames ?? []),
        ...(polygonClassNames ?? []),
    ]
    return { classNames, positioningStyle, polygonClassList }
}

const HexSvgOutline = ({ polygonStyle, polygonClassList }: { polygonStyle?: CSSProperties, polygonClassList: string[] }) => (
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
)

const HexImage = ({ image }: { image: Props['image'] }) => <>
    {image && (
        <img
            src={image.src}
            className={styles.hexBox_img}
        />
    )}
</>

const ButtonHexagonBox: React.FunctionComponent<Props> = ({
    className: directClassName,
    children,
    polygonStyle,
    polygonClassNames = [],
    onClick,
    image
}) => {
    const [box, boxRef] = useStatefulRef<HTMLButtonElement>()
    const { classNames, positioningStyle, polygonClassList } = getDerivedProperties(directClassName, polygonClassNames, box, useHexContainer())

    return <button className={[styles.hexButton, ...classNames].join(" ")}
        style={positioningStyle}
        ref={boxRef}
        onClick={onClick}
    >
        <HexImage image={image} />
        <HexSvgOutline {...{ polygonClassList, polygonStyle }} />
        {children}
    </button>
}

const DivHexagonBox: React.FunctionComponent<Props> = ({
    className: directClassName,
    children,
    polygonStyle,
    polygonClassNames = [],
    onClick,
    image
}) => {
    const [box, boxRef] = useStatefulRef<HTMLDivElement>()
    const { classNames, positioningStyle, polygonClassList } = getDerivedProperties(directClassName, polygonClassNames, box, useHexContainer())

    return <div className={classNames.join(" ")}
        style={positioningStyle}
        ref={boxRef}
        onClick={onClick}
    >
        <HexImage image={image} />
        <HexSvgOutline {...{ polygonClassList, polygonStyle }} />
        {children}
    </div>
}


export const HexagonBox: React.FunctionComponent<Props> = ({
    children,
    onClick,
    ...restOfProps
}) => {
    const Component = onClick ? ButtonHexagonBox : DivHexagonBox;
    return (
        <Component {...restOfProps} onClick={onClick}>
            {children && (
                <div className={styles.hexBox_content}>
                    {children}
                </div>
            )}
        </Component>
    )
}

