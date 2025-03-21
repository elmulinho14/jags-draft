import { Player } from '@/data/players';

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onDraft: () => void;
  showDraftButton: boolean;
}

export default function PlayerCard({ player, isSelected, onDraft, showDraftButton }: PlayerCardProps) {
  // Position-based styling
  const positionStyles = (position: string) => {
    const styles: Record<string, { bg: string, text: string, border: string, gradient: string }> = {
      'QB': {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300',
        gradient: 'from-red-50 to-white'
      },
      'RB': {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300',
        gradient: 'from-blue-50 to-white'
      },
      'WR': {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300',
        gradient: 'from-green-50 to-white'
      },
      'TE': {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-300',
        gradient: 'from-purple-50 to-white'
      },
      'OT': {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        border: 'border-orange-300',
        gradient: 'from-orange-50 to-white'
      },
      'IOL': {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-300',
        gradient: 'from-yellow-50 to-white'
      },
      'DL': {
        bg: 'bg-indigo-100',
        text: 'text-indigo-800',
        border: 'border-indigo-300',
        gradient: 'from-indigo-50 to-white'
      },
      'EDGE': {
        bg: 'bg-pink-100',
        text: 'text-pink-800',
        border: 'border-pink-300',
        gradient: 'from-pink-50 to-white'
      },
      'LB': {
        bg: 'bg-lime-100',
        text: 'text-lime-800',
        border: 'border-lime-300',
        gradient: 'from-lime-50 to-white'
      },
      'CB': {
        bg: 'bg-teal-100',
        text: 'text-teal-800',
        border: 'border-teal-300',
        gradient: 'from-teal-50 to-white'
      },
      'S': {
        bg: 'bg-cyan-100',
        text: 'text-cyan-800',
        border: 'border-cyan-300',
        gradient: 'from-cyan-50 to-white'
      },
      'DE': {
        bg: 'bg-violet-100',
        text: 'text-violet-800',
        border: 'border-violet-300',
        gradient: 'from-violet-50 to-white'
      },
      'OL': {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        border: 'border-amber-300',
        gradient: 'from-amber-50 to-white'
      },
    };
    return styles[position] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-300',
      gradient: 'from-gray-50 to-white'
    };
  };

  const style = positionStyles(player.position);

  return (
    <div 
      className={`bg-gradient-to-br ${style.gradient} border-l-4 ${style.border} rounded-lg p-3 transition-all shadow-sm hover:shadow-md ${
        isSelected 
          ? 'ring-2 ring-blue-400 shadow-md scale-[1.02]' 
          : 'border border-gray-200 hover:border-gray-300 hover:scale-[1.01]'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Rank Badge */}
        <div className="flex items-center flex-1 min-w-0 space-x-3">
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${style.bg} ${style.text} text-sm font-bold shrink-0`}>
            {player.rank}
          </div>
          
          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-base text-gray-900 truncate leading-tight tracking-tight">{player.name}</h3>
            <div className="text-xs text-gray-500 truncate font-medium">{player.college} • {player.height}, {player.weight} lbs</div>
          </div>
        </div>
        
        {/* Position */}
        <div className={`${style.bg} ${style.text} px-3 py-1 rounded-md text-xs font-extrabold tracking-wider uppercase mx-2`}>
          {player.position}
        </div>
        
        {/* Draft Button */}
        {showDraftButton && (
          <button
            className={`bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm py-1.5 px-4 rounded-md transition-all hover:shadow-md hover:translate-y-[-1px] whitespace-nowrap ml-1`}
            onClick={onDraft}
          >
            Draft
          </button>
        )}
      </div>
    </div>
  );
} 