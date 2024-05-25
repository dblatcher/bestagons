import React from "react"
import { AxialCoords } from "../lib/grid-functions"

interface Props {
    axial: AxialCoords
}

export const AxialCoordinates: React.FunctionComponent<Props> = ({ axial }) => {

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                {axial.q > 0 && '+'}{axial.q}
            </div>
            <br />
            <span style={{ paddingLeft: 20 }}>{axial.r > 0 && '+'}{axial.r}</span>
        </div>
    )
}