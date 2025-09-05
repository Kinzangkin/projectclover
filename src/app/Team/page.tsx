'use client'

import React, { useEffect, useState } from 'react'
import Cardid from '../../../components/ui/Cardid'
import Link from 'next/link'
import Backbtn from '../../../components/ui/Backbtn'

interface Member {
  name: string
  role: string
}

interface MembersData {
  admins: Member[]
  members: Member[]
}

function Team() {
  const [data, setData] = useState<MembersData>({ admins: [], members: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/members')
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error('Failed to fetch members:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <Link href={".."} className='right-0 bottom-0 fixed z-10'>
        <Backbtn />
      </Link>
      <div className='flex justify-center items-center flex-col gap-2 mt-2'>
        <h1 className='mt-5'>Admin</h1>
        <div className='justify-center items-center grid md:grid-cols-3 grid-cols-2 md:gap-2 gap-3'>
          {data.admins.map((admin, index) => (
            <Cardid key={`admin-${index}`} name={admin.name} role="Admin" />
          ))}
        </div>
        <div className='w-full h-[1px] di my-5'></div>
        <h1 className='mt-5'>Member</h1>
        <div className='justify-center items-center grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-2 gap-3'>
          {data.members.map((member, index) => (
            <Cardid key={`member-${index}`} name={member.name} role="Member" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Team
