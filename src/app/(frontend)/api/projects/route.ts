import { NextRequest, NextResponse } from 'next/server'
import { getProjectsPaginated } from '@/data/projects'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = Math.min(20, Math.max(1, Number(searchParams.get('limit') ?? 6)))

  const data = await getProjectsPaginated(page, limit)
  return NextResponse.json(data)
}
