'use client';

import { useState } from 'react';
import { players } from '@/data/players';
import PlayerCard from '@/components/PlayerCard';

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('All');
  const [roundFilter, setRoundFilter] = useState<string>('All');
  
  // Get unique positions for filter
  const positions = ['All', ...Array.from(new Set(players.map(p => p.position)))];
  
  // Get unique rounds for filter
  const rounds = ['All', '1', '2', '3', '4', '5', '6', '7'];
  
  // Filter players based on search term, position, and round
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'All' || player.position === positionFilter;
    const matchesRound = roundFilter === 'All' || player.projectedRound.toString() === roundFilter;
    return matchesSearch && matchesPosition && matchesRound;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">NFL Draft Prospects</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search players or colleges..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <select 
            className="p-2 border rounded"
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>
        
        <div>
          <select 
            className="p-2 border rounded"
            value={roundFilter}
            onChange={(e) => setRoundFilter(e.target.value)}
          >
            {rounds.map(round => (
              <option key={round} value={round}>
                {round === 'All' ? 'All Rounds' : `Round ${round}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map(player => (
          <PlayerCard 
            key={player.id} 
            player={player} 
            isSelected={false}
            onClick={() => {}}
          />
        ))}
      </div>
      
      <div className="mt-6 text-center text-gray-500">
        Showing {filteredPlayers.length} of {players.length} players
      </div>
    </div>
  );
} 