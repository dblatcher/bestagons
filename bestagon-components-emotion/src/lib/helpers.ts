import styles from './bestagon-components.module.css';
import { HexSize } from './types';


export const getSizeClasses = (size: HexSize = 'normal'): string[] => {
    switch (size) {
        case "normal": return []
        case "big": return [styles.bigHex]
        case "small": return [styles.smallHex]
        case "xSmall": return [styles.xSmallHex]
    }
}

export const removeSizeClasses = (original: string[]): string[] => {
    const filtered = original.filter(name => ![styles.bigHex, styles.smallHex].includes(name))
    original.splice(0, original.length, ...filtered)
    return original
}

export const AMOUNT_OF_WIDTH_USED_WITHOUT_OVERLAP = .75;


// 13/15 (0.86 recurring) is an approximation root 0.75 (0.8660254037844386)
// which is the actual ratio of width to height for a regular hexagon
const hexDimensions = (width: number) => (
    {
        width,
        height: width * (13 / 15),
    }
)

// these numbers are used in the CSS and TS, so need to match
// TO DO? generate classes dynamically with Emotion?
export const getHexDimensionsForSize = (size: HexSize = 'normal') => {
    switch (size) {
        case "big": return hexDimensions(300)
        case "normal": return hexDimensions(150)
        case "small": return hexDimensions(80)
        case "xSmall": return hexDimensions(40)
    }
};

export const getZeroBasedNumbers = (length: number) => {
    const list: number[] = new Array(length);
    list.fill(0);
    return list.map((_, index) => index);
};
