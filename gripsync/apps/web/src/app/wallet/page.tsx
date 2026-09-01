import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function WalletPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Setup Budget</h1>
        <p className="text-slate-400">Plan and track savings for your optimal gear.</p>
      </div>

      {/* Main Progress */}
      <Card className="bg-gradient-to-br from-surface to-surface/50 border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Total Goal</div>
                  <div className="text-4xl font-bold">$245 / <span className="text-slate-500">$599</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Estimated Ready</div>
                  <div className="text-xl font-semibold text-primary">Dec 2024</div>
                </div>
              </div>
              <ProgressBar value={41} indicatorColor="bg-primary" className="h-4" showLabel={false} />
              <div className="text-sm text-slate-400 text-right">41% Funded</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Planned Upgrades</h2>
        
        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">Logitech G PRO X Superlight 2</h3>
                  <p className="text-sm text-slate-400">Priority 1 • High Impact</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">$120 / $159</div>
                </div>
              </div>
              <ProgressBar value={75} indicatorColor="bg-accent" />
            </div>
            <div className="w-full md:w-auto flex flex-col gap-2">
              <div className="text-sm text-slate-400 text-center">Saving $40/mo</div>
              <Button size="sm" variant="secondary">Edit Goal</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">Artisan Zero Soft XL</h3>
                  <p className="text-sm text-slate-400">Priority 2 • Medium Impact</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">$25 / $75</div>
                </div>
              </div>
              <ProgressBar value={33} indicatorColor="bg-primary" />
            </div>
            <div className="w-full md:w-auto flex flex-col gap-2">
              <div className="text-sm text-slate-400 text-center">Saving $20/mo</div>
              <Button size="sm" variant="secondary">Edit Goal</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
