'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';

const SidebarItem = ({ 
  href, 
  icon: Icon, 
  label, 
  active 
}: { 
  href: string; 
  icon: any; 
  label: string; 
  active: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-[#3871FF] text-white shadow-lg shadow-[#3871FF]/20" 
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    )}
  >
    <Icon size={20} className={cn(active ? "text-white" : "text-gray-400 group-hover:text-gray-900")} />
    <span className="font-medium">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto" />}
  </Link>
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const isOnLogin = pathname === '/admin/login';

  useEffect(() => {
    if (status === 'unauthenticated' && !isOnLogin) {
      router.push('/admin/login');
    }
  }, [status, isOnLogin, router]);

  if (isOnLogin) {
    return <>{children}</>;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#3871FF]" size={40} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = {
    name: session.user?.name || '管理员',
    role: '超级管理员',
    avatar: session.user?.image || 'https://picsum.photos/seed/admin/200/200'
  };

  const menuItems = [
    { href: '/admin/contacts', icon: MessageSquare, label: '联系记录' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 md:relative md:translate-x-0",
          !isSidebarOpen && "-translate-x-full md:w-20"
        )}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-8 h-8 bg-[#3871FF] rounded-lg flex items-center justify-center text-white font-bold">
              X
            </div>
            {isSidebarOpen && <span className="text-xl font-bold tracking-tight">Xspark 管理</span>}
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={isSidebarOpen ? item.label : ''}
                active={pathname === item.href}
              />
            ))}
          </nav>

          <div className="pt-4 border-t border-gray-100">
            <button 
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors group"
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="font-medium">退出登录</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full border-2 border-gray-100"
            />
          </div>
        </header>

        <main className="p-4 md:p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
