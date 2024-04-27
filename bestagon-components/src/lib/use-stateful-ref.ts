import { RefObject, useEffect, useRef, useState } from "react"


export const useStatefulRef = <T extends HTMLElement = HTMLElement>(
    onChange?: { (value: T): void }
): [T | undefined, RefObject<T>] => {

    const ref = useRef<T>(null)
    const [state, setState] = useState<T | undefined>(undefined)


    useEffect(() => {
        const { current } = ref
        if (!current || state === current) {
            return
        }
        setState(current)
        if (onChange) {
            onChange(current)
        }
    })

    return [state, ref]
}