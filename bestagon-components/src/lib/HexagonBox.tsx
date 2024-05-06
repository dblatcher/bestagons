import React, { CSSProperties, ReactNode } from "react";
import styles from './bestagon-components.module.css';
import { HexContainerProps, useHexContainer } from "./hex-container-context";
import { useStatefulRef } from "./use-stateful-ref";
import { HertitableHexProps } from "./types";
import { getSizeClasses, removeSizeClasses } from "./helpers";

type Props = HertitableHexProps & {
    children: ReactNode
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>
    image?: { src: string }
}

const getDerivedProperties = (
    box: HTMLElement | undefined,
    hexContainer: HexContainerProps,
    directProperties: HertitableHexProps & { className?: string }
) => {
    const {
        container,
        polygonClassNames: inheritedPolygonClassNames = [],
        polygonStyle: inheritedPolygonStyle = {}
    } = hexContainer

    const positionInRow = hexContainer.getPosition(box)
    const classNames = hexContainer.getClassNames(positionInRow, container)

    if (directProperties.className) {
        classNames.push(directProperties.className)
    }

    // TO DO ? changing the size changes the posiitioning (uses %)
    // do I actually want to allow hexes in a container to be a different size to
    // the container?
    if (directProperties.size) {
        removeSizeClasses(classNames)
        classNames.push(...getSizeClasses(directProperties.size))
    }

    return {
        classNames,
        positioningStyle: hexContainer.getStyle(positionInRow, container),
        combinedPolygonClassNames: [
            ...inheritedPolygonClassNames,
            ...(directProperties.polygonClassNames ?? []),
        ],
        combinedPolygonStyle: {
            ...inheritedPolygonStyle,
            ...directProperties.polygonStyle,
        }
    }
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
    children,
    onClick,
    image,
    ...heritablePropsAndClassName
}) => {
    const [box, boxRef] = useStatefulRef<HTMLButtonElement>()
    const { classNames, positioningStyle, combinedPolygonClassNames, combinedPolygonStyle } = getDerivedProperties(
        box, useHexContainer(), heritablePropsAndClassName
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
    children,
    onClick,
    image,
    ...heritablePropsAndClassName
}) => {
    const [box, boxRef] = useStatefulRef<HTMLDivElement>()
    const { classNames, positioningStyle, combinedPolygonClassNames, combinedPolygonStyle } = getDerivedProperties(
        box, useHexContainer(), heritablePropsAndClassName
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

