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

const getDerivedProperties = (
    directClassName: string | undefined,
    polygonClassNames: string[],
    polygonStyle: CSSProperties,
    box: HTMLElement | undefined,
    hexContainer: ReturnType<typeof useHexContainer>
) => {
    const {
        container,
        getPosition,
        getStyle,
        getClassNames,
        polygonClassNames: inheritedPolygonClassNames = [],
        polygonStyle: inheritedPolygonStyle = {}
    } = hexContainer
    const positionInRow = getPosition(box)
    const classNames = [...getClassNames(positionInRow, container), directClassName]
    const positioningStyle = getStyle(positionInRow, container)
    const combinedPolygonClassNames = [
        ...(inheritedPolygonClassNames ?? []),
        ...(polygonClassNames ?? []),
    ]
    const combinedPolygonStyle = {
        ...inheritedPolygonStyle,
        ...polygonStyle,
    }
    return { classNames, positioningStyle, combinedPolygonClassNames, combinedPolygonStyle }
}

const HexSvgOutline = ({ combinedPolygonStyle, combinedPolygonClassNames }: { combinedPolygonStyle?: CSSProperties, combinedPolygonClassNames: string[] }) => (
    <svg className={styles.hexBox_svg} viewBox="0 0 150 130">
        <polygon
            points="0,65 37.5,0 112.5,0 150,65 112.5,130 37.5,130 0,65"
            fill="none"
            stroke="black"
            strokeWidth="1"
            style={combinedPolygonStyle}
            className={combinedPolygonClassNames.join(" ")}
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
    polygonStyle = {},
    polygonClassNames = [],
    onClick,
    image
}) => {
    const [box, boxRef] = useStatefulRef<HTMLButtonElement>()
    const { classNames, positioningStyle, combinedPolygonClassNames, combinedPolygonStyle } = getDerivedProperties(
        directClassName, polygonClassNames, polygonStyle, box, useHexContainer()
    )

    return <button className={[styles.hexButton, ...classNames].join(" ")}
        style={positioningStyle}
        ref={boxRef}
        onClick={onClick}
    >
        <HexImage image={image} />
        <HexSvgOutline {...{ combinedPolygonClassNames, combinedPolygonStyle }} />
        {children}
    </button>
}

const DivHexagonBox: React.FunctionComponent<Props> = ({
    className: directClassName,
    children,
    polygonStyle = {},
    polygonClassNames = [],
    onClick,
    image
}) => {
    const [box, boxRef] = useStatefulRef<HTMLDivElement>()
    const { classNames, positioningStyle, combinedPolygonClassNames, combinedPolygonStyle } = getDerivedProperties(
        directClassName, polygonClassNames, polygonStyle, box, useHexContainer()
    )

    return <div className={classNames.join(" ")}
        style={positioningStyle}
        ref={boxRef}
        onClick={onClick}
    >
        <HexImage image={image} />
        <HexSvgOutline {...{ combinedPolygonClassNames, combinedPolygonStyle }} />
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

