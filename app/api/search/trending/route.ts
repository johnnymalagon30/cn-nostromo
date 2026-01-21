import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const trendingSearches = await prisma.searchQuery.findMany({
      where: {
        updatedAt: {
          gte: oneWeekAgo,
        },
      },
      orderBy: {
        count: 'desc',
      },
      take: 5,
      select: {
        query: true,
        count: true,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: trendingSearches,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching trending searches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending searches' },
      { status: 500 }
    )
  }
}
