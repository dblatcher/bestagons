export type HexData = {
    x?: number
    y?: number
    role?: string
}

export const attributeMap: Readonly<Record<keyof HexData, string>> = {
    x: "data-hex-position-x",
    y: "data-hex-position-y",
    role: "data-hex-role"
};

export const buildHexDataAttributes = (data: HexData = {}): Record<string, string> => {
    const attributes: Record<string, string> = {}
    Object.entries(data).forEach(([key, value]) => {
        const dataKey = key as keyof HexData;
        const attributeName = attributeMap[dataKey]
        attributes[attributeName] = value.toString()
    })

    return attributes
}