import React, { ReactNode, createContext, useContext } from "react"

interface Props {
    children: ReactNode
}

const ChildNumberContext = createContext<number>(-1)
export const useChildNumber = () => useContext(ChildNumberContext)

export const NumberedChildren: React.FunctionComponent<Props> = ({ children }) => {
    const childArray: ReactNode[] = Array.isArray(children) ? children : [children]
    return childArray.map((child, index) => (
        <ChildNumberContext.Provider value={index} key={index}>
            {child}
        </ChildNumberContext.Provider>
    ))
}
