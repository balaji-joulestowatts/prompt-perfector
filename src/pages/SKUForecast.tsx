import { useState } from 'react';
import { StatusBadge } from '@/components/shared/StatusBadge';

const skus = [
  { code: 'PFC-001', name: 'Amoxicillin 500mg Cap', cat: 'Antibiotics', b30: '4,200', b90: '12,800', bull: '15,616', bear: '10,368', model: 'Ensemble', mape: 94.2, conf: 'High' },
  { code: 'PFC-002', name: 'Metformin 500mg Tab', cat: 'Antidiabetics', b30: '6,100', b90: '18,400', bull: '22,448', bear: '14,904', model: 'Prophet', mape: 92.8, conf: 'High' },
  { code: 'PFC-003', name: 'Atorvastatin 40mg Tab', cat: 'Cardiovascular', b30: '2,800', b90: '8,600', bull: '10,492', bear: '6,966', model: 'ARIMA', mape: 91.4, conf: 'High' },
  { code: 'PFC-004', name: 'Paracetamol 650mg Tab', cat: 'Analgesics', b30: '9,400', b90: '28,200', bull: '34,404', bear: '22,842', model: 'Ensemble', mape: 95.1, conf: 'High' },
  { code: 'PFC-005', name: 'Azithromycin 250mg Tab', cat: 'Antibiotics', b30: '1,900', b90: '5,700', bull: '6,954', bear: '4,617', model: 'Prophet', mape: 89.7, conf: 'Med' },
  { code: 'PFC-006', name: 'Omeprazole 20mg Cap', cat: 'Gastrointestinal', b30: '3,200', b90: '9,600', bull: '11,712', bear: '7,776', model: 'ETS', mape: 93.6, conf: 'High' },
  { code: 'PFC-007', name: 'Cetirizine 10mg Tab', cat: 'Respiratory', b30: '2,400', b90: '7,200', bull: '8,784', bear: '5,832', model: 'ARIMA', mape: 90.2, conf: 'High' },
  { code: 'PFC-008', name: 'Losartan 50mg Tab', cat: 'Antihypertensives', b30: '1,700', b90: '5,100', bull: '6,222', bear: '4,131', model: 'Ensemble', mape: 92.4, conf: 'High' },
  { code: 'PFC-009', name: 'Vitamin D3 60K IU Cap', cat: 'Vitamins', b30: '5,800', b90: '17,400', bull: '21,228', bear: '14,094', model: 'Prophet', mape: 87.3, conf: 'Med' },
  { code: 'PFC-010', name: 'Pantoprazole 40mg Tab', cat: 'Gastrointestinal', b30: '2,100', b90: '6,300', bull: '7,686', bear: '5,103', model: 'ETS', mape: 94.8, conf: 'High' },
  { code: 'PFC-011', name: 'Metoprolol 50mg Tab', cat: 'Cardiovascular', b30: '1,400', b90: '4,200', bull: '5,124', bear: '3,402', model: 'ARIMA', mape: 91.9, conf: 'High' },
  { code: 'PFC-012', name: 'Ibuprofen 400mg Tab', cat: 'Analgesics', b30: '4,700', b90: '14,100', bull: '17,202', bear: '11,421', model: 'Ensemble', mape: 93.4, conf: 'High' },
  { code: 'PFC-013', name: 'Doxycycline 100mg Cap', cat: 'Antibiotics', b30: '1,200', b90: '3,600', bull: '4,392', bear: '2,916', model: 'Prophet', mape: 88.6, conf: 'Med' },
  { code: 'PFC-014', name: 'Glimepiride 2mg Tab', cat: 'Antidiabetics', b30: '900', b90: '2,700', bull: '3,294', bear: '2,187', model: 'ARIMA', mape: 86.2, conf: 'Med' },
  { code: 'PFC-015', name: 'Amlodipine 5mg Tab', cat: 'Cardiovascular', b30: '1,600', b90: '4,800', bull: '5,856', bear: '3,888', model: 'ETS', mape: 90.7, conf: 'High' },
  { code: 'PFC-016', name: 'Montelukast 10mg Tab', cat: 'Respiratory', b30: '1,100', b90: '3,300', bull: '4,026', bear: '2,673', model: 'Prophet', mape: 89.1, conf: 'Med' },
  { code: 'PFC-017', name: 'B-Complex Injection', cat: 'Vitamins', b30: '800', b90: '2,400', bull: '2,928', bear: '1,944', model: 'Moving Avg', mape: 82.4, conf: 'Low' },
  { code: 'PFC-018', name: 'Clopidogrel 75mg Tab', cat: 'Cardiovascular', b30: '700', b90: '2,100', bull: '2,562', bear: '1,701', model: 'ARIMA', mape: 91.3, conf: 'High' },
  { code: 'PFC-019', name: 'Chlorpheniramine 4mg', cat: 'Respiratory', b30: '600', b90: '1,800', bull: '2,196', bear: '1,458', model: 'Moving Avg', mape: 84.7, conf: 'Med' },
  { code: 'PFC-020', name: 'Fluconazole 150mg Cap', cat: 'Antifungal', b30: '500', b90: '1,500', bull: '1,830', bear: '1,215', model: 'Prophet', mape: 87.9, conf: 'Med' },
];

const getMapeVariant = (mape: number) => {
  if (mape >= 92) return 'ok';
  if (mape >= 85) return 'warning';
  return 'critical';
};

const SKUForecast = () => {
  const [drawerSku, setDrawerSku] = useState<typeof skus[0] | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">SKU-Level Demand Forecast</h1>
        <div className="flex gap-3 mt-3">
          <input placeholder="Search SKU name/code..." className="text-xs border border-border rounded px-3 py-1.5 bg-card w-64" />
          {['Category', 'Location', 'Model Type', 'Accuracy Range'].map(f => (
            <select key={f} className="text-xs border border-border rounded px-3 py-1.5 bg-card">
              <option>{f}</option>
            </select>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-table">
            <thead>
              <tr className="bg-table-header text-left">
                {['SKU Code', 'SKU Name', 'Category', 'Base (30d)', 'Base (90d)', 'Bull (90d)', 'Bear (90d)', 'Model', 'MAPE', 'Confidence', 'Action'].map(h => (
                  <th key={h} className="px-3 py-3 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skus.map((s) => (
                <tr key={s.code} className="border-t border-border hover:bg-muted/50">
                  <td className="px-3 py-2 font-mono text-xs">{s.code}</td>
                  <td className="px-3 py-2 font-medium whitespace-nowrap">{s.name}</td>
                  <td className="px-3 py-2">{s.cat}</td>
                  <td className="px-3 py-2 font-mono">{s.b30}</td>
                  <td className="px-3 py-2 font-mono">{s.b90}</td>
                  <td className="px-3 py-2 font-mono">{s.bull}</td>
                  <td className="px-3 py-2 font-mono">{s.bear}</td>
                  <td className="px-3 py-2 text-xs">{s.model}</td>
                  <td className="px-3 py-2"><StatusBadge variant={getMapeVariant(s.mape)}>{s.mape}%</StatusBadge></td>
                  <td className="px-3 py-2 text-xs">{s.conf}</td>
                  <td className="px-3 py-2">
                    <button onClick={() => setDrawerSku(s)} className="text-primary text-xs font-medium hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {drawerSku && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setDrawerSku(null)} />
          <div className="relative w-[520px] bg-card h-full shadow-xl animate-slide-in-right overflow-y-auto p-6">
            <button onClick={() => setDrawerSku(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-lg">✕</button>
            <h2 className="text-lg font-bold">{drawerSku.name}</h2>
            <p className="text-sm text-muted-foreground">{drawerSku.code} · {drawerSku.cat}</p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-muted/50 rounded p-3">
                <div className="text-xs text-muted-foreground">Current Stock</div>
                <div className="font-mono font-bold text-lg">3,240</div>
              </div>
              <div className="bg-muted/50 rounded p-3">
                <div className="text-xs text-muted-foreground">Days of Supply (Base)</div>
                <div className="font-mono font-bold text-lg">41 days</div>
              </div>
              <div className="bg-muted/50 rounded p-3">
                <div className="text-xs text-muted-foreground">Reorder Point</div>
                <div className="font-mono font-bold text-lg">2,000</div>
              </div>
              <div className="bg-muted/50 rounded p-3">
                <div className="text-xs text-muted-foreground">Safety Stock</div>
                <div className="font-mono font-bold text-lg">800</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded">
              <div className="text-sm font-semibold">Recommended Reorder</div>
              <div className="font-mono text-lg font-bold mt-1">2,800 units by 5 Jul 2025</div>
              <div className="text-xs text-muted-foreground">Lead Time: 14 days</div>
            </div>

            <button className="mt-4 w-full bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:opacity-90 active:scale-[0.98]">
              Create Purchase Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SKUForecast;
