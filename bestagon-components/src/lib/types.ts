import { CSSProperties } from "react"

export type HexSize = 'normal' | 'big' | 'small'

export type HertitableHexProps = {
    polygonStyle?: CSSProperties
    polygonClassNames?: string[]
    size?: HexSize
}