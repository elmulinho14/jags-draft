'use client';

import { useState, useEffect, useRef } from 'react';
import { Player } from '@/data/players';
import { Team } from '@/data/teams';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import PlayerCard from './PlayerCard';
import DraftPick from './DraftPick';
import { MockDraftPick, createMockDraftPick, hasCompleteFirstRound } from '@/models/MockDraft';
import Image from 'next/image';

interface DraftBoardProps {
  players: Player[];
  teams: Team[];
}

export default function DraftBoard({ players, teams }: DraftBoardProps) {
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [draftedPlayers, setDraftedPlayers] = useState<{[key: string]: Player}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('All');
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftComplete, setDraftComplete] = useState(false);
  
  const teamPanelRef = useRef<HTMLDivElement>(null);
  const activeDraftPickRef = useRef<HTMLDivElement>(null);
  
  const { data: session } = useSession();
  const router = useRouter();
  
  // Initialize available players
  useEffect(() => {
    setAvailablePlayers([...players]);
  }, [players]);

  // Filter players based on search term and position
  const filteredPlayers = availablePlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'All' || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  // Sort players by grade (highest to lowest)
  const sortPlayersByGrade = (players: Player[]): Player[] => {
    return [...players].sort((a, b) => {
      // Sort directly by the grade property
      return b.grade - a.grade; // Descending order (highest first)
    });
  };
  
  // Get sorted players
  const sortedPlayers = sortPlayersByGrade(filteredPlayers);

  // Get all round 1 draft picks in order
  const roundOnePicks = teams.flatMap(team => 
    team.draftPicks
      .filter(pick => pick.round === 1)
      .map(pick => ({
        teamId: team.id,
        team: team,
        round: pick.round,
        pick: pick.pick,
        overall: pick.overall
      }))
  ).sort((a, b) => a.overall - b.overall);
  
  // Get current pick on the clock
  const currentPick = !draftComplete ? roundOnePicks[currentPickIndex] : null;

  // Auto-scroll to active pick when currentPickIndex changes
  useEffect(() => {
    if (activeDraftPickRef.current && teamPanelRef.current) {
      activeDraftPickRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, [currentPickIndex]);

  // Handle drafting a player
  const handleDraftPlayer = (player: Player) => {
    if (!currentPick) return;
    
    // Update drafted players
    setDraftedPlayers(prev => ({
      ...prev,
      [currentPick.overall.toString()]: player
    }));
    
    // Remove player from available players
    setAvailablePlayers(prev => prev.filter(p => p.id !== player.id));
    
    // Move to next pick or complete draft
    if (currentPickIndex < roundOnePicks.length - 1) {
      setCurrentPickIndex(prev => prev + 1);
    } else {
      // Round 1 is complete
      setDraftComplete(true);
      toast.success('Round 1 complete! You can now submit your mock draft.');
    }
  };

  // Convert drafted players to mock draft picks
  const getMockDraftPicks = (): MockDraftPick[] => {
    return Object.entries(draftedPlayers).map(([overall, player]) => {
      const overallNum = parseInt(overall);
      const draftPick = roundOnePicks.find(pick => pick.overall === overallNum);
      
      if (!draftPick) {
        throw new Error(`Draft pick with overall ${overall} not found`);
      }
      
      return createMockDraftPick(
        player,
        draftPick.teamId,
        draftPick.overall,
        draftPick.round,
        draftPick.pick,
        teams
      );
    });
  };

  // Check if the first round is complete
  const isFirstRoundComplete = (): boolean => {
    return Object.keys(draftedPlayers).length === roundOnePicks.length;
  };

  // Handle submitting the mock draft
  const handleSubmitMockDraft = async () => {
    if (!session?.user) {
      toast.error('You must be signed in to submit a mock draft');
      return;
    }
    
    if (!isFirstRoundComplete()) {
      toast.error('You must complete the first round before submitting');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const picks = getMockDraftPicks();
      
      // Use the API endpoint instead of the direct service function
      const response = await fetch('/api/mock-drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ picks }),
      });
      
      if (response.ok) {
        const result = await response.json();
        toast.success('Mock draft submitted successfully!');
        router.push('/');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to submit mock draft');
      }
    } catch (error) {
      console.error('Error submitting mock draft:', error);
      toast.error('An error occurred while submitting your mock draft');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get positions for filter
  const positions = ['All', ...Array.from(new Set(players.map(p => p.position)))];

  // Count how many picks are made
  const picksCompleted = Object.keys(draftedPlayers).length;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white text-black p-4 border-b">
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search players..."
              className="w-full p-2 rounded text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select 
              className="p-2 rounded text-black"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          
          <div>
            <button
              className={`px-4 py-2 rounded font-bold ${
                isFirstRoundComplete()
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleSubmitMockDraft}
              disabled={!isFirstRoundComplete() || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Mock Draft'}
            </button>
          </div>
        </div>
        
        <div className="text-sm">
          First round picks: {picksCompleted}/{roundOnePicks.length}
          {!isFirstRoundComplete() && !draftComplete && (
            <span className="ml-2 text-yellow-300">
              (Complete the first round to submit)
            </span>
          )}
          {draftComplete && (
            <span className="ml-2 text-green-500 font-bold">
              First round complete! You can now submit your mock draft.
            </span>
          )}
        </div>
      </div>
      
      {currentPick && (
        <div className="bg-green-100 p-4 border-b">
          <div className="flex items-center gap-2">
            <span className="font-bold">On the Clock:</span>
            <div className="flex items-center gap-2">
              {currentPick.team.logoUrl && (
                <div className="w-8 h-8 relative">
                  <Image
                    src={currentPick.team.logoUrl}
                    alt={`${currentPick.team.city} ${currentPick.team.name}`}
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
              )}
              <span className="font-bold">{currentPick.team.city} {currentPick.team.name}</span>
            </div>
            <span>Round {currentPick.round}, Pick {currentPick.pick} (#{currentPick.overall})</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Draft Board with Teams */}
        <div ref={teamPanelRef} className="w-1/2 bg-white overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4 text-black">Round 1</h2>
          <div className="grid grid-cols-1 gap-4">
            {roundOnePicks.map((pick, index) => (
              <div 
                key={pick.overall}
                ref={index === currentPickIndex && !draftedPlayers[pick.overall.toString()] ? activeDraftPickRef : null}
              >
                <DraftPick
                  pick={pick.pick}
                  overall={pick.overall}
                  round={pick.round}
                  team={pick.team}
                  player={draftedPlayers[pick.overall.toString()]}
                  isOnTheClock={index === currentPickIndex && !draftedPlayers[pick.overall.toString()]}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right panel - Available Players */}
        <div className="w-1/2 bg-gray-100 overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4 text-black">Available Players</h2>
          <div className="grid grid-cols-1 gap-4">
            {sortedPlayers.map(player => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                isSelected={false}
                onDraft={() => handleDraftPlayer(player)}
                showDraftButton={!!currentPick && !draftedPlayers[currentPick.overall.toString()]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 