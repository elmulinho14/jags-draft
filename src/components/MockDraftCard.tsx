import { MockDraft } from '@/models/MockDraft';
import Image from 'next/image';
import Link from 'next/link';

interface MockDraftCardProps {
  mockDraft: MockDraft;
}

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

export default function MockDraftCard({ mockDraft }: MockDraftCardProps) {
  // Get the top 5 picks to display
  const topPicks = mockDraft.picks
    .filter(pick => pick.round === 1)
    .sort((a, b) => a.overall - b.overall)
    .slice(0, 5);
  
  // Format the date
  const formattedDate = new Date(mockDraft.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        {mockDraft.userImage ? (
          <Image 
            src={mockDraft.userImage} 
            alt={mockDraft.userName} 
            width={40} 
            height={40} 
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {mockDraft.userName.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div>
          <div className="font-bold">{mockDraft.userName}</div>
          <div className="text-xs text-gray-500">{formattedDate}</div>
        </div>
      </div>
      
      <h3 className="font-habanera text-2xl mb-3">Top 5 Picks</h3>
      
      <div className="space-y-2 mb-4">
        {topPicks.map(pick => (
          <div 
            key={pick.overall} 
            className="flex items-center gap-2 text-sm rounded p-1"
            style={{
              backgroundColor: pick.teamPrimaryColor,
              color: isLightColor(pick.teamPrimaryColor) ? '#000000' : '#FFFFFF'
            }}
          >
            <div className="w-10 flex justify-center items-center font-habanera text-xl">#{pick.overall}</div>
            <div className="flex items-center gap-1">
              {pick.teamLogoUrl && (
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={pick.teamLogoUrl}
                    alt={pick.teamName}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <div className="flex-1 font-habanera text-2xl tracking-wide">{pick.playerName}</div>
            <div className="text-opacity-80 font-habanera text-xl pl-2">{pick.playerPosition}</div>
          </div>
        ))}
      </div>
      
      <Link 
        href={`/mock-drafts/${mockDraft.id}`}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        View full mock draft
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      </Link>
    </div>
  );
} 