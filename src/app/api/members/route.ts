import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'nama.json')

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, role } = await request.json()
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    if (role === 'admin') {
      data.admins.push(name)
    } else {
      data.members.push(name)
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to add' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { oldName, newName, role } = await request.json()
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const list = role === 'admin' ? data.admins : data.members
    const index = list.indexOf(oldName)
    if (index !== -1) {
      list[index] = newName
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { name, role } = await request.json()
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const list = role === 'admin' ? data.admins : data.members
    const index = list.indexOf(name)
    if (index !== -1) {
      list.splice(index, 1)
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
