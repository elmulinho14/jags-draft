'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="bg-white text-black border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold">
              Jags Server
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md ${isActive('/') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              >
                Home
              </Link>
              <Link 
                href="/draft" 
                className={`px-3 py-2 rounded-md ${isActive('/draft') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              >
                Submit Mock Draft
              </Link>
            </div>
          </div>
          
          <div>
            {status === 'loading' ? (
              <div className="px-3 py-2">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <div className="text-sm">Signed in as:</div>
                  <div className="font-medium">{session.user?.name}</div>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => signIn('discord')}
                className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Sign In with Discord
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 