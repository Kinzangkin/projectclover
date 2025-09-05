import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET() {
  try {
    const { data, error } = await supabase.from('members').select('name, role')
    if (error) throw error

    // Pisahkan data menjadi admins dan members dengan objek lengkap
    const admins = data.filter((item) => item.role === 'admin')
    const members = data.filter((item) => item.role === 'member')

    return NextResponse.json({ admins, members })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, role } = await request.json()
    const { error } = await supabase.from('members').insert([{ name, role }])
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add member' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { oldName, newName, role } = await request.json()
    // Update berdasarkan nama lama dan role
    const { error } = await supabase
      .from('members')
      .update({ name: newName })
      .eq('name', oldName)
      .eq('role', role)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { name, role } = await request.json()
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('name', name)
      .eq('role', role)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 })
  }
}
