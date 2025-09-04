'use client';

import React, { useEffect, useRef } from 'react'
import Joinbtn from './ui/Joinbtn'
import { gsap } from 'gsap'
import { Badge } from 'lucide-react';

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
    <div className='flex justify-center md:h-screen h-[90vh] flex-col md:pl-[340px] pl-9 md:gap-y-5'>
      <div
        ref={textRef}
        className='md:text-6xl text-2xl text-fade'
      >
        introducing<br />the project clover team
      </div>
      <Joinbtn />
      <Badge fontVariant={'default |outline | secondary | destructive'} ></Badge>
    </div>
  )
}

export default Hero
