import React from 'react'
import { Oval, ThreeCircles } from 'react-loader-spinner'

const Loader = ({colors}) => {
    const {primary, secondary} = colors;
    return (
        <div className="text-center flex items-center justify-center">
            <ThreeCircles
                visible={true}
                color={primary}
                secondaryColor={secondary}
                strokeWidth={4}
                height={24}
                width={24}
                ariaLabel="oval-loading"
            />
        </div>
    )
}

export default Loader
