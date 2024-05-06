import { CSSProperties } from "react"

export type HexSize = 'normal' | 'big' | 'small'

export type HertitableHexProps = {
    hexStyle?:CSSProperties
    polygonStyle?: CSSProperties
    polygonClassNames?: string[]
    size?: HexSize
}