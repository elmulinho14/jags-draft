"use client";

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MockDraft } from "@/models/MockDraft";
import MockDraftCard from "@/components/MockDraftCard";
import { toast } from "react-hot-toast";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [mockDrafts, setMockDrafts] = useState<MockDraft[]>([]);
  const [loadingDrafts, setLoadingDrafts] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load mock drafts
  const loadMockDrafts = async () => {
    try {
      setLoadingDrafts(true);
      
      // Use the API endpoint instead of the direct service function
      const response = await fetch('/api/mock-drafts');
      
      if (response.ok) {
        const drafts = await response.json();
        setMockDrafts(drafts);
      } else {
        console.error('Failed to load mock drafts');
      }
    } catch (error) {
      console.error("Error loading mock drafts:", error);
    } finally {
      setLoadingDrafts(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadMockDrafts();
    
    // Set up an interval to refresh drafts periodically
    const intervalId = setInterval(loadMockDrafts, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Reload drafts when session changes
  useEffect(() => {
    if (status !== 'loading') {
      loadMockDrafts();
    }
  }, [status, session]);

  // Handle manual refresh
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadMockDrafts();
      toast.success("Mock drafts refreshed");
    } catch (error) {
      console.error("Error refreshing mock drafts:", error);
      toast.error("Failed to refresh mock drafts");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Mock Drafts</h2>
              <button
                onClick={handleRefresh}
                disabled={refreshing || loadingDrafts}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  refreshing || loadingDrafts
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
            </div>
            
            {loadingDrafts ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="animate-pulse">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                      <div className="space-y-2 mb-4">
                        {[1, 2, 3, 4, 5].map(j => (
                          <div key={j} className="flex gap-2">
                            <div className="h-4 bg-gray-200 rounded w-6"></div>
                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                          </div>
                        ))}
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : mockDrafts.length > 0 ? (
              <div className="space-y-4">
                {mockDrafts.map(draft => (
                  <MockDraftCard key={draft.id} mockDraft={draft} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">No mock drafts have been submitted yet.</p>
                <Link
                  href="/draft"
                  className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                  Be the first to create one!
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
