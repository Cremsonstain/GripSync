import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GaugeChart } from '@/components/ui/GaugeChart';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SetupViewerPanel } from '@/components/setup/SetupViewerPanel';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-400">Your latest performance metrics and recommendations.</p>
        </div>
        <Link href="/analyze">
          <Button>New Analysis</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Grip Analysis Card */}
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
                <div className="flex justify-between mb-1 text-slate-400">
                  <span>Palm Contact</span> <span>Medium</span>
                </div>
                <ProgressBar value={60} indicatorColor="bg-primary" showLabel={false} />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-slate-400">
                  <span>Finger Arch</span> <span>High</span>
                </div>
                <ProgressBar value={85} indicatorColor="bg-primary" showLabel={false} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Playstyle Card */}
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

        {/* Setup Evaluation */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-400 uppercase tracking-wider">Setup Match</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <GaugeChart value={42} />
            <div className="mt-4 text-center">
              <span className="text-danger font-semibold">Critical Bottleneck Detected</span>
              <p className="text-sm text-slate-400 mt-1">
                Current mouse weight (105g) severely limits your tracking velocity.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">3D Setup</h2>
          <p className="text-sm text-slate-400">Inspect and configure the setup model from your analysis.</p>
        </div>
        <SetupViewerPanel />
      </section>

      {/* Recommendations Preview */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Top Recommendations</h2>
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
              <p className="text-sm text-slate-300 mb-6">
                Ultra-lightweight (60g) perfectly complements your arm-aiming tracking style and relaxed claw grip.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">$159.00</span>
                <Button size="sm" variant="secondary">Add to Wallet</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
