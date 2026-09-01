'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Activity, LayoutDashboard, Wallet, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/analyze', icon: Activity, label: 'Analyze' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-surface rounded-md border border-slate-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-slate-800 transform transition-transform duration-200 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            <Activity className="w-8 h-8 text-primary" />
            <span>GripSync</span>
          </Link>
        </div>

        <nav className="mt-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
