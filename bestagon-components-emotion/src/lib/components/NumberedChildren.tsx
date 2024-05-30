import React, { ReactNode, createContext, useContext } from "react"
import { toFlatChildArray } from "../helpers"

interface Props {
    children: ReactNode
}

const ChildNumberContext = createContext<number>(-1)
export const useChildNumber = () => useContext(ChildNumberContext)

export const NumberedChildren: React.FunctionComponent<Props> = ({ children }) => {
    const childArray: ReactNode[] = toFlatChildArray(children)
    return childArray.map((child, index) => (
        <ChildNumberContext.Provider value={index} key={index}>
            {child}
        </ChildNumberContext.Provider>
    ))
}
