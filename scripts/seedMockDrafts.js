const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Mock data for players (simplified version)
const mockPlayers = [
  { id: "p1", name: "Trevor Lawrence", position: "QB", college: "Clemson" },
  { id: "p2", name: "Zach Wilson", position: "QB", college: "BYU" },
  { id: "p3", name: "Trey Lance", position: "QB", college: "North Dakota State" },
  { id: "p4", name: "Justin Fields", position: "QB", college: "Ohio State" },
  { id: "p5", name: "Mac Jones", position: "QB", college: "Alabama" },
  { id: "p6", name: "Ja'Marr Chase", position: "WR", college: "LSU" },
  { id: "p7", name: "Penei Sewell", position: "OT", college: "Oregon" },
  { id: "p8", name: "Kyle Pitts", position: "TE", college: "Florida" },
  { id: "p9", name: "Micah Parsons", position: "LB", college: "Penn State" },
  { id: "p10", name: "Patrick Surtain II", position: "CB", college: "Alabama" },
  { id: "p11", name: "DeVonta Smith", position: "WR", college: "Alabama" },
  { id: "p12", name: "Jaylen Waddle", position: "WR", college: "Alabama" },
  { id: "p13", name: "Rashawn Slater", position: "OT", college: "Northwestern" },
  { id: "p14", name: "Alijah Vera-Tucker", position: "OG", college: "USC" },
  { id: "p15", name: "Najee Harris", position: "RB", college: "Alabama" },
  { id: "p16", name: "Travis Etienne", position: "RB", college: "Clemson" },
  { id: "p17", name: "Jaycee Horn", position: "CB", college: "South Carolina" },
  { id: "p18", name: "Caleb Farley", position: "CB", college: "Virginia Tech" },
  { id: "p19", name: "Christian Darrisaw", position: "OT", college: "Virginia Tech" },
  { id: "p20", name: "Greg Newsome II", position: "CB", college: "Northwestern" },
  { id: "p21", name: "Kwity Paye", position: "EDGE", college: "Michigan" },
  { id: "p22", name: "Azeez Ojulari", position: "EDGE", college: "Georgia" },
  { id: "p23", name: "Jaelan Phillips", position: "EDGE", college: "Miami" },
  { id: "p24", name: "Gregory Rousseau", position: "EDGE", college: "Miami" },
  { id: "p25", name: "Jeremiah Owusu-Koramoah", position: "LB", college: "Notre Dame" },
  { id: "p26", name: "Zaven Collins", position: "LB", college: "Tulsa" },
  { id: "p27", name: "Nick Bolton", position: "LB", college: "Missouri" },
  { id: "p28", name: "Jamin Davis", position: "LB", college: "Kentucky" },
  { id: "p29", name: "Christian Barmore", position: "DT", college: "Alabama" },
  { id: "p30", name: "Trevon Moehrig", position: "S", college: "TCU" },
  { id: "p31", name: "Eric Stokes", position: "CB", college: "Georgia" },
  { id: "p32", name: "Jayson Oweh", position: "EDGE", college: "Penn State" },
];

// Teams with logos and colors
const teams = [
  { 
    id: "t1", 
    name: "Bears", 
    city: "Chicago", 
    abbreviation: "CHI",
    primaryColor: "#0B162A",
    secondaryColor: "#C83803",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-chicago-bears-team-logo-2.png"
  },
  { 
    id: "t2", 
    name: "Commanders", 
    city: "Washington", 
    abbreviation: "WAS",
    primaryColor: "#5A1414",
    secondaryColor: "#FFB612",
    logoUrl: "https://loodibee.com/wp-content/uploads/washington-commanders-wordmark-logo.png"
  },
  { 
    id: "t3", 
    name: "Patriots", 
    city: "New England", 
    abbreviation: "NE",
    primaryColor: "#002244",
    secondaryColor: "#C60C30",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-new-england-patriots-team-logo-2.png"
  },
  { 
    id: "t4", 
    name: "Cardinals", 
    city: "Arizona", 
    abbreviation: "ARI",
    primaryColor: "#97233F",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-arizona-cardinals-team-logo-2.png"
  },
  { 
    id: "t5", 
    name: "Chargers", 
    city: "Los Angeles", 
    abbreviation: "LAC",
    primaryColor: "#0080C6",
    secondaryColor: "#FFC20E",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-los-angeles-chargers-team-logo-2.png"
  },
  { 
    id: "t6", 
    name: "Giants", 
    city: "New York", 
    abbreviation: "NYG",
    primaryColor: "#0B2265",
    secondaryColor: "#A71930",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-new-york-giants-team-logo-2.png"
  },
  { 
    id: "t7", 
    name: "Titans", 
    city: "Tennessee", 
    abbreviation: "TEN",
    primaryColor: "#0C2340",
    secondaryColor: "#4B92DB",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-tennessee-titans-team-logo-2.png"
  },
  { 
    id: "t8", 
    name: "Falcons", 
    city: "Atlanta", 
    abbreviation: "ATL",
    primaryColor: "#A71930",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-atlanta-falcons-team-logo-2.png"
  },
  { 
    id: "t9", 
    name: "Jets", 
    city: "New York", 
    abbreviation: "NYJ",
    primaryColor: "#125740",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-new-york-jets-team-logo-2.png"
  },
  { 
    id: "t10", 
    name: "Vikings", 
    city: "Minnesota", 
    abbreviation: "MIN",
    primaryColor: "#4F2683",
    secondaryColor: "#FFC62F",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-minnesota-vikings-team-logo-2.png"
  },
  { 
    id: "t11", 
    name: "Broncos", 
    city: "Denver", 
    abbreviation: "DEN",
    primaryColor: "#FB4F14",
    secondaryColor: "#002244",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-denver-broncos-team-logo-2.png"
  },
  { 
    id: "t12", 
    name: "Raiders", 
    city: "Las Vegas", 
    abbreviation: "LV",
    primaryColor: "#000000",
    secondaryColor: "#A5ACAF",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-oakland-raiders-team-logo.png"
  },
  { 
    id: "t13", 
    name: "Saints", 
    city: "New Orleans", 
    abbreviation: "NO",
    primaryColor: "#D3BC8D",
    secondaryColor: "#101820",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-new-orleans-saints-team-logo-2.png"
  },
  { 
    id: "t14", 
    name: "Colts", 
    city: "Indianapolis", 
    abbreviation: "IND",
    primaryColor: "#002C5F",
    secondaryColor: "#A2AAAD",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-indianapolis-colts-team-logo-2.png"
  },
  { 
    id: "t15", 
    name: "Seahawks", 
    city: "Seattle", 
    abbreviation: "SEA",
    primaryColor: "#002244",
    secondaryColor: "#69BE28",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-seattle-seahawks-team-logo-2.png"
  },
  { 
    id: "t16", 
    name: "Jaguars", 
    city: "Jacksonville", 
    abbreviation: "JAX",
    primaryColor: "#101820",
    secondaryColor: "#D7A22A",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-jacksonville-jaguars-team-logo-2.png"
  },
  { 
    id: "t17", 
    name: "Bengals", 
    city: "Cincinnati", 
    abbreviation: "CIN",
    primaryColor: "#FB4F14",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-cincinnati-bengals-team-logo-2.png"
  },
  { 
    id: "t18", 
    name: "Rams", 
    city: "Los Angeles", 
    abbreviation: "LAR",
    primaryColor: "#003594",
    secondaryColor: "#FFA300",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-los-angeles-rams-team-logo-2.png"
  },
  { 
    id: "t19", 
    name: "Steelers", 
    city: "Pittsburgh", 
    abbreviation: "PIT",
    primaryColor: "#FFB612",
    secondaryColor: "#101820",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-pittsburgh-steelers-team-logo-2.png"
  },
  { 
    id: "t20", 
    name: "Dolphins", 
    city: "Miami", 
    abbreviation: "MIA",
    primaryColor: "#008E97",
    secondaryColor: "#FC4C02",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-miami-dolphins-team-logo-2.png"
  },
  { 
    id: "t21", 
    name: "Eagles", 
    city: "Philadelphia", 
    abbreviation: "PHI",
    primaryColor: "#004C54",
    secondaryColor: "#A5ACAF",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-philadelphia-eagles-team-logo-2.png"
  },
  { 
    id: "t22", 
    name: "Cowboys", 
    city: "Dallas", 
    abbreviation: "DAL",
    primaryColor: "#003594",
    secondaryColor: "#869397",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-dallas-cowboys-team-logo-2.png"
  },
  { 
    id: "t23", 
    name: "Packers", 
    city: "Green Bay", 
    abbreviation: "GB",
    primaryColor: "#203731",
    secondaryColor: "#FFB612",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-green-bay-packers-team-logo-2.png"
  },
  { 
    id: "t24", 
    name: "Buccaneers", 
    city: "Tampa Bay", 
    abbreviation: "TB",
    primaryColor: "#D50A0A",
    secondaryColor: "#34302B",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-tampa-bay-buccaneers-team-logo-2.png"
  },
  { 
    id: "t25", 
    name: "Bills", 
    city: "Buffalo", 
    abbreviation: "BUF",
    primaryColor: "#00338D",
    secondaryColor: "#C60C30",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-buffalo-bills-team-logo-2.png"
  },
  { 
    id: "t26", 
    name: "Lions", 
    city: "Detroit", 
    abbreviation: "DET",
    primaryColor: "#0076B6",
    secondaryColor: "#B0B7BC",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-detroit-lions-team-logo-2.png"
  },
  { 
    id: "t27", 
    name: "Ravens", 
    city: "Baltimore", 
    abbreviation: "BAL",
    primaryColor: "#241773",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-baltimore-ravens-team-logo-2.png"
  },
  { 
    id: "t28", 
    name: "49ers", 
    city: "San Francisco", 
    abbreviation: "SF",
    primaryColor: "#AA0000",
    secondaryColor: "#B3995D",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-san-francisco-49ers-team-logo-2.png"
  },
  { 
    id: "t29", 
    name: "Chiefs", 
    city: "Kansas City", 
    abbreviation: "KC",
    primaryColor: "#E31837",
    secondaryColor: "#FFB81C",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-kansas-city-chiefs-team-logo-2.png"
  },
  { 
    id: "t30", 
    name: "Texans", 
    city: "Houston", 
    abbreviation: "HOU",
    primaryColor: "#03202F",
    secondaryColor: "#A71930",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-houston-texans-team-logo-2.png"
  },
  { 
    id: "t31", 
    name: "Panthers", 
    city: "Carolina", 
    abbreviation: "CAR",
    primaryColor: "#0085CA",
    secondaryColor: "#101820",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-carolina-panthers-team-logo-2.png"
  },
  { 
    id: "t32", 
    name: "Browns", 
    city: "Cleveland", 
    abbreviation: "CLE",
    primaryColor: "#311D00",
    secondaryColor: "#FF3C00",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-cleveland-browns-team-logo-2.png"
  }
];

// Helper function to create a mock draft pick
function createMockDraftPick(player, team, overall, round, pick) {
  return {
    overall,
    round,
    pick,
    teamId: team.id,
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

// Define the data directory path
const DATA_DIR = path.join(process.cwd(), 'data');
const MOCK_DRAFTS_FILE = path.join(DATA_DIR, 'mockDrafts.json');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize or read the mock drafts file
let mockDrafts = [];
if (fs.existsSync(MOCK_DRAFTS_FILE)) {
  try {
    const data = fs.readFileSync(MOCK_DRAFTS_FILE, 'utf8');
    mockDrafts = JSON.parse(data);
    console.log(`Found existing mock drafts: ${mockDrafts.length}`);
  } catch (error) {
    console.error('Error reading mock drafts:', error);
  }
}

// Sample discord users - these are fictional
const sampleUsers = [
  {
    id: "user1",
    name: "John's Mock Draft",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "user2",
    name: "Draft Expert",
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "user3",
    name: "NFL Analyst",
    image: "https://i.pravatar.cc/150?img=3" 
  }
];

// Create sample mock drafts
function createSampleMockDraft(user, daysAgo = 0) {
  // Shuffle players to create a random draft
  const shuffledPlayers = [...mockPlayers].sort(() => 0.5 - Math.random());
  
  // Create draft picks
  const picks = [];
  
  // Add first round picks (32 picks)
  for (let i = 0; i < 32 && i < teams.length; i++) {
    const team = teams[i];
    const player = shuffledPlayers[i];
    
    picks.push(createMockDraftPick(
      player,
      team,
      i + 1, // overall
      1,     // round
      i + 1  // pick
    ));
  }
  
  // Get date (days ago)
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  return {
    id: uuidv4(),
    userId: user.id,
    userName: user.name,
    userImage: user.image,
    createdAt: date.toISOString(),
    picks,
    isComplete: true
  };
}

// Clear existing mock drafts to use our updated structure
mockDrafts = [];

// Create and add mock drafts
for (const user of sampleUsers) {
  // Create a recent mock draft
  const recentDraft = createSampleMockDraft(user, Math.floor(Math.random() * 3));
  mockDrafts.push(recentDraft);
  
  // Create an older mock draft
  const olderDraft = createSampleMockDraft(user, Math.floor(Math.random() * 7) + 3);
  mockDrafts.push(olderDraft);
}

// Sort by date (newest first)
mockDrafts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// Write mock drafts to file
fs.writeFileSync(MOCK_DRAFTS_FILE, JSON.stringify(mockDrafts, null, 2));

console.log(`Successfully saved ${mockDrafts.length} mock drafts to ${MOCK_DRAFTS_FILE}`); 