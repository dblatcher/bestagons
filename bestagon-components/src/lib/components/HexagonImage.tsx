import React, { CSSProperties, ImgHTMLAttributes, ReactNode } from "react";
import { HexagonBox } from "./HexagonBox";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
    children?: ReactNode
    polygonStyle?: CSSProperties
    polygonClassNames?: string[]
    onClick?: React.MouseEventHandler<HTMLElement>

}


export const HexagonImage: React.FunctionComponent<Props> = ({ children, polygonStyle, polygonClassNames, onClick, ...imageProps }) => {
    return <HexagonBox
        {...{
            polygonStyle,
            polygonClassNames,
            onClick
        }}
        image={imageProps}
        noSvg={!onClick && !polygonStyle && !polygonClassNames}
    >{children}</HexagonBox>
}

