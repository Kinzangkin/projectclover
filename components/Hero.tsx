'use client';

import React, { useEffect, useRef } from 'react'
import Joinbtn from './ui/Joinbtn'
import { gsap } from 'gsap'
import { Badge } from "@/components/ui/badge"


function Hero() {
  const textRef = useRef(null)

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
      )
    }
  }, [])

  return (
    <div className='flex justify-center md:h-screen sm:h-[90vh] h-[50vh] flex-col md:pl-[340px] pl-9 md:gap-y-5'>
      <div className='h-80 sm:hidden'></div>
      <div
        ref={textRef}
        className='md:text-6xl text-2xl text-fade'
      >
        introducing<br />the project clover team
      </div>
      <Joinbtn />
      <div className='gap-10'>  
      <Badge variant="default" className='m-1'>{'#clovthetime'}</Badge>
      <Badge variant="secondary" className='m-1'>{'#projectclov'}</Badge>
      <Badge variant="destructive" className='m-1'>{'#barudakclv'}</Badge>
      <Badge variant="outline" className='m-1'>{'#cloverdevil'}</Badge>
      <Badge variant="default" className='m-1'>{'#clovthebattle'}</Badge>
      <Badge variant="secondary" className='m-1'>{'#clvstd'}</Badge>
      <Badge variant="destructive" className='m-1'>{'#clvpj'}</Badge>
      </div>
    </div>
  )
}

export default Hero
