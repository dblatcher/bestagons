import { ImgHTMLAttributes } from "react";


export const ImageOverlay = ({ image }: { image:  ImgHTMLAttributes<HTMLImageElement> }) => image && (
    <img
        alt={image.alt ?? ''}
        css={{
            position:'absolute',
            inset:0,
            width:'100%',
            height: 'auto'
        }}
        {...image}
    />
)
