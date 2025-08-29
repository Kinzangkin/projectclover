'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

function About() {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = React.useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`flex items-center flex-col p-10 md:p-0 transition-opacity duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
      }`}
      id='about'
    >
      <div className='md:text-6xl text-5xl my-20 mt-24 flex md:flex-row flex-col'>
        <p>what is project <span className='text-purple-700'>Clover?</span></p>
      </div>
      <div className='text-[23px] mb-4 flex flex-col text-center'>
        Project Clover is a community or editing group in its field. Project Clover has active members in the editing world, <span>such as Jedag-Jedug, PMV, AMV, and 3D.</span>
      </div>
      <div className='overflow-y-hidden md:h-[65vh] h-[69vh] relative'>
        <div className='absolute inset-0 md:h-full bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:from-transparent md:via-transparent md:to-[#0a0a0a] md:to-100% to-90%'></div>
        <Image className='rounded-2xl'
          src='/Img/image.png'
          alt='tiktok image'
          width={700}
          height={700} />
      </div>
    </div>
  )
}

export default About
