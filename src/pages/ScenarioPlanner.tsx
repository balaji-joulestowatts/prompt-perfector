import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line,
} from 'recharts';

const categories = ['Antibiotics', 'Analgesics', 'Antidiabetics', 'Cardiovascular', 'Antihypert.', 'Vitamins', 'Respiratory', 'GI', 'Dermatology', 'Neurology', 'Others'];
const barData = categories.map((c, i) => ({
  category: c,
  bull: [58804, 87108, 48312, 38064, 34038, 64294, 22448, 18056, 11224, 10248, 9272][i],
  base: [48200, 71400, 39600, 31200, 27900, 52700, 18400, 14800, 9200, 8400, 7600][i],
  bear: [39042, 57834, 32076, 25272, 22599, 42687, 14904, 11988, 7452, 6804, 6156][i],
}));

const weeklyLine = Array.from({ length: 26 }, (_, i) => ({
  week: `W${i + 1}`,
  bull: Math.round((5.4 + Math.sin(i / 4) * 1.5 + i * 0.12) * 1.22 * 1000) / 1000,
  base: Math.round((5.4 + Math.sin(i / 4) * 1.5 + i * 0.12) * 1000) / 1000,
  bear: Math.round((5.4 + Math.sin(i / 4) * 1.5 + i * 0.12) * 0.81 * 1000) / 1000,
}));

const inflections = [
  { scenario: 'Bull', assumption: 'Monsoon flu season (Sep–Oct)', impact: '+38% Respiratory demand' },
  { scenario: 'Bull', assumption: 'Govt tender awarded (Antidiabetics)', impact: '+22% Metformin demand' },
  { scenario: 'Base', assumption: 'Steady OTC growth', impact: '+8% Analgesics YoY' },
  { scenario: 'Bear', assumption: 'API supply disruption (China)', impact: '-18% Antibiotics supply' },
  { scenario: 'Bear', assumption: 'Competitor generic entry', impact: '-12% Atorvastatin demand' },
];

const ScenarioPlanner = () => {
  const [seasonFactor, setSeasonFactor] = useState(1.0);
  const [economicGrowth, setEconomicGrowth] = useState('Stable +3%');
  const [apiTrend, setApiTrend] = useState('Stable');
  const [competitorEntry, setCompetitorEntry] = useState(false);
  const [exportDemand, setExportDemand] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Demand Scenario Planner</h1>
        <p className="text-sm text-muted-foreground mt-1">Adjust assumptions to explore Bull, Base, and Bear demand outcomes</p>
      </div>

      <div className="flex gap-6">
        {/* Left Panel */}
        <div className="w-[320px] shrink-0 bg-card rounded-lg shadow-card p-5 sticky top-0 self-start">
          <h3 className="text-sm font-semibold mb-4">Model Assumptions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <label className="text-xs text-muted-foreground">Season / Epidemic Factor: {seasonFactor.toFixed(1)}×</label>
              <input type="range" min="0.5" max="2.0" step="0.1" value={seasonFactor} onChange={e => setSeasonFactor(+e.target.value)}
                className="w-full mt-1 accent-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Economic Growth Rate</label>
              <select value={economicGrowth} onChange={e => setEconomicGrowth(e.target.value)} className="w-full mt-1 text-xs border border-border rounded px-2 py-1.5 bg-background">
                <option>Recessionary -2%</option><option>Stable +3%</option><option>High Growth +8%</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">API Price Trend</label>
              <select value={apiTrend} onChange={e => setApiTrend(e.target.value)} className="w-full mt-1 text-xs border border-border rounded px-2 py-1.5 bg-background">
                <option>Declining</option><option>Stable</option><option>Rising +15%</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Competitor Entry</span>
              <button onClick={() => setCompetitorEntry(!competitorEntry)} className={`w-10 h-5 rounded-full transition-colors ${competitorEntry ? 'bg-primary' : 'bg-border'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${competitorEntry ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Export Demand Included</span>
              <button onClick={() => setExportDemand(!exportDemand)} className={`w-10 h-5 rounded-full transition-colors ${exportDemand ? 'bg-primary' : 'bg-border'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${exportDemand ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <button className="text-xs font-medium py-2 rounded bg-success text-success-foreground hover:opacity-90">Apply Bull Assumptions</button>
            <button className="text-xs font-medium py-2 rounded bg-primary text-primary-foreground hover:opacity-90">Apply Base Assumptions</button>
            <button className="text-xs font-medium py-2 rounded bg-destructive text-destructive-foreground hover:opacity-90">Apply Bear Assumptions</button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '🐂 Bull Case', bg: 'bg-[#F0FDF4]', border: 'border-success/20', demand: '4.02 L units', revenue: '₹48.3 Cr', inventory: '₹31.2 Cr', spend: '₹18.7 Cr', stockout: 12, overstock: 214, conf: '72%' },
              { label: '📊 Base Case', bg: 'bg-[#EFF6FF]', border: 'border-primary/20', demand: '3.29 L units', revenue: '₹39.5 Cr', inventory: '₹25.6 Cr', spend: '₹15.3 Cr', stockout: 38, overstock: 127, conf: '91%' },
              { label: '🐻 Bear Case', bg: 'bg-[#FEF2F2]', border: 'border-destructive/20', demand: '1.87 L units', revenue: '₹22.4 Cr', inventory: '₹14.6 Cr', spend: '₹8.7 Cr', stockout: 3, overstock: 342, conf: '68%' },
            ].map(s => (
              <div key={s.label} className={`rounded-lg border p-4 ${s.bg} ${s.border}`}>
                <div className="font-semibold text-sm mb-2">{s.label}</div>
                <div className="font-mono text-xl font-bold">{s.demand}</div>
                <div className="text-xs text-muted-foreground mt-1">Total 90-Day Demand</div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div>Revenue: <span className="font-mono font-semibold">{s.revenue}</span></div>
                  <div>Inventory: <span className="font-mono font-semibold">{s.inventory}</span></div>
                  <div>Procurement: <span className="font-mono font-semibold">{s.spend}</span></div>
                  <div>Confidence: <span className="font-mono font-semibold">{s.conf}</span></div>
                  <div>Stockout Risk: <span className="font-mono font-semibold">{s.stockout}</span></div>
                  <div>Overstock Risk: <span className="font-mono font-semibold">{s.overstock}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="bg-card rounded-lg shadow-card p-5">
            <h3 className="text-[15px] font-semibold mb-4">90-Day Demand by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend />
                <Bar dataKey="bull" name="Bull" fill="#16A34A" />
                <Bar dataKey="base" name="Base" fill="#0F52A0" />
                <Bar dataKey="bear" name="Bear" fill="#DC2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Inflection points */}
          <div className="bg-card rounded-lg shadow-card overflow-hidden">
            <div className="p-4 border-b border-border"><h3 className="text-[15px] font-semibold">Key Inflection Points</h3></div>
            <table className="w-full text-table">
              <thead><tr className="bg-table-header"><th className="px-4 py-2 text-left text-xs font-semibold">Scenario</th><th className="px-4 py-2 text-left text-xs font-semibold">Key Assumption</th><th className="px-4 py-2 text-left text-xs font-semibold">Impact</th></tr></thead>
              <tbody>
                {inflections.map((r, i) => (
                  <tr key={i} className="border-t border-border"><td className="px-4 py-2">{r.scenario}</td><td className="px-4 py-2">{r.assumption}</td><td className="px-4 py-2 font-medium">{r.impact}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Line chart */}
          <div className="bg-card rounded-lg shadow-card p-5">
            <h3 className="text-[15px] font-semibold mb-4">Scenario Comparison — 26 Weeks</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={weeklyLine}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} unit="K" />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend />
                <Line type="monotone" dataKey="bull" name="Bull" stroke="#16A34A" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="base" name="Base" stroke="#0F52A0" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="bear" name="Bear" stroke="#DC2626" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPlanner;
