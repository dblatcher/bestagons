import React, { ReactNode, createContext, useContext } from "react";
import styles from './bestagon-components.module.css';
import { useStatefulRef } from "./use-stateful-ref";

interface Props {
    children: ReactNode
}

const RowContext = createContext<{
    container?: HTMLElement
    getPosition: { (element?: HTMLElement): number }
}>({
    container: undefined,
    getPosition: () => -1
})

export const useRowContext = () => useContext(RowContext)

export const HexRow: React.FunctionComponent<Props> = ({ children }) => {

    const [container, containerRef] = useStatefulRef() 

    const getPosition = (child?: HTMLElement): number => {
        if (!container || !child) {
            return -1
        }
        return Array.from(container.children).indexOf(child)
    }

    return (
        <RowContext.Provider value={{
            container, getPosition
        }}>
            <section className={styles.hexRow} ref={containerRef}>
                {!!container && <>
                    {children}
                </>}
            </section>
        </RowContext.Provider>
    )
}

