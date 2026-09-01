'use client';
import { useStore } from '@/lib/store';

export function CurrencySelector() {
  const { currency, setCurrency } = useStore();
  return (
    <select 
      value={currency} 
      onChange={(e) => setCurrency(e.target.value)}
      className="bg-background border border-slate-700 rounded-md px-3 py-1.5 text-sm focus:ring-primary focus:border-primary"
    >
      <option value="USD">USD ($)</option>
      <option value="EUR">EUR (€)</option>
      <option value="GBP">GBP (£)</option>
    </select>
  );
}
