import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== 'string' || query.trim() === '') {
      return NextResponse.json(
        { error: 'Query parameter is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    const normalizedQuery = query.trim().toLowerCase()

    // Upsert: increment count if query exists, create new record if not
    const searchQuery = await prisma.searchQuery.upsert({
      where: {
        query: normalizedQuery,
      },
      update: {
        count: {
          increment: 1,
        },
        updatedAt: new Date(),
      },
      create: {
        query: normalizedQuery,
        count: 1,
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        data: searchQuery 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error tracking search query:', error)
    return NextResponse.json(
      { error: 'Failed to track search query' },
      { status: 500 }
    )
  }
}
