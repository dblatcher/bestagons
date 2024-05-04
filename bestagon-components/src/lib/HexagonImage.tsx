import React, { CSSProperties, ReactNode } from "react";
import { HexagonBox } from "./HexagonBox";

interface Props {
    children?: ReactNode
    polygonStyle?: CSSProperties
    polygonClassNames?: string[]
    onClick?: React.MouseEventHandler<HTMLElement>
    src: string
}


export const HexagonImage: React.FunctionComponent<Props> = ({ children, polygonStyle, polygonClassNames, onClick, src }) => {

    return <HexagonBox
        {...{
            polygonStyle: { ...polygonStyle, fill: "none" },
            polygonClassNames,
            onClick
        }}

        image={{ src }}
    >{children}</HexagonBox>
}

