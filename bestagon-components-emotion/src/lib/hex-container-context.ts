import { CSSProperties, createContext, useContext } from "react";
import styles from './bestagon-components.module.css';
import { SerializedStyles, css } from "@emotion/react";
import { HexSize } from "./types";

export type HexContainerProps = {
    container?: HTMLElement,
    getClassNames: { (position: number, container?: HTMLElement): string[] },
    getCss?: { (position: number, size: HexSize, container?: HTMLElement): SerializedStyles },
    getStyle: { (position: number, container?: HTMLElement): CSSProperties }
    polygonClassNames?: string[],
    polygonStyle?: CSSProperties,
    hexStyle?: CSSProperties,
    size: HexSize,
}

export const HexContainerContext = createContext<HexContainerProps>({
    container: undefined,
    getClassNames: () => [styles.hexBox],
    getStyle: () => ({}),
    size: 'normal',
})

export const useHexContainer = () => useContext(HexContainerContext)