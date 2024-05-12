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
            polygonStyle: { ...polygonStyle, fill: "none" },
            polygonClassNames,
            onClick
        }}
        image={imageProps}
    >{children}</HexagonBox>
}

