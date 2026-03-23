import { StatusBadge } from '@/components/shared/StatusBadge';

const suppliers = [
  { name: 'Cipla API Ltd', focus: 'Antibiotics, Antidiabetics', pos: 4, otd: '94.2%', rejection: '1.8%', price: 'Stable', wacr: 87, tier: 'Gold', status: 'Active' },
  { name: 'Sun Pharma API', focus: 'Cardiovascular, Respiratory', pos: 3, otd: '91.7%', rejection: '2.4%', price: 'Stable', wacr: 83, tier: 'Gold', status: 'Active' },
  { name: "Divi's Laboratories", focus: 'APIs — Multiple', pos: 2, otd: '97.1%', rejection: '0.9%', price: 'Rising +8%', wacr: 91, tier: 'Platinum', status: 'Active' },
  { name: 'Aurobindo Pharma', focus: 'Antibiotics', pos: 5, otd: '88.4%', rejection: '3.1%', price: 'Stable', wacr: 78, tier: 'Silver', status: 'Active' },
  { name: 'Ipca Laboratories', focus: 'Analgesics, Antimalaria', pos: 3, otd: '92.8%', rejection: '1.6%', price: 'Declining -4%', wacr: 84, tier: 'Gold', status: 'Active' },
  { name: 'Lupin Limited', focus: 'Antidiabetics, CVD', pos: 4, otd: '89.2%', rejection: '2.8%', price: 'Stable', wacr: 79, tier: 'Silver', status: 'Active' },
  { name: "Dr. Reddy's Laboratories", focus: 'GI, Neuro', pos: 2, otd: '95.6%', rejection: '1.2%', price: 'Stable', wacr: 89, tier: 'Gold', status: 'Active' },
  { name: 'Cadila Healthcare', focus: 'Vitamins, Hormones', pos: 6, otd: '86.7%', rejection: '4.2%', price: 'Rising +12%', wacr: 72, tier: 'Silver', status: 'Review' },
  { name: 'Alkem Laboratories', focus: 'Antibiotics', pos: 3, otd: '81.3%', rejection: '5.1%', price: 'Stable', wacr: 64, tier: 'Bronze', status: 'Concern' },
  { name: 'Torrent Pharmaceuticals', focus: 'CVD, Antihypertensives', pos: 2, otd: '79.8%', rejection: '4.8%', price: 'Stable', wacr: 61, tier: 'Bronze', status: 'Concern' },
  { name: 'Zydus Lifesciences', focus: 'Antidiabetics, Vitamins', pos: 4, otd: '93.4%', rejection: '1.9%', price: 'Stable', wacr: 86, tier: 'Gold', status: 'Active' },
  { name: 'Glenmark Pharmaceuticals', focus: 'Respiratory, Antifungal', pos: 3, otd: '90.1%', rejection: '2.6%', price: 'Declining -6%', wacr: 81, tier: 'Silver', status: 'Active' },
  { name: 'Abbott India', focus: 'Vitamins, OTC', pos: 2, otd: '96.3%', rejection: '0.7%', price: 'Rising +5%', wacr: 92, tier: 'Platinum', status: 'Active' },
  { name: 'Mankind Pharma', focus: 'Analgesics, Antacids', pos: 3, otd: '88.9%', rejection: '3.4%', price: 'Stable', wacr: 77, tier: 'Silver', status: 'Active' },
  { name: 'IPCA International', focus: 'Antibiotics (Export)', pos: 1, otd: '94.7%', rejection: '1.4%', price: 'Stable', wacr: 88, tier: 'Gold', status: 'Active' },
];

const tierColor = (tier: string) => {
  if (tier === 'Platinum') return 'bg-chart-4/10 text-chart-4';
  if (tier === 'Gold') return 'bg-warning/10 text-warning';
  if (tier === 'Silver') return 'bg-muted text-muted-foreground';
  return 'bg-orange-100 text-orange-700';
};

const statusVariant = (s: string) => {
  if (s === 'Concern') return 'critical' as const;
  if (s === 'Review') return 'warning' as const;
  return 'ok' as const;
};

const SupplierManagement = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold">Supplier Management</h1>
      <p className="text-sm text-muted-foreground mt-1">Performance scoring and compliance tracking</p>
    </div>

    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-table">
          <thead>
            <tr className="bg-table-header text-left">
              {['Supplier', 'Category Focus', 'Active POs', 'OTD Rate', 'Quality Rejection', 'Price Stability', 'WACR Score', 'Tier', 'Status'].map(h => (
                <th key={h} className="px-3 py-2 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s.name} className="border-t border-border hover:bg-muted/50">
                <td className="px-3 py-2 font-medium whitespace-nowrap">{s.name}</td>
                <td className="px-3 py-2 text-muted-foreground">{s.focus}</td>
                <td className="px-3 py-2 font-mono">{s.pos}</td>
                <td className="px-3 py-2 font-mono">{s.otd}</td>
                <td className="px-3 py-2 font-mono">{s.rejection}</td>
                <td className="px-3 py-2">{s.price}</td>
                <td className="px-3 py-2 font-mono font-semibold">{s.wacr}/100</td>
                <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${tierColor(s.tier)}`}>{s.tier}</span></td>
                <td className="px-3 py-2"><StatusBadge variant={statusVariant(s.status)}>{s.status === 'Active' ? '✅ Active' : s.status === 'Review' ? '⚠️ Review' : '🔴 Concern'}</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default SupplierManagement;
