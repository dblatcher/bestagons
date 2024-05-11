import { CSSProperties, createContext, useContext } from "react";
import styles from './bestagon-components.module.css';

export type HexContainerProps = {
    container?: HTMLElement,
    getClassNames: { (position: number, container?: HTMLElement): string[] },
    getStyle: { (position: number, container?: HTMLElement): CSSProperties }
    polygonClassNames?: string[],
    polygonStyle?: CSSProperties,
    hexStyle?: CSSProperties,
}

export const HexContainerContext = createContext<HexContainerProps>({
    container: undefined,
    getClassNames: () => [styles.hexBox],
    getStyle: () => ({}),
})

export const useHexContainer = () => useContext(HexContainerContext)