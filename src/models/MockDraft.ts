import { Player } from '@/data/players';
import { Team } from '@/data/teams';

export interface MockDraftPick {
  overall: number;
  round: number;
  pick: number;
  teamId: string;
  playerId: string;
  playerName: string;
  playerPosition: string;
  teamName: string;
  teamAbbreviation: string;
  teamPrimaryColor: string;
  teamSecondaryColor: string;
  teamLogoUrl?: string;
}

export interface MockDraft {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  createdAt: Date;
  picks: MockDraftPick[];
  isComplete: boolean;
}

// Helper function to check if a mock draft has a complete first round
export function hasCompleteFirstRound(picks: MockDraftPick[]): boolean {
  // Get all first round picks (typically 32)
  const firstRoundPicks = picks.filter(pick => pick.round === 1);
  
  // Check if we have at least 32 picks in the first round
  return firstRoundPicks.length >= 32;
}

// Helper function to format a mock draft for display
export function formatMockDraft(mockDraft: MockDraft): string {
  return `Mock Draft by ${mockDraft.userName} - ${new Date(mockDraft.createdAt).toLocaleDateString()}`;
}

// Helper function to create a mock draft pick from a player and team
export function createMockDraftPick(
  player: Player, 
  teamId: string, 
  overall: number, 
  round: number, 
  pick: number,
  teams: Team[]
): MockDraftPick {
  const team = teams.find(t => t.id === teamId);
  
  if (!team) {
    throw new Error(`Team with ID ${teamId} not found`);
  }
  
  return {
    overall,
    round,
    pick,
    teamId,
    playerId: player.id,
    playerName: player.name,
    playerPosition: player.position,
    teamName: `${team.city} ${team.name}`,
    teamAbbreviation: team.abbreviation,
    teamPrimaryColor: team.primaryColor,
    teamSecondaryColor: team.secondaryColor,
    teamLogoUrl: team.logoUrl
  };
} 