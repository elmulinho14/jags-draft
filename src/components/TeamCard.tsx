import { Team } from '@/data/teams';

interface TeamCardProps {
  team: Team;
  onClick?: () => void;
}

export default function TeamCard({ team, onClick }: TeamCardProps) {
  return (
    <div 
      className="border rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-all"
      onClick={onClick}
      style={{ borderLeft: `8px solid ${team.primaryColor}` }}
    >
      <div className="flex items-center gap-4">
        {team.logoUrl ? (
          <img 
            src={team.logoUrl} 
            alt={`${team.city} ${team.name}`} 
            className="w-16 h-16 object-contain"
          />
        ) : (
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: team.primaryColor }}
          >
            {team.abbreviation}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="font-bold text-lg">{team.city} {team.name}</h3>
          <div className="text-sm text-gray-600">
            {team.conference} {team.division}
          </div>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="text-sm text-gray-500 mb-1">Team Needs:</div>
        <div className="flex flex-wrap gap-1">
          {team.needs.map(need => (
            <span 
              key={need} 
              className="text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: team.secondaryColor,
                color: isLightColor(team.secondaryColor) ? '#000' : '#fff'
              }}
            >
              {need}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-3">
        <div className="text-sm text-gray-500 mb-1">Draft Picks:</div>
        <div className="grid grid-cols-3 gap-2">
          {team.draftPicks.map(pick => (
            <div 
              key={pick.overall} 
              className="text-xs px-2 py-1 bg-gray-100 rounded text-center"
            >
              Round {pick.round}, Pick {pick.pick} (#{pick.overall})
            </div>
          ))}
        </div>
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