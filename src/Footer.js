import React from 'react'
import InfoIcon from '@material-ui/icons/Info';
function Footer({ testData, message, testDataMessage }) {
    const defaultMessage = "AITC Silchar Member Data is powered and protected by Google Firebase. To know more contact support @9831305667";

    return (
        <div>
            {testData && (<div className="flex text-center justify-center text-gray-500"> {testDataMessage}</div>)}
            <div className="flex text-center justify-center text-gray-500 text-sm"> <InfoIcon /> {message ? message : defaultMessage}</div>
            <div className="flex text-center justify-center text-gray-500 text-sm">
                <img className="  w-20 object-contain " src="https://cdn-media-1.freecodecamp.org/images/0*CPTNvq87xG-sUGdx.png" />
            </div>
        </div>
    )
}

export default Footer
