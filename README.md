# NFL Draft Simulator

A Next.js web application with Discord authentication and NFL Mock Draft functionality.

## Features

- Discord OAuth2 authentication
- NFL Mock Draft simulator
- Player and team data loaded from files
- File-based database for mock draft persistence
- Modern UI with Tailwind CSS
- Responsive design
- RESTful API endpoints

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Discord Developer Account

### Setup Discord OAuth

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to the "OAuth2" tab
4. Add a redirect URL: `http://localhost:3000/api/auth/callback/discord`
5. Save changes
6. Copy your Client ID and Client Secret

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# Discord OAuth credentials
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here
```

Replace the placeholder values with your actual Discord credentials.

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Application Structure

- **Home Page**: Introduction to the application and social feed of mock drafts
- **Draft Board**: Main interface for creating mock drafts
  - Browse available players
  - Assign players to teams
  - Filter by position and round
- **Mock Draft Detail**: View detailed information about a specific mock draft
  - View all picks by round
  - Delete your own mock drafts

## Database

The application uses a simple file-based database system that stores mock drafts in JSON files. The data is stored in the `/data` directory at the root of the project.

For a production environment, you would want to replace this with a more robust database solution like:
- MongoDB
- PostgreSQL
- MySQL
- Firebase
- Supabase

## API Endpoints

The application provides the following API endpoints:

- `GET /api/mock-drafts` - Get all mock drafts
- `POST /api/mock-drafts` - Create a new mock draft
- `GET /api/mock-drafts/:id` - Get a specific mock draft
- `DELETE /api/mock-drafts/:id` - Delete a specific mock draft
- `GET /api/mock-drafts/user/:userId` - Get all mock drafts for a specific user

## How to Use

1. Sign in with your Discord account
2. Navigate to the Draft Board
3. Browse available players on the left panel
4. Select a player by clicking on their card
5. Assign the selected player to a team by clicking the "Assign" button next to a team's draft pick
6. Use the filters to find specific players by position or navigate between draft rounds
7. Submit your mock draft when you're done
8. View your mock draft and others on the home page
9. Click on a mock draft to view its details

## Deployment

This application can be deployed on platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.

Make sure to set up the environment variables on your hosting platform.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Discord Developer Documentation](https://discord.com/developers/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License.
