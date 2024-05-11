import React, { CSSProperties, ReactNode } from "react";
import { useChildNumber } from "./NumberedChildren";
import styles from '../bestagon-components.module.css';
import { getDerivedProperties } from "../derive-combined-properties";
import { useHexContainer } from "../hex-container-context";
import { HertitableHexProps } from "../types";
import { HexData, buildHexDataAttributes } from "../data-hex-attributes";

type Props = HertitableHexProps & {
    children: ReactNode
    style?: CSSProperties
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>
    image?: { src: string }
    hexData?: HexData
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
    hexData,
    ...heritablePropsAndClassName
}) => {
    const { classNames, combinedHexStyle, combinedPolygonClassNames, combinedPolygonStyle } = getDerivedProperties(
        useHexContainer(), heritablePropsAndClassName, useChildNumber()
    )

    return <button className={[styles.hexButton, ...classNames].join(" ")}
        style={combinedHexStyle}
        onClick={onClick}
        {...buildHexDataAttributes(hexData)}
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
    hexData,
    ...heritablePropsAndClassName
}) => {
    const { classNames, combinedHexStyle, combinedPolygonClassNames, combinedPolygonStyle } = getDerivedProperties(
        useHexContainer(), heritablePropsAndClassName, useChildNumber()
    )

    return <div className={classNames.join(" ")}
        style={combinedHexStyle}
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

