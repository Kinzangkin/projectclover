import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('dedications')
      .select('*')
      .order('month', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { month, video_count } = await request.json()

    // Validate month format YYYY-MM
    const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/
    if (!monthRegex.test(month)) {
      return NextResponse.json({ error: 'Month must be in format YYYY-MM' }, { status: 400 })
    }

    if (!Number.isInteger(video_count) || video_count < 0) {
      return NextResponse.json({ error: 'Video count must be a non-negative integer' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('dedications')
      .insert([{ month, video_count }])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data, { status: 201 })
  } catch{
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, month, video_count } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    // Validate month format YYYY-MM
    const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/
    if (!monthRegex.test(month)) {
      return NextResponse.json({ error: 'Month must be in format YYYY-MM' }, { status: 400 })
    }

    if (!Number.isInteger(video_count) || video_count < 0) {
      return NextResponse.json({ error: 'Video count must be a non-negative integer' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('dedications')
      .update({ month, video_count })
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch{
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('dedications')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
