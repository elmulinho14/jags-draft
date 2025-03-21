import { players } from '@/data/players';
import { teams } from '@/data/teams';
import DraftBoard from '@/components/DraftBoard';

export const metadata = {
  title: 'NFL Mock Draft',
  description: 'Create your own NFL mock draft',
};

export default function DraftPage() {
  return (
    <main className="flex flex-col h-screen">
      <DraftBoard players={players} teams={teams} />
    </main>
  );
} 