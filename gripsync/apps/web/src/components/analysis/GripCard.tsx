import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function GripCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-400 uppercase tracking-wider">Detected Grip</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl font-bold text-primary">Relaxed Claw</div>
          <Badge variant="accent">94% Confidence</Badge>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <div className="flex justify-between mb-1 text-slate-400"><span>Palm Contact</span> <span>Medium</span></div>
            <ProgressBar value={60} indicatorColor="bg-primary" showLabel={false} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-slate-400"><span>Finger Arch</span> <span>High</span></div>
            <ProgressBar value={85} indicatorColor="bg-primary" showLabel={false} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
