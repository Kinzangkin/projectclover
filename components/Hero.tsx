import React from 'react'
import Joinbtn from './ui/Joinbtn'

function Hero() {
  return (
    <div className='flex justify-center md:h-screen h-[90vh] flex-col md:pl-[340px] pl-9 md:gap-y-5'>
        <div> <p className='md:text-6xl text-2xl'>introducing<br/>the project clover team</p> </div>
        <Joinbtn />
    </div>
  )
}

export default Hero