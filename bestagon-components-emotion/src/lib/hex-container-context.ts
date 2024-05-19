import { SerializedStyles } from "@emotion/react";
import { CSSProperties, createContext, useContext } from "react";
import { HexSize } from "./types";

export type HexContainerProps = {
    container?: HTMLElement,
    getClassNames: { (position: number): string[] },
    getCss?: { (position: number, size: HexSize, container?: HTMLElement): SerializedStyles },
    getCoordinates: { (position: number): { x: number, y: number } | undefined }
    polygonClassNames?: string[],
    polygonStyle?: CSSProperties,
    hexStyle?: CSSProperties,
    size: HexSize,
}

export const HexContainerContext = createContext<HexContainerProps>({
    container: undefined,
    getClassNames: () => [],
    getCoordinates: () => (undefined),
    size: 'normal',
})

export const useHexContainer = () => useContext(HexContainerContext)