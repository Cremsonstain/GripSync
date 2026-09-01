import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CurrencySelector } from '@/components/ui/CurrencySelector';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-slate-400">Manage your profile and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
            <input type="text" className="w-full bg-background border border-slate-700 rounded-md px-4 py-2 focus:ring-primary focus:border-primary" defaultValue="PlayerOne" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Hand Length (cm)</label>
              <input type="number" className="w-full bg-background border border-slate-700 rounded-md px-4 py-2" defaultValue="19.5" step="0.1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Hand Width (cm)</label>
              <input type="number" className="w-full bg-background border border-slate-700 rounded-md px-4 py-2" defaultValue="10.2" step="0.1" />
            </div>
          </div>
          <Button variant="secondary" className="mt-2">Save Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Language</div>
              <div className="text-sm text-slate-400">Select your preferred language.</div>
            </div>
            <LanguageSelector />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Currency</div>
              <div className="text-sm text-slate-400">Used for wallet and recommendations.</div>
            </div>
            <CurrencySelector />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-slate-400">Choose between dark and light mode.</div>
            </div>
            <select className="bg-background border border-slate-700 rounded-md px-3 py-1.5 text-sm">
              <option value="dark">Dark (Default)</option>
              <option value="light" disabled>Light (Coming Soon)</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
