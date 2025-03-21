import fs from 'fs';
import path from 'path';
import { MockDraft } from '@/models/MockDraft';

// Define the data directory path
const DATA_DIR = path.join(process.cwd(), 'data');
const MOCK_DRAFTS_FILE = path.join(DATA_DIR, 'mockDrafts.json');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize the mock drafts file if it doesn't exist
if (!fs.existsSync(MOCK_DRAFTS_FILE)) {
  fs.writeFileSync(MOCK_DRAFTS_FILE, JSON.stringify([], null, 2));
}

/**
 * Read all mock drafts from the database
 */
export async function readMockDrafts(): Promise<MockDraft[]> {
  try {
    const data = fs.readFileSync(MOCK_DRAFTS_FILE, 'utf8');
    const drafts: MockDraft[] = JSON.parse(data);
    
    // Convert string dates back to Date objects
    return drafts.map(draft => ({
      ...draft,
      createdAt: new Date(draft.createdAt)
    }));
  } catch (error) {
    console.error('Error reading mock drafts from database:', error);
    return [];
  }
}

/**
 * Write mock drafts to the database
 */
export async function writeMockDrafts(drafts: MockDraft[]): Promise<boolean> {
  try {
    // Convert Date objects to ISO strings for JSON serialization
    const draftsToSave = drafts.map(draft => ({
      ...draft,
      createdAt: draft.createdAt instanceof Date 
        ? draft.createdAt.toISOString() 
        : draft.createdAt
    }));
    
    fs.writeFileSync(MOCK_DRAFTS_FILE, JSON.stringify(draftsToSave, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing mock drafts to database:', error);
    return false;
  }
}

/**
 * Add a new mock draft to the database
 */
export async function addMockDraft(draft: MockDraft): Promise<boolean> {
  try {
    const drafts = await readMockDrafts();
    drafts.push(draft);
    return await writeMockDrafts(drafts);
  } catch (error) {
    console.error('Error adding mock draft to database:', error);
    return false;
  }
}

/**
 * Get a mock draft by ID
 */
export async function getMockDraftById(id: string): Promise<MockDraft | null> {
  try {
    const drafts = await readMockDrafts();
    return drafts.find(draft => draft.id === id) || null;
  } catch (error) {
    console.error('Error getting mock draft by ID:', error);
    return null;
  }
}

/**
 * Get mock drafts by user ID
 */
export async function getMockDraftsByUserId(userId: string): Promise<MockDraft[]> {
  try {
    const drafts = await readMockDrafts();
    return drafts.filter(draft => draft.userId === userId);
  } catch (error) {
    console.error('Error getting mock drafts by user ID:', error);
    return [];
  }
}

/**
 * Delete a mock draft by ID
 */
export async function deleteMockDraftById(id: string): Promise<boolean> {
  try {
    const drafts = await readMockDrafts();
    const filteredDrafts = drafts.filter(draft => draft.id !== id);
    
    if (filteredDrafts.length === drafts.length) {
      // No draft was removed
      return false;
    }
    
    return await writeMockDrafts(filteredDrafts);
  } catch (error) {
    console.error('Error deleting mock draft:', error);
    return false;
  }
} 