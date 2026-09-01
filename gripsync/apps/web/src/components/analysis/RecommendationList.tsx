import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function RecommendationList() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="font-bold text-lg">Logitech G PRO X Superlight 2</div>
              <div className="text-sm text-slate-400">Gaming Mouse</div>
            </div>
            <Badge variant="accent">98% Match</Badge>
          </div>
          <p className="text-sm text-slate-300 mb-6">Ultra-lightweight (60g) perfectly complements your arm-aiming tracking style and relaxed claw grip.</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">$159.00</span>
            <Button size="sm" variant="secondary">Add to Wallet</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
