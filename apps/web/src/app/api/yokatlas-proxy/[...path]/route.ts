import { NextRequest, NextResponse } from 'next/server'

const PYTHON_API_URL = 'http://localhost:8000'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/')
    const searchParams = request.nextUrl.searchParams.toString()
    const url = `${PYTHON_API_URL}/${path}${searchParams ? `?${searchParams}` : ''}`

    console.log(`🔄 Proxying: ${url}`)

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Python API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('❌ Proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from Python API' },
      { status: 500 }
    )
  }
}
