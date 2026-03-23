import { KPICard } from '@/components/shared/KPICard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const demandData = [
  { month: 'Jun 24', forecast: 42, actual: 40 },
  { month: 'Jul 24', forecast: 44, actual: 43 },
  { month: 'Aug 24', forecast: 48, actual: 47 },
  { month: 'Sep 24', forecast: 51, actual: 52 },
  { month: 'Oct 24', forecast: 53, actual: 54 },
  { month: 'Nov 24', forecast: 56, actual: 55 },
  { month: 'Dec 24', forecast: 55, actual: 57 },
  { month: 'Jan 25', forecast: 58, actual: 59 },
  { month: 'Feb 25', forecast: 61, actual: 60 },
  { month: 'Mar 25', forecast: 63, actual: 64 },
  { month: 'Apr 25', forecast: 67, actual: 66 },
  { month: 'May 25', forecast: 69, actual: 71 },
];

const healthData = [
  { name: 'Healthy Stock', value: 847, color: '#16A34A' },
  { name: 'Near Reorder', value: 272, color: '#F59E0B' },
  { name: 'Stockout Risk', value: 38, color: '#DC2626' },
  { name: 'Overstock', value: 127, color: '#7C3AED' },
];

const alerts = [
  { color: 'destructive' as const, icon: '🔴', title: 'Amoxicillin 500mg Cap', desc: 'Stockout in 4 days (Mumbai WH)' },
  { color: 'warning' as const, icon: '🟡', title: 'Metformin 1000mg Tab', desc: '18-day supply remaining' },
  { color: 'destructive' as const, icon: '🔴', title: 'Atorvastatin 40mg', desc: 'Batch B2401 expires in 12 days' },
  { color: 'warning' as const, icon: '🟡', title: 'Paracetamol 650mg', desc: 'Demand surge detected (+34% WoW)' },
  { color: 'destructive' as const, icon: '🔴', title: 'Azithromycin 250mg', desc: 'Purchase order overdue by 6 days' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Good morning, Priya. Here's your supply chain health.</h1>
        <p className="text-sm text-muted-foreground mt-1">Monday, 23 June 2025 — Mumbai HQ</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-4">
        <KPICard label="Total SKUs Tracked" value="1,284" trend="+12 this week" trendDirection="up" trendColor="success" />
        <KPICard label="Inventory Value" value="₹184.6 Cr" trend="↑ +3.2% vs last month" trendDirection="up" trendColor="success" />
        <KPICard label="Stockout Risk SKUs" value="38" trend="↑ +5 since yesterday" trendDirection="up" trendColor="warning" />
        <KPICard label="Overstock SKUs" value="127" trend="↓ -8 vs last week" trendDirection="down" trendColor="success" />
        <KPICard label="Forecast Accuracy (MAPE)" value="91.4%" trend="↑ +1.1% vs last month" trendDirection="up" trendColor="success" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 bg-card rounded-lg shadow-card p-5 border border-border">
          <h3 className="text-[15px] font-semibold mb-4 text-foreground">Demand Forecast vs. Actuals</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={demandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} dy={10} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} dx={-10} stroke="hsl(var(--muted-foreground))" unit="K" />
              <Tooltip cursor={{ stroke: '#E2E8F0', strokeWidth: 2, strokeDasharray: '4 4' }} contentStyle={{ borderRadius: '6px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12, fontWeight: 500 }} />
              <Line type="monotone" dataKey="forecast" stroke="#0F52A0" strokeWidth={3} name="Forecasted Demand" dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#0F52A0' }} />
              <Line type="monotone" dataKey="actual" stroke="#00A896" strokeWidth={3} strokeDasharray="5 5" name="Actual Demand" dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#00A896' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-2 bg-card rounded-lg shadow-card p-5 border border-border">
          <h3 className="text-[15px] font-semibold mb-4 text-foreground">Inventory Health Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie data={healthData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value" nameKey="name" 
                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`} labelLine={{ strokeWidth: 1, stroke: '#94A3B8' }}>
                {healthData.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '6px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12, fontWeight: 500, padding: '8px 12px' }} itemStyle={{ fontWeight: 600 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center -mt-6 text-[13px] font-semibold text-foreground">1,284 SKUs Total</div>
        </div>
      </div>

      {/* Panels Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Alerts */}
        <div className="bg-card rounded-lg shadow-card p-5 border-l-4 border-destructive">
          <h3 className="text-[15px] font-semibold mb-3">Top 5 Critical Alerts</h3>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-2 text-table">
                <span>{a.icon}</span>
                <div className="flex-1">
                  <span className="font-medium">{a.title}</span>
                  <span className="text-muted-foreground"> — {a.desc}</span>
                </div>
                <button className="text-primary text-xs font-medium hover:underline shrink-0">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* Scenarios */}
        <div className="bg-card rounded-lg shadow-card p-5">
          <h3 className="text-[15px] font-semibold mb-3">Forecast Scenarios Summary</h3>
          <div className="space-y-3">
            {[
              { emoji: '🐂', label: 'Bull Case', color: 'bg-success/5 border-success/20', value: '2.84 Lakh units', conf: '72%', note: 'Seasonal flu surge, monsoon demand' },
              { emoji: '📊', label: 'Base Case', color: 'bg-primary/5 border-primary/20', value: '2.31 Lakh units', conf: '91%', note: 'Historical trend continuation' },
              { emoji: '🐻', label: 'Bear Case', color: 'bg-destructive/5 border-destructive/20', value: '1.87 Lakh units', conf: '68%', note: 'Supply disruption, demand softening' },
            ].map((s, i) => (
              <div key={i} className={`rounded-md border p-3 ${s.color}`}>
                <div className="flex items-center gap-2 text-sm font-semibold">{s.emoji} {s.label}</div>
                <div className="font-mono text-lg font-bold mt-1">{s.value}</div>
                <div className="text-xs text-muted-foreground">Confidence: {s.conf} | {s.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Procurement Pipeline */}
        <div className="bg-card rounded-lg shadow-card p-5">
          <h3 className="text-[15px] font-semibold mb-3">Procurement Pipeline</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span>3 POs Awaiting Approval</span>
              <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:opacity-90">Review</button>
            </div>
            <div className="text-muted-foreground">7 POs In Transit (ETA within 7 days)</div>
            <div className="font-mono font-semibold">₹12.4 Cr <span className="font-sans font-normal text-muted-foreground">spend committed this month</span></div>
            <div className="text-muted-foreground">Next large PO due: <span className="text-foreground font-medium">26 Jun 2025</span> — Cipla API Supply (₹3.2 Cr)</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        {[
          { label: 'Run Demand Forecast', path: '/forecast-overview' },
          { label: 'View Reorder Recommendations', path: '/reorder-recommendations' },
          { label: 'Review Expiry Alerts', path: '/batch-expiry' },
        ].map(a => (
          <button key={a.path} onClick={() => navigate(a.path)} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.98]">
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
