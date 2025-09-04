'use client'

import React from 'react'
import Image from 'next/image'

interface CardidProps {
  name: string
  role: string
}

function Cardid({name, role }: CardidProps) {
  return (
    <div className='bg-gray-800 inline-flex p-2 rounded-2xl items-center'>
        <div className='md:w-12 md:h-12 md:ml-2 bg-gray-400 rounded-full hidden md:block'>
          <Image  className='rounded-full'
          src='/Img/logo.png'
          alt='tiktok image'
          width={700}
          height={700} />
        </div>
        <div className='px-9 text-left'>
            <h1 className='md:text-2xl font-bold'>{name}</h1>
            <p className='bg-purple-600 rounded-r-4xl rounded-l-2xl p-1 inline-block text-[10px]'>#{role}</p>
        </div>
    </div>
  )
}

export default Cardid