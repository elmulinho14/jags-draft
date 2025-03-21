'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MockDraft } from '@/models/MockDraft';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // Remove the hash at the beginning if it exists
  const hex = color.replace('#', '');
  
  // Parse the RGB values
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate the brightness (0-255)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return true if the brightness is greater than 125 (light color)
  return brightness > 125;
}

export default function MockDraftPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [mockDraft, setMockDraft] = useState<MockDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const loadMockDraft = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/mock-drafts/${id}`);
      
      if (response.ok) {
        const draft = await response.json();
        setMockDraft(draft);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Mock draft not found');
      }
    } catch (error) {
      console.error('Error loading mock draft:', error);
      setError('Failed to load mock draft');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle deleting a mock draft
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this mock draft? This action cannot be undone.')) {
      return;
    }
    
    try {
      setDeleting(true);
      
      const response = await fetch(`/api/mock-drafts/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success('Mock draft deleted successfully');
        router.push('/');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to delete mock draft');
      }
    } catch (error) {
      console.error('Error deleting mock draft:', error);
      toast.error('An error occurred while deleting the mock draft');
    } finally {
      setDeleting(false);
    }
  };
  
  // Initial load
  useEffect(() => {
    loadMockDraft();
  }, [id]);
  
  // Reload when session changes
  useEffect(() => {
    if (status !== 'loading') {
      loadMockDraft();
    }
  }, [status, id]);
  
  // Handle manual refresh
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadMockDraft();
      toast.success('Mock draft refreshed');
    } catch (error) {
      console.error('Error refreshing mock draft:', error);
      toast.error('Failed to refresh mock draft');
    } finally {
      setRefreshing(false);
    }
  };
  
  // Check if the current user is the owner of the mock draft
  const isOwner = session?.user?.id === mockDraft?.userId;
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map(round => (
                <div key={round} className="border rounded-lg p-4">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="h-6 bg-gray-200 rounded w-16"></th>
                        <th className="h-6 bg-gray-200 rounded w-16"></th>
                        <th className="h-6 bg-gray-200 rounded w-full"></th>
                        <th className="h-6 bg-gray-200 rounded w-24"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map(pick => (
                        <tr key={pick} className="border-t">
                          <td className="h-10 bg-gray-200 rounded w-16 my-2"></td>
                          <td className="h-10 bg-gray-200 rounded w-16 my-2"></td>
                          <td className="h-10 bg-gray-200 rounded w-full my-2"></td>
                          <td className="h-10 bg-gray-200 rounded w-24 my-2"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50 p-6 rounded-lg">
            <h1 className="text-2xl font-bold text-red-700 mb-4">{error}</h1>
            <p className="mb-6">The mock draft you're looking for could not be found.</p>
            <Link 
              href="/"
              className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Group picks by round
  const picksByRound = mockDraft?.picks.reduce((acc, pick) => {
    const round = pick.round;
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(pick);
    return acc;
  }, {} as Record<number, typeof mockDraft.picks>) || {};
  
  // Format the date
  const formattedDate = mockDraft?.createdAt 
    ? new Date(mockDraft.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-habanera">Mock Draft</h1>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                refreshing
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            
            {isOwner && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  deleting
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-red-100 hover:bg-red-200 text-red-700'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            {mockDraft?.userImage ? (
              <Image 
                src={mockDraft.userImage} 
                alt={mockDraft.userName || "User"} 
                width={48} 
                height={48} 
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {mockDraft?.userName?.charAt(0) || "U"}
              </div>
            )}
            
            <div>
              <div className="font-bold text-lg">{mockDraft?.userName || "Anonymous User"}</div>
              <div className="text-sm text-gray-500">{formattedDate}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {Object.entries(picksByRound).map(([round, picks]) => (
            <div key={round} className="bg-white border rounded-lg p-6 shadow-md">
              <h2 className="font-habanera text-3xl mb-4">Round {round}</h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2 w-16">Pick</th>
                    <th className="pb-2 w-24">Team</th>
                    <th className="pb-2">Player</th>
                    <th className="pb-2 w-24">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {picks.map(pick => (
                    <tr 
                      key={pick.overall} 
                      className="border-t"
                      style={{
                        backgroundColor: pick.teamPrimaryColor,
                        color: isLightColor(pick.teamPrimaryColor) ? '#000000' : '#FFFFFF'
                      }}
                    >
                      <td className="py-3 font-habanera text-xl text-center">{pick.overall}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          {pick.teamLogoUrl && (
                            <div className="w-16 h-16 relative flex-shrink-0">
                              <Image
                                src={pick.teamLogoUrl}
                                alt={pick.teamName}
                                fill
                                sizes="64px"
                                className="object-contain"
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 font-habanera text-2xl tracking-wide">{pick.playerName}</td>
                      <td className="py-3 font-habanera text-xl pl-2">{pick.playerPosition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-block rounded-md bg-gray-200 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 