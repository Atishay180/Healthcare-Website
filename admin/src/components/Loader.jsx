import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Loader = ({properties}) => {

    const {color, height, width} = properties;
    return (
        <ScaleLoader height={height} width={width} color={color} />
    )
}

export default Loader
