import { NextRequest, NextResponse } from 'next/server';
import { getMockDraftsByUserId } from '@/services/mockDraftService';

/**
 * GET /api/mock-drafts/user/[userId]
 * Get all mock drafts for a specific user
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const mockDrafts = await getMockDraftsByUserId(userId);
    
    return NextResponse.json(mockDrafts);
  } catch (error) {
    console.error('Error getting user mock drafts:', error);
    return NextResponse.json(
      { error: 'Failed to get user mock drafts' },
      { status: 500 }
    );
  }
} 