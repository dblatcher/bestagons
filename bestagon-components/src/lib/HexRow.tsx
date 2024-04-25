import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import styles from './bestagon-components.module.css';

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

    const containerRef = useRef<HTMLDivElement>(null)
    const [container, setContainer] = useState<HTMLDivElement | undefined>(undefined)

    useEffect(() => {
        const { current } = containerRef
        if (!current || container === current) {
            return
        }
        setContainer(current)
    })

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

