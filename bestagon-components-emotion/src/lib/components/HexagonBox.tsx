import React, { CSSProperties, ReactNode, ImgHTMLAttributes } from "react";
import { useChildNumber } from "./NumberedChildren";
import { getDerivedProperties } from "../derive-combined-properties";
import { useHexContainer } from "../hex-container-context";
import { HertitableHexProps } from "../types";
import { HexData, buildHexDataAttributes } from "../data-hex-attributes";
import { hexButtonCss } from "../shared-styles";
import { ImageOverlay } from "./ImageOverlay";
import { HexSvgOutline } from "./HexSvgOutline";


type Props = HertitableHexProps & {
    children?: ReactNode
    style?: CSSProperties
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>
    image?: ImgHTMLAttributes<HTMLImageElement>
    noSvg?: boolean
    hexData?: HexData
}

const ButtonHexagonBox: React.FunctionComponent<Props> = ({
    children,
    onClick,
    image,
    hexData,
    noSvg,
    ...heritablePropsAndClassName
}) => {
    const { classNames, combinedHexStyle, combinedPolygonClassNames, combinedPolygonStyle, css } = getDerivedProperties(
        useHexContainer(), heritablePropsAndClassName, useChildNumber()
    )

    return <button className={classNames.join(" ")}
        css={[css, hexButtonCss]}
        style={combinedHexStyle}
        onClick={onClick}
        {...buildHexDataAttributes(hexData)}
    >
        {image && <ImageOverlay image={image} />}
        {!noSvg && (
            <HexSvgOutline {...{ combinedPolygonClassNames, combinedPolygonStyle }} />
        )}
        {children}
    </button>
}

const DivHexagonBox: React.FunctionComponent<Props> = ({
    children,
    onClick,
    image,
    hexData,
    noSvg,
    ...heritablePropsAndClassName
}) => {
    const { classNames, combinedHexStyle, combinedPolygonClassNames, combinedPolygonStyle, css } = getDerivedProperties(
        useHexContainer(), heritablePropsAndClassName, useChildNumber()
    )

    return <div className={classNames.join(" ")}
        css={css}
        style={combinedHexStyle}
        onClick={onClick}
    >
        {image && <ImageOverlay image={image} />}
        {!noSvg && (
            <HexSvgOutline {...{ combinedPolygonClassNames, combinedPolygonStyle }} />
        )}
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
                <div css={{
                    position: 'absolute',
                    top: 0,
                    inset: `0 25%`,
                    height: '100%',
                }}>
                    {children}
                </div>
            )}
        </Component>
    )
}

