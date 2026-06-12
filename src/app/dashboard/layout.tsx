
"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/app/components/DashboardSidebar';
import { Toaster } from '@/components/ui/toaster';
import { useState, useEffect } from 'react';
import { MOCK_USERS } from '@/app/lib/mock-data';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(MOCK_USERS[0]); // Simulate Sarah Mitchell (Admin)

  // In a real app, logic here would detect role from cookie/session
  // For demo, we might use search params or just state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('as');
    if (roleParam === 'donor') setUser(MOCK_USERS[1]);
    if (roleParam === 'hospital') setUser(MOCK_USERS[2]);
  }, []);

  return (
    <SidebarProvider>
      <DashboardSidebar role={user.role} />
      <SidebarInset className="bg-background">
        <header className="h-16 border-b flex items-center px-6 gap-4 sticky top-0 bg-background/80 backdrop-blur z-40">
          <SidebarTrigger />
          <div className="h-4 w-px bg-border mx-2" />
          <div className="flex-1">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {user.role} Workspace
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary border flex items-center justify-center font-bold text-primary">
              {user.name[0]}
            </div>
          </div>
        </header>
        <main className="p-6 md:p-10 max-w-7xl mx-auto w-full animate-fade-in-up">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
