'use client';
import { useStore } from '@/lib/store';

export function LanguageSelector() {
  const { language, setLanguage } = useStore();
  return (
    <select 
      value={language} 
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-background border border-slate-700 rounded-md px-3 py-1.5 text-sm focus:ring-primary focus:border-primary"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="zh">中文</option>
    </select>
  );
}
