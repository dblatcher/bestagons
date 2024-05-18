import { CSSProperties } from "react";

type Props = { combinedPolygonStyle?: CSSProperties; combinedPolygonClassNames: string[]; }

export const HexSvgOutline = ({ combinedPolygonStyle, combinedPolygonClassNames }: Props) => (
    <svg viewBox="0 0 150 130"
        css={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: 'auto'
        }}
    >
        <polygon
            points="0,65 37.5,0 112.5,0 150,65 112.5,130 37.5,130 0,65"
            fill="none"
            stroke="black"
            strokeWidth="2"
            style={combinedPolygonStyle}
            css={{
                pointerEvents: 'fill'
            }}
            className={combinedPolygonClassNames.join(" ")} />
    </svg>
);
