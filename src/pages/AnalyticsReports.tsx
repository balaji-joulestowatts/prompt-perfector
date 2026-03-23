import { useState } from 'react';
import { KPICard } from '@/components/shared/KPICard';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar } from 'recharts';

const turnoverData = ['Jun 24','Jul','Aug','Sep','Oct','Nov','Dec','Jan 25','Feb','Mar','Apr','May'].map((m, i) => ({ month: m, value: [4.1,4.3,4.0,4.4,4.6,4.5,4.7,4.8,4.6,4.9,5.1,5.0][i] }));
const agingTable = [
  { bucket: '0–30 days', skus: 412, units: '4,82,400', value: '48.2', pct: '26.1%' },
  { bucket: '31–60 days', skus: 387, units: '3,91,200', value: '52.7', pct: '28.6%' },
  { bucket: '61–90 days', skus: 294, units: '2,84,600', value: '41.3', pct: '22.4%' },
  { bucket: '91–180 days', skus: 148, units: '1,24,800', value: '29.4', pct: '15.9%' },
  { bucket: '>180 days', skus: 43, units: '38,200', value: '13.0', pct: '7.0%' },
];
const carryingCost = ['Jun 24','Jul','Aug','Sep','Oct','Nov','Dec','Jan 25','Feb','Mar','Apr','May'].map((m, i) => ({ month: m, cost: [84,86,82,88,91,89,93,94,90,96,99,97][i] }));
const tabs = ['Inventory', 'Forecast', 'Procurement', 'Supplier', 'Financial'];

const AnalyticsReports = () => {
  const [tab, setTab] = useState('Inventory');
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Analytics & Reports</h1>
      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {tabs.map(t => <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded text-xs font-medium ${tab === t ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground'}`}>{t}</button>)}
      </div>
      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="text-[15px] font-semibold mb-4">Inventory Turnover Ratio (Monthly)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={turnoverData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 11 }} domain={[3.5, 5.5]} /><Tooltip /><ReferenceLine y={5.0} stroke="#DC2626" strokeDasharray="5 5" label="Target" /><Line type="monotone" dataKey="value" stroke="#0F52A0" strokeWidth={2} dot={{ r: 3 }} /></LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="p-4 border-b border-border"><h3 className="text-[15px] font-semibold">Stock Aging Report</h3></div>
        <table className="w-full text-table"><thead><tr className="bg-table-header">{['Age Bucket','SKU Count','Units','Value (₹ Cr)','% of Total'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-semibold">{h}</th>)}</tr></thead>
          <tbody>{agingTable.map(r => <tr key={r.bucket} className="border-t border-border"><td className="px-4 py-2">{r.bucket}</td><td className="px-4 py-2 font-mono">{r.skus}</td><td className="px-4 py-2 font-mono">{r.units}</td><td className="px-4 py-2 font-mono">{r.value}</td><td className="px-4 py-2 font-mono">{r.pct}</td></tr>)}
            <tr className="border-t-2 border-foreground/20 font-bold"><td className="px-4 py-2">Total</td><td className="px-4 py-2 font-mono">1,284</td><td className="px-4 py-2 font-mono">13,21,200</td><td className="px-4 py-2 font-mono">184.6</td><td className="px-4 py-2 font-mono">100%</td></tr>
          </tbody></table>
      </div>
      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="text-[15px] font-semibold mb-4">Monthly Carrying Costs (₹ L)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={carryingCost}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="cost" fill="#0F52A0" /></BarChart>
        </ResponsiveContainer>
      </div>
      <button onClick={() => toast.success('Report exported to PDF')} className="bg-primary text-primary-foreground px-5 py-2 rounded text-sm font-medium hover:opacity-90">Export Report</button>
    </div>
  );
};
export default AnalyticsReports;
