import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function PlaystyleCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-400 uppercase tracking-wider">Playstyle</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-accent mb-2">Tracking Specialist</div>
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline">Low Sensitivity</Badge>
          <Badge variant="outline">Arm Aimer</Badge>
          <Badge variant="outline">Smoothness Focus</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
