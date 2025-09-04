import Link from 'next/link'
import React from 'react'

function Navadmin() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href={'/admin/dedications'}>{'Dedications >'}</Link>
        <Link href={'/admin/members'}>{'Members >'}</Link>
    </div>
  )
}

export default Navadmin