import { Team } from '@/data/teams';
import { Player } from '@/data/players';
import Image from 'next/image';

interface DraftPickProps {
  pick: number;
  overall: number;
  round: number;
  team: Team;
  player: Player | undefined;
  isOnTheClock: boolean;
}

export default function DraftPick({ 
  pick, 
  overall, 
  round, 
  team, 
  player, 
  isOnTheClock
}: DraftPickProps) {
  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm mb-3 ${isOnTheClock ? 'ring-2 ring-green-500' : ''}`}>
      <div 
        className="flex items-center gap-2 p-3"
        style={{ 
          backgroundColor: team.primaryColor,
          color: isLightColor(team.primaryColor) ? '#000000' : '#FFFFFF'
        }}
      >
        <div className="w-10 flex justify-center items-center font-habanera text-xl">
          #{overall}
        </div>
        
        <div className="flex items-center gap-1">
          {team.logoUrl ? (
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image
                src={team.logoUrl}
                alt={`${team.city} ${team.name}`}
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
          ) : (
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
              style={{ 
                backgroundColor: team.secondaryColor,
                color: isLightColor(team.secondaryColor) ? '#000000' : '#FFFFFF'
              }}
            >
              {team.abbreviation}
            </div>
          )}
        </div>
        
        <div className="flex-1 ml-1">
          <div className="font-bold text-lg">{team.city} {team.name}</div>
          
          <div className="text-sm opacity-90">
            Round {round}, Pick {pick}
          </div>
          
          {player ? (
            <div className="font-habanera text-2xl tracking-wide mt-1 w-full">
              {player.name} <span className="text-lg">({player.position})</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1 mt-1">
              {team.needs.map(need => (
                <span 
                  key={need} 
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: team.secondaryColor,
                    color: isLightColor(team.secondaryColor) ? '#000' : '#fff'
                  }}
                >
                  {need}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {isOnTheClock && !player && (
          <div className="px-2 py-1 bg-green-500 text-white text-sm font-bold rounded animate-pulse">
            On the Clock
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return true if color is light
  return brightness > 128;
} 