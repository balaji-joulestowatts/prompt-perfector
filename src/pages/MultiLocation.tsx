import { useState } from 'react';

const locations = [
  { name: 'Mumbai WH', type: 'Warehouse', skus: 412, value: '₹78.4 Cr', healthy: 76, low: 8, critical: 3 },
  { name: 'Ahmedabad WH', type: 'Warehouse', skus: 288, value: '₹41.2 Cr', healthy: 79, low: 6, critical: 2 },
  { name: 'Hyderabad WH', type: 'Warehouse', skus: 231, value: '₹29.8 Cr', healthy: 74, low: 9, critical: 2 },
  { name: 'Pune WH', type: 'Warehouse', skus: 188, value: '₹21.4 Cr', healthy: 78, low: 7, critical: 1 },
  { name: 'Baddi Factory', type: 'Factory', skus: 103, value: '₹9.2 Cr', healthy: 86, low: 4, critical: 0 },
  { name: 'Ankleshwar Factory', type: 'Factory', skus: 62, value: '₹4.6 Cr', healthy: 90, low: 2, critical: 0 },
];

const transfers = [
  { id: 'TR-2025-089', sku: 'Amoxicillin 500mg', qty: '1,200', from: 'Ahmedabad WH', to: 'Mumbai WH', status: 'In Transit', by: 'Priya Mehta', eta: 'Today' },
  { id: 'TR-2025-090', sku: 'Cetirizine 10mg', qty: '2,400', from: 'Hyderabad WH', to: 'Mumbai WH', status: 'Pending Approval', by: 'Arjun Sharma', eta: 'Jun 26' },
  { id: 'TR-2025-091', sku: 'Metformin 500mg', qty: '4,800', from: 'Mumbai WH', to: 'Pune WH', status: 'Approved', by: 'Priya Mehta', eta: 'Jun 27' },
];

const MultiLocation = () => {
  const [activeTab, setActiveTab] = useState('All Locations');
  const tabs = ['All Locations', ...locations.map(l => l.name)];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Multi-Location Inventory View</h1>
        <p className="text-sm text-muted-foreground mt-1">Stock distribution across all warehouses and factories</p>
      </div>

      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${activeTab === t ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'All Locations' && (
        <div className="grid grid-cols-3 gap-4">
          {locations.map(l => (
            <div key={l.name} className="bg-card rounded-lg shadow-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{l.name}</h3>
                <span className="text-[10px] font-medium bg-muted px-2 py-0.5 rounded">{l.type}</span>
              </div>
              <div className="flex gap-4 text-sm mb-3">
                <div><span className="text-muted-foreground">SKUs:</span> <span className="font-mono font-semibold">{l.skus}</span></div>
                <div><span className="text-muted-foreground">Value:</span> <span className="font-mono font-semibold">{l.value}</span></div>
              </div>
              <div className="w-full h-2 rounded-full bg-muted flex overflow-hidden mb-2">
                <div className="bg-success h-full" style={{ width: `${l.healthy}%` }} />
                <div className="bg-warning h-full" style={{ width: `${l.low}%` }} />
                <div className="bg-destructive h-full" style={{ width: `${100 - l.healthy - l.low}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{l.healthy}% Healthy</span>
                <span>{l.low}% Low</span>
                {l.critical > 0 && <span className="text-destructive font-semibold">{l.critical} Critical</span>}
              </div>
              <button className="mt-3 text-xs text-primary font-medium hover:underline">View Details</button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-[15px] font-semibold">Inter-Location Transfers</h3>
          <button className="text-xs bg-primary text-primary-foreground px-4 py-1.5 rounded hover:opacity-90">Initiate New Transfer</button>
        </div>
        <table className="w-full text-table">
          <thead>
            <tr className="bg-table-header">
              {['Transfer ID', 'SKU', 'Qty', 'From', 'To', 'Status', 'Requested By', 'ETA'].map(h => (
                <th key={h} className="px-4 py-2 text-left text-xs font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transfers.map(t => (
              <tr key={t.id} className="border-t border-border">
                <td className="px-4 py-2 font-mono text-xs">{t.id}</td>
                <td className="px-4 py-2">{t.sku}</td>
                <td className="px-4 py-2 font-mono">{t.qty}</td>
                <td className="px-4 py-2">{t.from}</td>
                <td className="px-4 py-2">{t.to}</td>
                <td className="px-4 py-2 text-xs font-medium">{t.status}</td>
                <td className="px-4 py-2">{t.by}</td>
                <td className="px-4 py-2">{t.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultiLocation;
