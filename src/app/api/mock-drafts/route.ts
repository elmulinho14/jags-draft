import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAllMockDrafts, submitMockDraft } from '@/services/mockDraftService';
import { MockDraftPick } from '@/models/MockDraft';
import { authOptions } from '../auth/[...nextauth]/route';

/**
 * GET /api/mock-drafts
 * Get all mock drafts
 */
export async function GET() {
  try {
    const mockDrafts = await getAllMockDrafts();
    return NextResponse.json(mockDrafts);
  } catch (error) {
    console.error('Error getting mock drafts:', error);
    return NextResponse.json(
      { error: 'Failed to get mock drafts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/mock-drafts
 * Create a new mock draft
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate request body
    if (!body.picks || !Array.isArray(body.picks) || body.picks.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: picks are required' },
        { status: 400 }
      );
    }
    
    // Submit the mock draft
    const mockDraft = await submitMockDraft(
      session.user.id,
      session.user.name || 'Anonymous User',
      session.user.image,
      body.picks as MockDraftPick[]
    );
    
    if (!mockDraft) {
      return NextResponse.json(
        { error: 'Failed to create mock draft' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(mockDraft, { status: 201 });
  } catch (error) {
    console.error('Error creating mock draft:', error);
    return NextResponse.json(
      { error: 'Failed to create mock draft' },
      { status: 500 }
    );
  }
} 