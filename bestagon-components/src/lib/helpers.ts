import styles from './bestagon-components.module.css';

export type HexSize = 'normal' | 'big' | 'small'

export const getChildIndex = (container?: HTMLElement, child?: HTMLElement): number => {
    if (!container || !child) {
        return -1
    }
    return Array.from(container.children).indexOf(child)
}

export const getSizeClasses = (size: HexSize = 'normal'): string[] => {
    switch (size) {
        case "normal": return []
        case "big": return [styles.bigHex]
        case "small": return [styles.smallHex]
    }
}

export const AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP = .746;

const hexDimeensions = (width: number) => (
    {
        width,
        height: width * (13 / 15),
    }
)

export const getHexDimentionsForSize = (size: HexSize = 'normal') => {
    switch (size) {
        case "normal": return hexDimeensions(150)
        case "big": return hexDimeensions(300)
        case "small": return hexDimeensions(80)
    }
}