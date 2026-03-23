import { KPICard } from '@/components/shared/KPICard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const expiryTimeline = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  batches: [12, 8, 6, 9, 7, 5, 4, 6, 3, 5, 4, 3][i],
  color: i < 3 ? '#DC2626' : i < 6 ? '#F59E0B' : '#16A34A',
}));

const batches = [
  { batch: 'B2401-AMX', name: 'Amoxicillin 500mg Cap', cat: 'Antibiotics', qty: '4,200', mfg: 'Jan 2024', expiry: 'Jul 12, 2025', days: 19, loc: 'Mumbai WH', value: '11.2', status: 'Expiring Soon', action: 'Expedite / Write-off' },
  { batch: 'B2402-ATV', name: 'Atorvastatin 40mg', cat: 'Cardiovascular', qty: '2,800', mfg: 'Feb 2024', expiry: 'Jul 28, 2025', days: 35, loc: 'Ahmedabad WH', value: '7.4', status: 'At Risk', action: 'Review' },
  { batch: 'B2312-VD3', name: 'Vitamin D3 60K IU', cat: 'Vitamins', qty: '8,400', mfg: 'Dec 2023', expiry: 'Aug 15, 2025', days: 53, loc: 'Mumbai WH', value: '5.0', status: 'At Risk', action: 'Review' },
  { batch: 'B2403-MET', name: 'Metformin 500mg', cat: 'Antidiabetics', qty: '12,000', mfg: 'Mar 2024', expiry: 'Sep 3, 2025', days: 72, loc: 'Hyderabad WH', value: '8.0', status: 'OK', action: 'Monitor' },
  { batch: 'B2312-IBU', name: 'Ibuprofen 400mg', cat: 'Analgesics', qty: '18,000', mfg: 'Dec 2023', expiry: 'Jul 8, 2025', days: 15, loc: 'Mumbai WH', value: '5.4', status: 'Expiring Soon', action: 'Expedite' },
  { batch: 'B2401-CEF', name: 'Cefixime 200mg Cap', cat: 'Antibiotics', qty: '3,600', mfg: 'Jan 2024', expiry: 'Jul 20, 2025', days: 27, loc: 'Pune WH', value: '9.6', status: 'Expiring Soon', action: 'Expedite' },
  { batch: 'B2404-PAN', name: 'Pantoprazole 40mg', cat: 'GI', qty: '5,100', mfg: 'Apr 2024', expiry: 'Oct 12, 2025', days: 111, loc: 'Mumbai WH', value: '3.5', status: 'OK', action: 'Monitor' },
  { batch: 'B2402-CLO', name: 'Clopidogrel 75mg', cat: 'Cardiovascular', qty: '1,900', mfg: 'Feb 2024', expiry: 'Aug 28, 2025', days: 66, loc: 'Ankleshwar', value: '2.8', status: 'OK', action: 'Monitor' },
  { batch: 'B2311-FLU', name: 'Fluconazole 150mg', cat: 'Antifungal', qty: '600', mfg: 'Nov 2023', expiry: 'Jun 25, 2025', days: 2, loc: 'Mumbai WH', value: '1.5', status: 'EXPIRED', action: 'Write-off Now' },
  { batch: 'B2401-CEL', name: 'Cetirizine 10mg', cat: 'Respiratory', qty: '7,200', mfg: 'Jan 2024', expiry: 'Sep 18, 2025', days: 87, loc: 'Hyderabad WH', value: '5.8', status: 'OK', action: 'Monitor' },
];

const getRowBg = (days: number) => {
  if (days <= 30) return 'bg-[#FEF2F2]';
  if (days <= 60) return 'bg-[#FFFBEB]';
  return '';
};

const getStatusVariant = (s: string) => {
  if (s === 'EXPIRED' || s === 'Expiring Soon') return 'critical' as const;
  if (s === 'At Risk') return 'warning' as const;
  return 'ok' as const;
};

const BatchExpiry = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold">Batch & Expiry Management</h1>
      <p className="text-sm text-muted-foreground mt-1">Shelf-life tracking and expiry risk by batch</p>
    </div>

    <div className="grid grid-cols-4 gap-4">
      <KPICard label="Active Batches" value="3,847" />
      <KPICard label="Expiring in 30 Days" value="73 batches" trend="₹4.2 Cr at risk" trendDirection="up" trendColor="destructive" />
      <KPICard label="Expiring in 60 Days" value="148 batches" />
      <KPICard label="Expired (Write-off Pending)" value="8 batches" trend="₹0.6 Cr" trendDirection="up" trendColor="destructive" />
    </div>

    <div className="bg-card rounded-lg shadow-card p-5">
      <h3 className="text-[15px] font-semibold mb-4">Expiry Timeline — Next 12 Weeks</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={expiryTimeline}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="week" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="batches" name="Batches Expiring">
            {expiryTimeline.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-table">
          <thead>
            <tr className="bg-table-header text-left">
              {['Batch #', 'SKU Name', 'Category', 'Qty', 'MFG Date', 'Expiry Date', 'Days Left', 'Location', 'Value (₹L)', 'Status', 'Action'].map(h => (
                <th key={h} className="px-3 py-2 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.batch} className={`border-t border-border ${getRowBg(b.days)}`}>
                <td className="px-3 py-2 font-mono text-xs">{b.batch}</td>
                <td className="px-3 py-2 font-medium whitespace-nowrap">{b.name}</td>
                <td className="px-3 py-2">{b.cat}</td>
                <td className="px-3 py-2 font-mono">{b.qty}</td>
                <td className="px-3 py-2">{b.mfg}</td>
                <td className="px-3 py-2">{b.expiry}</td>
                <td className="px-3 py-2 font-mono">{b.days}</td>
                <td className="px-3 py-2">{b.loc}</td>
                <td className="px-3 py-2 font-mono">{b.value}</td>
                <td className="px-3 py-2"><StatusBadge variant={getStatusVariant(b.status)}>{b.status}</StatusBadge></td>
                <td className="px-3 py-2"><button className="text-primary text-xs font-medium hover:underline">{b.action}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default BatchExpiry;
