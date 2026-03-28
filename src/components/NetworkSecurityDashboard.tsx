import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar
} from 'recharts';
import { Shield, AlertCircle, Zap, Globe, Lock, Server } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const attackData = [
  { time: '00:00', attacks: 120, blocked: 118 },
  { time: '04:00', attacks: 300, blocked: 295 },
  { time: '08:00', attacks: 450, blocked: 448 },
  { time: '12:00', attacks: 800, blocked: 790 },
  { time: '16:00', attacks: 600, blocked: 598 },
  { time: '20:00', attacks: 400, blocked: 399 },
  { time: '23:59', attacks: 200, blocked: 198 },
];

const threatTypes = [
  { name: 'DDoS攻击', value: 400, color: '#00f2ff' },
  { name: 'SQL注入', value: 300, color: '#00ff99' },
  { name: '恶意木马', value: 200, color: '#ffcc00' },
  { name: '暴力破解', value: 100, color: '#ff4d4d' },
];

const assetStatus = [
  { name: '在线', value: 85, color: '#00ff99' },
  { name: '离线', value: 10, color: '#ff4d4d' },
  { name: '异常', value: 5, color: '#ffcc00' },
];

export const NetworkSecurityDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Top Stats */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="今日攻击总数" value="12,482" trend="+12%" icon={<Shield className="text-dashboard-accent" />} />
        <StatCard title="实时拦截率" value="99.8%" trend="+0.2%" icon={<Lock className="text-dashboard-success" />} />
        <StatCard title="受威胁资产" value="24" trend="-5" icon={<Server className="text-dashboard-warning" />} />
        <StatCard title="安全评分" value="92" trend="Stable" icon={<Zap className="text-dashboard-accent" />} />
      </div>

      {/* Main Charts */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="dashboard-card p-6 h-[400px]">
          <h3 className="text-sm font-bold text-slate-400 mb-6 flex items-center">
            <Activity className="mr-2 text-dashboard-accent" size={16} />
            24小时攻击趋势监测
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attackData}>
                <defs>
                  <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a1428', border: '1px solid rgba(0,242,255,0.3)', borderRadius: '8px' }}
                  itemStyle={{ color: '#00f2ff' }}
                />
                <Area type="monotone" dataKey="attacks" stroke="#00f2ff" fillOpacity={1} fill="url(#colorAttacks)" />
                <Line type="monotone" dataKey="blocked" stroke="#00ff99" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="dashboard-card p-6 h-[300px]">
            <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center">
              <Globe className="mr-2 text-dashboard-accent" size={16} />
              威胁类型分布
            </h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {threatTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a1428', border: '1px solid rgba(0,242,255,0.3)', borderRadius: '8px' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dashboard-card p-6 h-[300px]">
            <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center">
              <Server className="mr-2 text-dashboard-accent" size={16} />
              资产运行状态
            </h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={assetStatus} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#475569" fontSize={12} width={60} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#0a1428', border: '1px solid rgba(0,242,255,0.3)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {assetStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="dashboard-card p-6 min-h-[400px]">
          <h3 className="text-sm font-bold text-slate-400 mb-6 flex items-center justify-between">
            <span className="flex items-center">
              <AlertCircle className="mr-2 text-dashboard-danger" size={16} />
              实时安全告警
            </span>
            <span className="text-[10px] bg-dashboard-danger/20 text-dashboard-danger px-2 py-0.5 rounded">LIVE</span>
          </h3>
          <div className="space-y-4">
            <AlertItem 
              level="high" 
              title="检测到大规模DDoS攻击" 
              target="核心网关 10.0.0.1" 
              time="12:45:22" 
            />
            <AlertItem 
              level="medium" 
              title="异常SQL注入尝试" 
              target="用户数据库 PRD-DB-01" 
              time="12:44:10" 
            />
            <AlertItem 
              level="low" 
              title="SSH暴力破解拦截" 
              target="跳板机 BASTION-SRV" 
              time="12:42:05" 
            />
            <AlertItem 
              level="high" 
              title="发现恶意木马外联" 
              target="财务部终端 PC-FIN-023" 
              time="12:40:15" 
            />
            <AlertItem 
              level="medium" 
              title="未授权访问尝试" 
              target="管理后台 ADMIN-PORTAL" 
              time="12:38:55" 
            />
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-dashboard-accent border border-dashboard-accent/30 hover:bg-dashboard-accent/10 transition-colors rounded">
            查看全部告警
          </button>
        </div>

        <div className="dashboard-card p-6">
          <h3 className="text-sm font-bold text-slate-400 mb-4">安全防御建议</h3>
          <ul className="text-xs space-y-3 text-slate-400">
            <li className="flex items-start">
              <div className="h-1.5 w-1.5 rounded-full bg-dashboard-accent mt-1.5 mr-2 shrink-0" />
              建议立即更新核心防火墙策略，封禁 185.x.x.x 网段。
            </li>
            <li className="flex items-start">
              <div className="h-1.5 w-1.5 rounded-full bg-dashboard-accent mt-1.5 mr-2 shrink-0" />
              检测到多个过期SSL证书，请在48小时内完成更换。
            </li>
            <li className="flex items-start">
              <div className="h-1.5 w-1.5 rounded-full bg-dashboard-accent mt-1.5 mr-2 shrink-0" />
              财务部终端安全补丁版本过低，建议强制推送更新。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) => (
  <div className="dashboard-card p-4 flex items-center space-x-4">
    <div className="p-3 bg-dashboard-accent/10 rounded-lg border border-dashboard-accent/20">
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{title}</p>
      <div className="flex items-baseline space-x-2">
        <h4 className="text-2xl font-mono font-bold text-slate-100">{value}</h4>
        <span className={cn(
          "text-[10px] font-bold",
          trend.startsWith('+') ? "text-dashboard-success" : trend.startsWith('-') ? "text-dashboard-danger" : "text-slate-500"
        )}>
          {trend}
        </span>
      </div>
    </div>
  </div>
);

const AlertItem = ({ level, title, target, time }: { level: 'high' | 'medium' | 'low', title: string, target: string, time: string }) => (
  <div className={cn(
    "p-3 rounded border-l-4 bg-white/5",
    level === 'high' ? "border-dashboard-danger" : level === 'medium' ? "border-dashboard-warning" : "border-dashboard-accent"
  )}>
    <div className="flex justify-between items-start mb-1">
      <span className="text-xs font-bold text-slate-200">{title}</span>
      <span className="text-[10px] font-mono text-slate-500">{time}</span>
    </div>
    <p className="text-[10px] text-slate-400">目标: {target}</p>
  </div>
);

const Activity = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
