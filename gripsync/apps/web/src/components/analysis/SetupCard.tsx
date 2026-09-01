import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { GaugeChart } from '@/components/ui/GaugeChart';

export function SetupCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-400 uppercase tracking-wider">Setup Match</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <GaugeChart value={42} />
        <div className="mt-4 text-center">
          <span className="text-danger font-semibold">Critical Bottleneck Detected</span>
          <p className="text-sm text-slate-400 mt-1">Current mouse weight (105g) severely limits your tracking velocity.</p>
        </div>
      </CardContent>
    </Card>
  );
}
