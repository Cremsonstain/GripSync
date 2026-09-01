import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export function BudgetPlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Budget Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-slate-400">Based on your savings goals and item priorities.</p>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <div>Month 1: Reached goal for <strong>Artisan Zero Soft XL</strong></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div>Month 3: Reached goal for <strong>G PRO X Superlight 2</strong></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
