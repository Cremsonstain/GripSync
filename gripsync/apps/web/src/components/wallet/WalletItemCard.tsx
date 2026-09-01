import { Card, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';

export function WalletItemCard({ title, priority, saved, goal, monthly }: { title: string, priority: number, saved: number, goal: number, monthly: number }) {
  const progress = (saved / goal) * 100;
  return (
    <Card>
      <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm text-slate-400">Priority {priority}</p>
            </div>
            <div className="text-right">
              <div className="font-bold">${saved} / ${goal}</div>
            </div>
          </div>
          <ProgressBar value={progress} indicatorColor="bg-accent" />
        </div>
        <div className="w-full md:w-auto flex flex-col gap-2">
          <div className="text-sm text-slate-400 text-center">Saving ${monthly}/mo</div>
          <Button size="sm" variant="secondary">Edit Goal</Button>
        </div>
      </CardContent>
    </Card>
  );
}
