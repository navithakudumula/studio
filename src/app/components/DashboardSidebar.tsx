
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Droplets, 
  Hospital, 
  Users, 
  History, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';

interface NavItem {
  title: string;
  url: string;
  icon: any;
}

const commonNav: NavItem[] = [
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

const roleNav: Record<string, NavItem[]> = {
  admin: [
    { title: 'Analytics', url: '/dashboard/admin', icon: LayoutDashboard },
    { title: 'Inventory', url: '/dashboard/admin/inventory', icon: Droplets },
    { title: 'Users', url: '/dashboard/admin/users', icon: Users },
    { title: 'Requests', url: '/dashboard/admin/requests', icon: Bell },
  ],
  donor: [
    { title: 'My Impact', url: '/dashboard/donor', icon: Heart },
    { title: 'History', url: '/dashboard/donor/history', icon: History },
    { title: 'Find Drive', url: '/dashboard/donor/drives', icon: Search },
  ],
  hospital: [
    { title: 'Requests', url: '/dashboard/hospital', icon: Hospital },
    { title: 'Stock HUD', url: '/dashboard/hospital/inventory', icon: Droplets },
    { title: 'Donor Search', url: '/dashboard/hospital/search', icon: Search },
  ]
};

export function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const items = roleNav[role] || [];

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">L</div>
          <span className="font-headline text-lg group-data-[collapsible=icon]:hidden">LifeLink</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {commonNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="mr-2" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
