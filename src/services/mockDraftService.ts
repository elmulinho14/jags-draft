import { v4 as uuidv4 } from 'uuid';
import { MockDraft, MockDraftPick } from '@/models/MockDraft';
import { 
  readMockDrafts, 
  writeMockDrafts, 
  addMockDraft, 
  getMockDraftById as getDbMockDraftById,
  getMockDraftsByUserId as getDbMockDraftsByUserId
} from './dbService';

/**
 * Submit a new mock draft
 */
export async function submitMockDraft(
  userId: string,
  userName: string,
  userImage: string | undefined,
  picks: MockDraftPick[]
): Promise<MockDraft | null> {
  try {
    // Create a new mock draft
    const newDraft: MockDraft = {
      id: uuidv4(),
      userId,
      userName,
      createdAt: new Date(),
      picks,
      isComplete: picks.length >= 32 // Consider it complete if it has at least a full first round
    };

    // Add the draft to the database
    const success = await addMockDraft(newDraft);
    
    if (success) {
      return newDraft;
    }
    
    return null;
  } catch (error) {
    console.error('Error submitting mock draft:', error);
    return null;
  }
}

/**
 * Get all mock drafts
 */
export async function getAllMockDrafts(): Promise<MockDraft[]> {
  try {
    const drafts = await readMockDrafts();
    
    // Sort by creation date (newest first)
    return drafts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error getting all mock drafts:', error);
    return [];
  }
}

/**
 * Get mock drafts by user ID
 */
export async function getMockDraftsByUserId(userId: string): Promise<MockDraft[]> {
  try {
    return await getDbMockDraftsByUserId(userId);
  } catch (error) {
    console.error('Error getting mock drafts by user ID:', error);
    return [];
  }
}

/**
 * Get a mock draft by ID
 */
export async function getMockDraftById(id: string): Promise<MockDraft | null> {
  try {
    return await getDbMockDraftById(id);
  } catch (error) {
    console.error('Error getting mock draft by ID:', error);
    return null;
  }
}

/**
 * Delete a mock draft by ID
 */
export async function deleteMockDraft(id: string): Promise<boolean> {
  try {
    const drafts = await readMockDrafts();
    const updatedDrafts = drafts.filter(draft => draft.id !== id);
    
    return await writeMockDrafts(updatedDrafts);
  } catch (error) {
    console.error('Error deleting mock draft:', error);
    return false;
  }
} 