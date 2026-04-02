sconst integrations = [
  { name: 'SAP ERP (Core)', status: 'Connected', statusColor: 'bg-success', lastSync: '2 min ago', type: 'API' },
  { name: 'Veeva Vault QMS', status: 'Connected', statusColor: 'bg-success', lastSync: '14 min ago', type: 'API' },
  { name: 'LabVantage (LIMS)', status: 'Degraded', statusColor: 'bg-warning', lastSync: '47 min ago', type: 'API' },
  { name: 'WMS — Manhattan Associates', status: 'Connected', statusColor: 'bg-success', lastSync: '5 min ago', type: 'API' },
  { name: 'Barcode Scanning (Zebra)', status: 'Connected', statusColor: 'bg-success', lastSync: 'Real-time', type: 'Device' },
  { name: 'WhatsApp Business API', status: 'Connected', statusColor: 'bg-success', lastSync: 'Live', type: 'API' },
];

const databases = [
  { name: 'PostgreSQL (Primary DB)', host: 'db.pharmaforecast.in:5432', db: 'pf_production', status: 'Connected', extra: 'Pool size: 20' },
  { name: 'Redis (Cache & Queue)', host: 'redis.pharmaforecast.in:6379', db: '', status: 'Connected', extra: 'Memory: 2.1 GB / 8 GB' },
];

const forecastTools = [
  { name: 'Facebook Prophet (Meta)', desc: 'Open-source time series forecasting', status: 'Active' },
  { name: 'statsforecast (Nixtla)', desc: 'AutoARIMA, ETS, Theta — batch optimized', status: 'Active' },
  { name: 'Relex Solutions', desc: 'Retail/pharma planning platform', status: 'Active' },
  { name: 'Blue Yonder (JDA)', desc: 'Enterprise demand planning', status: 'Connect' },
];

const SettingsConnectors = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold">Connectors & Integrations</h1>
      <p className="text-sm text-muted-foreground mt-1">Manage data sources, ERP connections, and forecasting integrations</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {integrations.map(i => (
        <div key={i.name} className="bg-card rounded-lg shadow-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs font-bold">{i.name.slice(0, 2)}</div>
            <div>
              <div className="text-sm font-medium">{i.name}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span className={`w-2 h-2 rounded-full ${i.statusColor}`} />
                {i.status} · {i.lastSync} · {i.type}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-xs border border-border px-3 py-1 rounded hover:bg-muted">Configure</button>
            <button className="text-xs border border-border px-3 py-1 rounded hover:bg-muted">Test</button>
          </div>
        </div>
      ))}
    </div>

    <div>
      <h3 className="text-[15px] font-semibold mb-3">Database Connections</h3>
      <div className="space-y-3">
        {databases.map(d => (
          <div key={d.name} className="bg-card rounded-lg shadow-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground mt-1">Host: {d.host} {d.db && `| Database: ${d.db}`} | Status: 🟢 {d.status} {d.extra && `| ${d.extra}`}</div>
              </div>
              <div className="flex gap-2">
                <button className="text-xs border border-border px-3 py-1 rounded hover:bg-muted">Edit Config</button>
                <button className="text-xs border border-border px-3 py-1 rounded hover:bg-muted">Test Connection</button>
              </div>
            </div>
          </div>
        ))}
        <button className="text-sm text-primary font-medium hover:underline">+ Add Database Connection</button>
      </div>
    </div>

    <div>
      <h3 className="text-[15px] font-semibold mb-3">Demand Forecasting Integrations</h3>
      <div className="grid grid-cols-2 gap-3">
        {forecastTools.map(t => (
          <div key={t.name} className="bg-card rounded-lg shadow-card p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.desc}</div>
            </div>
            {t.status === 'Active' ? (
              <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded font-medium">✅ Active</span>
            ) : (
              <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:opacity-90">Connect</button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default SettingsConnectors;
