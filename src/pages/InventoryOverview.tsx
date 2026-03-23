import { KPICard } from '@/components/shared/KPICard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend,
} from 'recharts';

const catValues = [
  { category: 'Antibiotics', value: 38.4 },
  { category: 'Analgesics', value: 29.7 },
  { category: 'Antidiabetics', value: 24.3 },
  { category: 'Vitamins & Supp.', value: 22.1 },
  { category: 'Cardiovascular', value: 19.8 },
  { category: 'Respiratory', value: 14.6 },
  { category: 'Antihypert.', value: 12.9 },
  { category: 'GI', value: 11.2 },
  { category: 'Dermatology', value: 7.4 },
  { category: 'Neurology', value: 4.2 },
];

const locationData = [
  { name: 'Mumbai WH', healthy: 287, low: 14, overstock: 42 },
  { name: 'Ahmedabad WH', healthy: 198, low: 9, overstock: 28 },
  { name: 'Hyderabad WH', healthy: 164, low: 7, overstock: 19 },
  { name: 'Pune WH', healthy: 143, low: 5, overstock: 31 },
  { name: 'Baddi Factory', healthy: 89, low: 3, overstock: 7 },
  { name: 'Ankleshwar', healthy: 76, low: 0, overstock: 0 },
];

const inventory = [
  { code: 'PFC-001', name: 'Amoxicillin 500mg Cap', cat: 'Antibiotics', loc: 'Mumbai WH', onHand: '3,240', reserved: '480', available: '2,760', reorder: '2,000', safety: '800', days: '22 days', status: 'Low', value: '8.6' },
  { code: 'PFC-002', name: 'Metformin 500mg Tab', cat: 'Antidiabetics', loc: 'Mumbai WH', onHand: '18,400', reserved: '1,200', available: '17,200', reorder: '6,000', safety: '2,400', days: '84 days', status: 'OK', value: '12.3' },
  { code: 'PFC-003', name: 'Atorvastatin 40mg Tab', cat: 'Cardiovascular', loc: 'Mumbai WH', onHand: '6,800', reserved: '400', available: '6,400', reorder: '3,000', safety: '1,200', days: '63 days', status: 'OK', value: '9.4' },
  { code: 'PFC-004', name: 'Paracetamol 650mg Tab', cat: 'Analgesics', loc: 'Mumbai WH', onHand: '42,000', reserved: '3,200', available: '38,800', reorder: '12,000', safety: '4,800', days: '138 days', status: 'Overstock', value: '7.1' },
  { code: 'PFC-005', name: 'Azithromycin 250mg Tab', cat: 'Antibiotics', loc: 'Ahmedabad WH', onHand: '820', reserved: '200', available: '620', reorder: '1,500', safety: '600', days: '11 days', status: 'Critical', value: '4.9' },
  { code: 'PFC-006', name: 'Omeprazole 20mg Cap', cat: 'GI', loc: 'Mumbai WH', onHand: '9,200', reserved: '600', available: '8,600', reorder: '3,200', safety: '1,200', days: '90 days', status: 'OK', value: '6.3' },
  { code: 'PFC-007', name: 'Cetirizine 10mg Tab', cat: 'Respiratory', loc: 'Hyderabad WH', onHand: '4,800', reserved: '300', available: '4,500', reorder: '2,400', safety: '960', days: '62 days', status: 'OK', value: '3.8' },
  { code: 'PFC-008', name: 'Losartan 50mg Tab', cat: 'Antihypert.', loc: 'Pune WH', onHand: '5,400', reserved: '420', available: '4,980', reorder: '1,700', safety: '680', days: '97 days', status: 'OK', value: '5.1' },
  { code: 'PFC-009', name: 'Vitamin D3 60K IU', cat: 'Vitamins', loc: 'Mumbai WH', onHand: '24,600', reserved: '1,800', available: '22,800', reorder: '5,800', safety: '2,300', days: '130 days', status: 'Overstock', value: '14.7' },
  { code: 'PFC-010', name: 'Pantoprazole 40mg Tab', cat: 'GI', loc: 'Mumbai WH', onHand: '7,100', reserved: '500', available: '6,600', reorder: '2,100', safety: '840', days: '105 days', status: 'OK', value: '4.9' },
];

const statusVariant = (s: string) => {
  if (s === 'Critical') return 'critical';
  if (s === 'Low') return 'low';
  if (s === 'Overstock') return 'overstock';
  return 'ok';
};

const InventoryOverview = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold">Inventory Overview</h1>
      <p className="text-sm text-muted-foreground mt-1">Real-time stock health across all locations</p>
    </div>

    <div className="grid grid-cols-5 gap-4">
      <KPICard label="Total SKUs" value="1,284" trend="Across 6 warehouses" />
      <KPICard label="Total Inventory Value" value="₹184.6 Cr" />
      <KPICard label="SKUs Below Reorder Point" value="38" trend="↑ Critical" trendDirection="up" trendColor="destructive" />
      <KPICard label="Expiring in 30 Days" value="73 batches" trend="14 SKUs" />
      <KPICard label="Pending GRN (₹ value)" value="₹22.8 Cr" trend="12 POs" />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="text-[15px] font-semibold mb-4">Inventory Value by Category (₹ Cr)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={catValues} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={100} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="value" fill="#0F52A0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="text-[15px] font-semibold mb-4">Stock Health by Location</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={locationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend />
            <Bar dataKey="healthy" name="Healthy" stackId="a" fill="#16A34A" />
            <Bar dataKey="low" name="Low Stock" stackId="a" fill="#DC2626" />
            <Bar dataKey="overstock" name="Overstock" stackId="a" fill="#7C3AED" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-table">
          <thead>
            <tr className="bg-table-header text-left">
              {['SKU Code', 'SKU Name', 'Category', 'Location', 'On Hand', 'Reserved', 'Available', 'Reorder Pt', 'Safety Stock', 'Days Supply', 'Status', 'Value (₹L)'].map(h => (
                <th key={h} className="px-3 py-2 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventory.map((r) => (
              <tr key={r.code} className="border-t border-border hover:bg-muted/50">
                <td className="px-3 py-2 font-mono text-xs">{r.code}</td>
                <td className="px-3 py-2 font-medium whitespace-nowrap">{r.name}</td>
                <td className="px-3 py-2">{r.cat}</td>
                <td className="px-3 py-2">{r.loc}</td>
                <td className="px-3 py-2 font-mono">{r.onHand}</td>
                <td className="px-3 py-2 font-mono">{r.reserved}</td>
                <td className="px-3 py-2 font-mono">{r.available}</td>
                <td className="px-3 py-2 font-mono">{r.reorder}</td>
                <td className="px-3 py-2 font-mono">{r.safety}</td>
                <td className="px-3 py-2 font-mono">{r.days}</td>
                <td className="px-3 py-2"><StatusBadge variant={statusVariant(r.status)}>{r.status}</StatusBadge></td>
                <td className="px-3 py-2 font-mono">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default InventoryOverview;
