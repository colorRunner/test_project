import React from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Database, ShieldCheck, FileText, Users, HardDrive, Search, Eye } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const dataClassification = [
  { name: '极高敏感 (L4)', value: 15, color: '#ff4d4d' },
  { name: '高敏感 (L3)', value: 25, color: '#ffcc00' },
  { name: '中敏感 (L2)', value: 35, color: '#00f2ff' },
  { name: '低敏感 (L1)', value: 25, color: '#00ff99' },
];

const accessTrends = [
  { name: 'Mon', internal: 400, external: 240 },
  { name: 'Tue', internal: 300, external: 139 },
  { name: 'Wed', internal: 200, external: 980 },
  { name: 'Thu', internal: 278, external: 390 },
  { name: 'Fri', internal: 189, external: 480 },
  { name: 'Sat', internal: 239, external: 380 },
  { name: 'Sun', internal: 349, external: 430 },
];

const riskRadar = [
  { subject: '数据泄露', A: 120, B: 110, fullMark: 150 },
  { subject: '权限滥用', A: 98, B: 130, fullMark: 150 },
  { subject: '违规外发', A: 86, B: 130, fullMark: 150 },
  { subject: '脱敏异常', A: 99, B: 100, fullMark: 150 },
  { subject: '存储合规', A: 85, B: 90, fullMark: 150 },
  { subject: '接口安全', A: 65, B: 85, fullMark: 150 },
];

export const DataSecurityDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Top Stats */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="数据资产总量" value="1.2 PB" trend="+50GB" icon={<Database className="text-dashboard-accent" />} />
        <StatCard title="敏感数据占比" value="18.5%" trend="-1.2%" icon={<ShieldCheck className="text-dashboard-success" />} />
        <StatCard title="异常访问行为" value="156" trend="+12" icon={<Eye className="text-dashboard-danger" />} />
        <StatCard title="合规达标率" value="98.2%" trend="Stable" icon={<FileText className="text-dashboard-accent" />} />
      </div>

      {/* Main Charts */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="dashboard-card p-6 h-[350px]">
            <h3 className="text-sm font-bold text-slate-400 mb-6 flex items-center">
              <Search className="mr-2 text-dashboard-accent" size={16} />
              数据分级分类分布
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataClassification}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataClassification.map((entry, index) => (
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

          <div className="dashboard-card p-6 h-[350px]">
            <h3 className="text-sm font-bold text-slate-400 mb-6 flex items-center">
              <ShieldCheck className="mr-2 text-dashboard-accent" size={16} />
              安全风险评估模型
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskRadar}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="当前风险" dataKey="A" stroke="#00f2ff" fill="#00f2ff" fillOpacity={0.5} />
                  <Radar name="基准水平" dataKey="B" stroke="#00ff99" fill="#00ff99" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ backgroundColor: '#0a1428', border: '1px solid rgba(0,242,255,0.3)', borderRadius: '8px' }} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="dashboard-card p-6 h-[350px]">
          <h3 className="text-sm font-bold text-slate-400 mb-6 flex items-center">
            <Users className="mr-2 text-dashboard-accent" size={16} />
            敏感数据访问趋势 (内网 vs 外网)
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accessTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0a1428', border: '1px solid rgba(0,242,255,0.3)', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="internal" name="内网访问" fill="#00f2ff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="external" name="外网访问" fill="#ffcc00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="dashboard-card p-6 min-h-[400px]">
          <h3 className="text-sm font-bold text-slate-400 mb-6 flex items-center">
            <HardDrive className="mr-2 text-dashboard-accent" size={16} />
            核心数据资产清单
          </h3>
          <div className="space-y-4">
            <AssetItem 
              name="用户个人隐私库" 
              type="MySQL" 
              level="极高" 
              status="已加密" 
            />
            <AssetItem 
              name="财务交易流水" 
              type="Oracle" 
              level="极高" 
              status="已脱敏" 
            />
            <AssetItem 
              name="核心算法源代码" 
              type="GitLab" 
              level="高" 
              status="受控访问" 
            />
            <AssetItem 
              name="员工薪资档案" 
              type="File Server" 
              level="高" 
              status="已加密" 
            />
            <AssetItem 
              name="产品研发路线图" 
              type="Confluence" 
              level="中" 
              status="内网可见" 
            />
          </div>
        </div>

        <div className="dashboard-card p-6">
          <h3 className="text-sm font-bold text-slate-400 mb-4">数据泄露风险预警</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-dashboard-danger/5 border border-dashboard-danger/20 rounded">
              <span className="text-xs text-slate-300">员工 A 异常下载 500+ 客户资料</span>
              <span className="text-[10px] text-dashboard-danger font-bold">高风险</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-dashboard-warning/5 border border-dashboard-warning/20 rounded">
              <span className="text-xs text-slate-300">检测到明文存储的身份证号</span>
              <span className="text-[10px] text-dashboard-warning font-bold">中风险</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-dashboard-accent/5 border border-dashboard-accent/20 rounded">
              <span className="text-xs text-slate-300">数据库备份文件权限配置过宽</span>
              <span className="text-[10px] text-dashboard-accent font-bold">低风险</span>
            </div>
          </div>
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
          trend.startsWith('+') ? "text-dashboard-danger" : trend.startsWith('-') ? "text-dashboard-success" : "text-slate-500"
        )}>
          {trend}
        </span>
      </div>
    </div>
  </div>
);

const AssetItem = ({ name, type, level, status }: { name: string, type: string, level: string, status: string }) => (
  <div className="p-3 rounded bg-white/5 border border-white/5 hover:border-dashboard-accent/30 transition-colors">
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-bold text-slate-200">{name}</span>
      <span className={cn(
        "text-[9px] px-1.5 py-0.5 rounded font-bold",
        level === '极高' ? "bg-dashboard-danger/20 text-dashboard-danger" : "bg-dashboard-warning/20 text-dashboard-warning"
      )}>
        {level}
      </span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[10px] text-slate-500">{type}</span>
      <span className="text-[10px] text-dashboard-success">{status}</span>
    </div>
  </div>
);
