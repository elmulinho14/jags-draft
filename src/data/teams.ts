export interface Team {
  id: string;
  name: string;
  city: string;
  abbreviation: string;
  conference: 'AFC' | 'NFC';
  division: 'North' | 'South' | 'East' | 'West';
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  needs: string[];
  draftPicks: {
    round: number;
    pick: number;
    overall: number;
  }[];
}

export const teams: Team[] = [
  {
    id: "t1",
    name: "Bears",
    city: "Chicago",
    abbreviation: "CHI",
    conference: "NFC",
    division: "North",
    primaryColor: "#0B162A",
    secondaryColor: "#C83803",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-chicago-bears-team-logo-2.png",
    needs: ["OL", "RB", "EDGE", "WR", "TE"],
    draftPicks: [
      { round: 1, pick: 10, overall: 10 }
    ]
  },
  {
    id: "t2",
    name: "Commanders",
    city: "Washington",
    abbreviation: "WAS",
    conference: "NFC",
    division: "East",
    primaryColor: "#5A1414",
    secondaryColor: "#FFB612",
    logoUrl: "https://loodibee.com/wp-content/uploads/washington-commanders-wordmark-logo.png",
    needs: ["EDGE", "CB", "WR", "S", "OL"],
    draftPicks: [
      { round: 1, pick: 29, overall: 29 }
    ]
  },
  {
    id: "t3",
    name: "Patriots",
    city: "New England",
    abbreviation: "NE",
    conference: "AFC",
    division: "East",
    primaryColor: "#002244",
    secondaryColor: "#C60C30",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-new-england-patriots-team-logo-2.png",
    needs: ["OL", "WR", "DL", "RB", "CB"],
    draftPicks: [
      { round: 1, pick: 4, overall: 4 }
    ]
  },
  {
    id: "t4",
    name: "Cardinals",
    city: "Arizona",
    abbreviation: "ARI",
    conference: "NFC",
    division: "West",
    primaryColor: "#97233F",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-arizona-cardinals-team-logo-2.png",
    needs: ["OL", "WR", "EDGE", "DL", "CB"],
    draftPicks: [
      { round: 1, pick: 16, overall: 16 }
    ]
  },
  {
    id: "t5",
    name: "Chargers",
    city: "Los Angeles",
    abbreviation: "LAC",
    conference: "AFC",
    division: "West",
    primaryColor: "#0080C6",
    secondaryColor: "#FFC20E",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-los-angeles-chargers-team-logo-2.png",
    needs: ["TE", "WR", "DL", "RB", "EDGE"],
    draftPicks: [
      { round: 1, pick: 22, overall: 22 }
    ]
  },
  {
    id: "t6",
    name: "Giants",
    city: "New York",
    abbreviation: "NYG",
    conference: "NFC",
    division: "East",
    primaryColor: "#0B2265",
    secondaryColor: "#A71930",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-new-york-giants-team-logo-2.png",
    needs: ["QB", "OL", "LB", "CB", "DL"],
    draftPicks: [
      { round: 1, pick: 3, overall: 3 }
    ]
  },
  {
    id: "t7",
    name: "Titans",
    city: "Tennessee",
    abbreviation: "TEN",
    conference: "AFC",
    division: "South",
    primaryColor: "#0C2340",
    secondaryColor: "#4B92DB",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-tennessee-titans-team-logo-2.png",
    needs: ["QB", "EDGE", "WR", "LB", "S"],
    draftPicks: [
      { round: 1, pick: 1, overall: 1 }
    ]
  },
  {
    id: "t8",
    name: "Falcons",
    city: "Atlanta",
    abbreviation: "ATL",
    conference: "NFC",
    division: "South",
    primaryColor: "#A71930",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-atlanta-falcons-team-logo-2.png",
    needs: ["EDGE", "DL", "CB", "OL", "S"],
    draftPicks: [
      { round: 1, pick: 15, overall: 15 }
    ]
  },
  {
    id: "t9",
    name: "Jets",
    city: "New York",
    abbreviation: "NYJ",
    conference: "AFC",
    division: "East",
    primaryColor: "#125740",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/New-York-Jets-logo-2024.png",
    needs: ["OL", "WR", "TE", "S", "DL"],
    draftPicks: [
      { round: 1, pick: 7, overall: 7 }
    ]
  },
  {
    id: "t10",
    name: "Vikings",
    city: "Minnesota",
    abbreviation: "MIN",
    conference: "NFC",
    division: "North",
    primaryColor: "#4F2683",
    secondaryColor: "#FFC62F",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-minnesota-vikings-team-logo-2.png",
    needs: ["CB", "OL", "S", "LB", "DL"],
    draftPicks: [
      { round: 1, pick: 24, overall: 24 }
    ]
  },
  {
    id: "t11",
    name: "Broncos",
    city: "Denver",
    abbreviation: "DEN",
    conference: "AFC",
    division: "West",
    primaryColor: "#FB4F14",
    secondaryColor: "#002244",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-denver-broncos-team-logo-2.png",
    needs: ["RB", "WR", "CB", "TE", "DL"],
    draftPicks: [
      { round: 1, pick: 20, overall: 20 }
    ]
  },
  {
    id: "t12",
    name: "Raiders",
    city: "Las Vegas",
    abbreviation: "LV",
    conference: "AFC",
    division: "West",
    primaryColor: "#000000",
    secondaryColor: "#A5ACAF",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-oakland-raiders-team-logo.png",
    needs: ["RB", "WR", "CB", "S", "OL"],
    draftPicks: [
      { round: 1, pick: 6, overall: 6 }
    ]
  },
  {
    id: "t13",
    name: "Saints",
    city: "New Orleans",
    abbreviation: "NO",
    conference: "NFC",
    division: "South",
    primaryColor: "#D3BC8D",
    secondaryColor: "#101820",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-new-orleans-saints-team-logo-2.png",
    needs: ["CB", "WR", "OL", "DL", "QB"],
    draftPicks: [
      { round: 1, pick: 9, overall: 9 }
    ]
  },
  {
    id: "t14",
    name: "Colts",
    city: "Indianapolis",
    abbreviation: "IND",
    conference: "AFC",
    division: "South",
    primaryColor: "#002C5F",
    secondaryColor: "#A2AAAD",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-indianapolis-colts-team-logo-2.png",
    needs: ["TE", "OL", "LB", "EDGE", "RB"],
    draftPicks: [
      { round: 1, pick: 14, overall: 14 }
    ]
  },
  {
    id: "t15",
    name: "Seahawks",
    city: "Seattle",
    abbreviation: "SEA",
    conference: "NFC",
    division: "West",
    primaryColor: "#002244",
    secondaryColor: "#69BE28",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-seattle-seahawks-team-logo-2.png",
    needs: ["OL", "WR", "CB", "S", "DL"],
    draftPicks: [
      { round: 1, pick: 18, overall: 18 }
    ]
  },
  {
    id: "t16",
    name: "Jaguars",
    city: "Jacksonville",
    abbreviation: "JAX",
    conference: "AFC",
    division: "South",
    primaryColor: "#101820",
    secondaryColor: "#D7A22A",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-jacksonville-jaguars-team-logo-2.png",
    needs: ["DL", "CB", "S", "OL", "WR"],
    draftPicks: [
      { round: 1, pick: 5, overall: 5 }
    ]
  },
  {
    id: "t17",
    name: "Bengals",
    city: "Cincinnati",
    abbreviation: "CIN",
    conference: "AFC",
    division: "North",
    primaryColor: "#FB4F14",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-cincinnati-bengals-team-logo-2.png",
    needs: ["EDGE", "S", "LB", "OL", "CB"],
    draftPicks: [
      { round: 1, pick: 17, overall: 17 }
    ]
  },
  {
    id: "t18",
    name: "Rams",
    city: "Los Angeles",
    abbreviation: "LAR",
    conference: "NFC",
    division: "West",
    primaryColor: "#003594",
    secondaryColor: "#FFA300",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-los-angeles-rams-team-logo-2.png",
    needs: ["LB", "CB", "OL", "S", "TE"],
    draftPicks: [
      { round: 1, pick: 26, overall: 26 }
    ]
  },
  {
    id: "t19",
    name: "Steelers",
    city: "Pittsburgh",
    abbreviation: "PIT",
    conference: "AFC",
    division: "North",
    primaryColor: "#FFB612",
    secondaryColor: "#101820",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-pittsburgh-steelers-team-logo-2.png",
    needs: ["QB", "RB", "DL", "WR", "OL"],
    draftPicks: [
      { round: 1, pick: 21, overall: 21 }
    ]
  },
  {
    id: "t20",
    name: "Dolphins",
    city: "Miami",
    abbreviation: "MIA",
    conference: "AFC",
    division: "East",
    primaryColor: "#008E97",
    secondaryColor: "#FC4C02",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-miami-dolphins-team-logo-2.png",
    needs: ["OL", "DL", "S", "CB", "TE"],
    draftPicks: [
      { round: 1, pick: 13, overall: 13 }
    ]
  },
  {
    id: "t21",
    name: "Eagles",
    city: "Philadelphia",
    abbreviation: "PHI",
    conference: "NFC",
    division: "East",
    primaryColor: "#004C54",
    secondaryColor: "#A5ACAF",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-philadelphia-eagles-team-logo-2.png",
    needs: ["S", "DL", "CB", "EDGE", "OL"],
    draftPicks: [
      { round: 1, pick: 32, overall: 32 }
    ]
  },
  {
    id: "t23",
    name: "Cowboys",
    city: "Dallas",
    abbreviation: "DAL",
    conference: "NFC",
    division: "East",
    primaryColor: "#003594",
    secondaryColor: "#869397",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-dallas-cowboys-team-logo-2.png",
    needs: ["WR", "RB", "CB", "LB", "DL"],
    draftPicks: [
      { round: 1, pick: 12, overall: 12 }
    ]
  },
  {
    id: "t24",
    name: "Packers",
    city: "Green Bay",
    abbreviation: "GB",
    conference: "NFC",
    division: "North",
    primaryColor: "#203731",
    secondaryColor: "#FFB612",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-green-bay-packers-team-logo-2.png",
    needs: ["CB", "WR", "EDGE", "DL", "OL"],
    draftPicks: [
      { round: 1, pick: 23, overall: 23 }
    ]
  },
  {
    id: "t25",
    name: "Buccaneers",
    city: "Tampa Bay",
    abbreviation: "TB",
    conference: "NFC",
    division: "South",
    primaryColor: "#D50A0A",
    secondaryColor: "#34302B",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-tampa-bay-buccaneers-team-logo-2.png",
    needs: ["LB", "CB", "EDGE", "S", "OL"],
    draftPicks: [
      { round: 1, pick: 19, overall: 19 }
    ]
  },
  {
    id: "t27",
    name: "Bills",
    city: "Buffalo",
    abbreviation: "BUF",
    conference: "AFC",
    division: "East",
    primaryColor: "#00338D",
    secondaryColor: "#C60C30",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-buffalo-bills-team-logo-2.png",
    needs: ["CB", "DL", "WR", "EDGE", "S"],
    draftPicks: [
      { round: 1, pick: 30, overall: 30 }
    ]
  },
  {
    id: "t28",
    name: "Lions",
    city: "Detroit",
    abbreviation: "DET",
    conference: "NFC",
    division: "North",
    primaryColor: "#0076B6",
    secondaryColor: "#B0B7BC",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-detroit-lions-team-logo-2.png",
    needs: ["EDGE", "OL", "S", "DL", "WR"],
    draftPicks: [
      { round: 1, pick: 28, overall: 28 }
    ]
  },
  {
    id: "t29",
    name: "Ravens",
    city: "Baltimore",
    abbreviation: "BAL",
    conference: "AFC",
    division: "North",
    primaryColor: "#241773",
    secondaryColor: "#000000",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-baltimore-ravens-team-logo-2.png",
    needs: ["OL", "CB", "S", "DL", "EDGE"],
    draftPicks: [
      { round: 1, pick: 27, overall: 27 }
    ]
  },
  {
    id: "t30",
    name: "49ers",
    city: "San Francisco",
    abbreviation: "SF",
    conference: "NFC",
    division: "West",
    primaryColor: "#AA0000",
    secondaryColor: "#B3995D",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-san-francisco-49ers-team-logo-2.png",
    needs: ["DL", "EDGE", "OL", "RB", "CB"],
    draftPicks: [
      { round: 1, pick: 11, overall: 11 }
    ]
  },
  {
    id: "t31",
    name: "Chiefs",
    city: "Kansas City",
    abbreviation: "KC",
    conference: "AFC",
    division: "West",
    primaryColor: "#E31837",
    secondaryColor: "#FFB81C",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-kansas-city-chiefs-team-logo-2.png",
    needs: ["DL", "OL", "EDGE", "S", "WR"],
    draftPicks: [
      { round: 1, pick: 31, overall: 31 }
    ]
  },
  {
    id: "t32",
    name: "Texans",
    city: "Houston",
    abbreviation: "HOU",
    conference: "AFC",
    division: "South",
    primaryColor: "#03202F",
    secondaryColor: "#A71930",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-houston-texans-team-logo-2.png",
    needs: ["OL", "WR", "DL", "S", "CB"],
    draftPicks: [
      { round: 1, pick: 25, overall: 25 }
    ]
  },
  {
    id: "t22",
    name: "Browns",
    city: "Cleveland",
    abbreviation: "CLE",
    conference: "AFC",
    division: "North",
    primaryColor: "#311D00",
    secondaryColor: "#FF3C00",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-cleveland-browns-team-logo-2.png",
    needs: ["QB", "OL", "EDGE", "RB", "S"],
    draftPicks: [
      { round: 1, pick: 2, overall: 2 }
    ]
  },
  {
    id: "t26",
    name: "Panthers",
    city: "Carolina",
    abbreviation: "CAR",
    conference: "NFC",
    division: "South",
    primaryColor: "#0085CA",
    secondaryColor: "#101820",
    logoUrl: "https://loodibee.com/wp-content/uploads/nfl-carolina-panthers-team-logo-2.png",
    needs: ["EDGE", "S", "CB", "WR", "DL"],
    draftPicks: [
      { round: 1, pick: 8, overall: 8 }
    ]
  }
]; 