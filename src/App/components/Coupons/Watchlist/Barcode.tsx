import React, {FC, useEffect, useRef} from 'react';
import bwipjs from 'bwip-js';

export interface BarcodeProps {
    value: string;
    format: 'code128' | 'ean13' | 'azteccode' | 'qrcode';
}

const Barcode: FC<BarcodeProps> = ({value, format = 'code128'}) => {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvas.current) {
            return;
        }

        bwipjs.toCanvas(canvas.current, {
            bcid: format,
            text: value,
            height: 15,
            paddingheight: 10,
            paddingwidth: 10,
            includetext: true,
            ...(format === 'qrcode' ? {
                alttext: value,
                textsize: 7
            } : {})
        });
    }, [canvas, format, value])

    return (
        <canvas ref={canvas} style={{maxWidth: '100%'}}/>
    )
}

export default Barcode;