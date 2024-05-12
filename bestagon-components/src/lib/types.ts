import { CSSProperties } from "react"

export type HexSize = 'normal' | 'big' | 'small' | 'xSmall'

export type HertitableHexProps = {
    hexStyle?:CSSProperties
    polygonStyle?: CSSProperties
    polygonClassNames?: string[]
    size?: HexSize
}