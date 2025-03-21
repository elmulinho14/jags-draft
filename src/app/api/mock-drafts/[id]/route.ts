import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getMockDraftById, deleteMockDraft } from '@/services/mockDraftService';
import { authOptions } from '../../auth/[...nextauth]/route';

/**
 * GET /api/mock-drafts/[id]
 * Get a specific mock draft by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Mock draft ID is required' },
        { status: 400 }
      );
    }
    
    const mockDraft = await getMockDraftById(id);
    
    if (!mockDraft) {
      return NextResponse.json(
        { error: 'Mock draft not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(mockDraft);
  } catch (error) {
    console.error('Error getting mock draft:', error);
    return NextResponse.json(
      { error: 'Failed to get mock draft' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/mock-drafts/[id]
 * Delete a specific mock draft by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Mock draft ID is required' },
        { status: 400 }
      );
    }
    
    // Get the mock draft to check ownership
    const mockDraft = await getMockDraftById(id);
    
    if (!mockDraft) {
      return NextResponse.json(
        { error: 'Mock draft not found' },
        { status: 404 }
      );
    }
    
    // Check if the user owns the mock draft
    if (mockDraft.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized: You can only delete your own mock drafts' },
        { status: 403 }
      );
    }
    
    // Delete the mock draft
    const success = await deleteMockDraft(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete mock draft' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting mock draft:', error);
    return NextResponse.json(
      { error: 'Failed to delete mock draft' },
      { status: 500 }
    );
  }
} 