import { useState } from 'react';

const alerts = [
  { severity: 'critical', icon: '🔴', title: 'CRITICAL — Stockout Imminent', desc: 'Clarithromycin 500mg Tab — Current stock: 420 units | Days supply: 9 days | No open PO found.', time: 'Jun 23, 2025 — 08:14 AM', cat: 'Critical' },
  { severity: 'critical', icon: '🔴', title: 'CRITICAL — Batch Expiry in 2 Days', desc: 'Batch B2311-FLU (Fluconazole 150mg) — 600 units | Value: ₹1.5 L | Located: Mumbai WH', time: 'Jun 22, 2025 — 06:00 AM', cat: 'Expiry Risk' },
  { severity: 'warning', icon: '🟡', title: 'WARNING — Purchase Order Overdue', desc: 'PO-2025-181 from Alkem Laboratories — Overdue by 6 days | Value: ₹19.4 L', time: 'Jun 23, 2025 — 07:30 AM', cat: 'PO Overdue' },
  { severity: 'warning', icon: '🟡', title: 'WARNING — Demand Spike Detected', desc: 'Cetirizine 10mg Tab — 67% surge above forecast (Week 24). Possible early monsoon trigger.', time: 'Jun 21, 2025 — 11:45 PM', cat: 'Forecast Anomaly' },
  { severity: 'info', icon: '🔵', title: 'INFO — Forecast Model Retrained', desc: 'Nightly forecast retrain completed. 1,284 SKUs updated. Overall MAPE improved to 8.6%.', time: 'Jun 21, 2025 — 02:31 AM', cat: 'System' },
  { severity: 'warning', icon: '🟡', title: 'WARNING — Overstock Risk', desc: 'Paracetamol 650mg Tab — 208 days supply at Mumbai WH. ₹9.7 L tied up. Consider inter-location transfer.', time: 'Jun 20, 2025 — 09:00 AM', cat: 'Stockout Risk' },
];

const tabs = ['All (47)', 'Critical (7)', 'Stockout Risk (12)', 'Expiry Risk (9)', 'Forecast Anomaly (8)', 'PO Overdue (4)', 'System (7)'];

const AlertCenter = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [dismissed, setDismissed] = useState<number[]>([]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Alert Center</h1>
        <p className="text-sm text-muted-foreground mt-1">All active notifications and system alerts</p>
      </div>
      <div className="flex gap-1 bg-muted rounded-lg p-1 flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${activeTab === t ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground'}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-3">
        {alerts.filter((_, i) => !dismissed.includes(i)).map((a, i) => (
          <div key={i} className={`bg-card rounded-lg shadow-card p-4 border-l-4 ${a.severity === 'critical' ? 'border-destructive' : a.severity === 'warning' ? 'border-warning' : 'border-primary'}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-sm">{a.icon} {a.title}</div>
                <p className="text-table text-muted-foreground mt-1">{a.desc}</p>
                <p className="text-xs text-muted-foreground mt-2">{a.time}</p>
              </div>
              <button onClick={() => setDismissed([...dismissed, i])} className="text-muted-foreground hover:text-foreground text-sm">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AlertCenter;
