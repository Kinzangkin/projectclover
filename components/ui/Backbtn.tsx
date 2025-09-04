'use client'

import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

function Backbtn() {
    return (
        <div className=' flex justify-center items-center text-center p-5 border m-2 h-10 w-10 bg-gray-800 rounded-lg'>
            <FontAwesomeIcon 
            icon={faBackward}
            className="text-xl text-blue-500" 
        />
        </div>
    )
}

export default Backbtn