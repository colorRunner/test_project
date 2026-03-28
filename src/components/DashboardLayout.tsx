import React from 'react';
import { Shield, Database, Activity, AlertTriangle, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: 'network' | 'data';
  setActiveTab: (tab: 'network' | 'data') => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen w-full bg-dashboard-bg overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "transition-all duration-300 border-r border-dashboard-border bg-dashboard-card/50 backdrop-blur-xl z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-xl font-bold text-dashboard-accent tracking-widest glitch-text">SEC-OPS</h1>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-dashboard-accent/10 rounded-lg text-dashboard-accent transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-4">
          <button
            onClick={() => setActiveTab('network')}
            className={cn(
              "w-full flex items-center p-3 rounded-lg transition-all group",
              activeTab === 'network' 
                ? "bg-dashboard-accent/20 text-dashboard-accent border border-dashboard-accent/50" 
                : "text-slate-400 hover:text-dashboard-accent hover:bg-dashboard-accent/5"
            )}
          >
            <Shield className={cn("shrink-0", activeTab === 'network' ? "text-dashboard-accent" : "group-hover:text-dashboard-accent")} />
            {isSidebarOpen && <span className="ml-4 font-medium">网络安全态势</span>}
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={cn(
              "w-full flex items-center p-3 rounded-lg transition-all group",
              activeTab === 'data' 
                ? "bg-dashboard-accent/20 text-dashboard-accent border border-dashboard-accent/50" 
                : "text-slate-400 hover:text-dashboard-accent hover:bg-dashboard-accent/5"
            )}
          >
            <Database className={cn("shrink-0", activeTab === 'data' ? "text-dashboard-accent" : "group-hover:text-dashboard-accent")} />
            {isSidebarOpen && <span className="ml-4 font-medium">数据安全态势</span>}
          </button>
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-6">
          <div className={cn("flex items-center text-xs text-slate-500", !isSidebarOpen && "justify-center")}>
            <Activity size={14} className="text-dashboard-success animate-pulse mr-2" />
            {isSidebarOpen && <span>系统运行正常</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
        <div className="scanline" />
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-dashboard-bg/80 backdrop-blur-md border-b border-dashboard-border p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-2 w-2 rounded-full bg-dashboard-accent animate-ping" />
            <h2 className="text-lg font-semibold text-slate-100">
              {activeTab === 'network' ? '网络安全综合态势感知平台' : '数据资产安全监测与治理平台'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Current Time</span>
              <span className="text-sm font-mono text-dashboard-accent">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="p-2 border border-dashboard-danger/50 bg-dashboard-danger/10 rounded text-dashboard-danger flex items-center space-x-2 animate-pulse">
              <AlertTriangle size={16} />
              <span className="text-xs font-bold">3 高危告警</span>
            </div>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
