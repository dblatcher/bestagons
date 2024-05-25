import React from "react"
import { OffsetCoords } from "../lib/grid-functions"

interface Props {
    coords: OffsetCoords
}

export const OffsetCoordinates: React.FunctionComponent<Props> = ({ coords }) => {

    return (
        <div>
            {coords.x}, {coords.y}
        </div>
    )
}