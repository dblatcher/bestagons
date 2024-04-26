import styles from './bestagon-components.module.css';

export const getChildIndex = (container?: HTMLElement, child?: HTMLElement): number => {
    if (!container || !child) {
        return -1
    }
    return Array.from(container.children).indexOf(child)
}

export const getSizeClasses = (size: 'normal' | 'big' | 'small' = 'normal'): string[] => {
    switch (size) {
        case "normal": return []
        case "big": return [styles.bexHex]
        case "small": return [styles.smallHex]
    }
}