import { CSSProperties, createContext, useContext } from "react";
import styles from './bestagon-components.module.css';

export const HexContainerContext = createContext<{
    container?: HTMLElement,
    getPosition: { (element?: HTMLElement): number },
    getClassNames: { (position: number, container?: HTMLElement): string[] },
    getStyle: { (position: number, container?: HTMLElement): CSSProperties }
}>({
    container: undefined,
    getPosition: () => -1,
    getClassNames: () => [styles.hexBox],
    getStyle: () => ({})
})

export const useHexContainer = () => useContext(HexContainerContext)