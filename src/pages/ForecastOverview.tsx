import { KPICard } from '@/components/shared/KPICard';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const weeklyData = [
  { week: 'W1', base: 5.4, bull: 6.6, bear: 4.4 },
  { week: 'W2', base: 5.5, bull: 6.7, bear: 4.5 },
  { week: 'W3', base: 5.6, bull: 6.8, bear: 4.5 },
  { week: 'W4', base: 5.8, bull: 7.1, bear: 4.7 },
  { week: 'W5', base: 6.1, bull: 7.4, bear: 4.9 },
  { week: 'W6', base: 6.3, bull: 7.7, bear: 5.1 },
  { week: 'W7', base: 6.2, bull: 7.6, bear: 5.0 },
  { week: 'W8', base: 5.9, bull: 7.2, bear: 4.8 },
  { week: 'W9', base: 5.7, bull: 7.0, bear: 4.6 },
  { week: 'W10', base: 5.8, bull: 7.1, bear: 4.7 },
  { week: 'W11', base: 6.0, bull: 7.3, bear: 4.9 },
  { week: 'W12', base: 6.2, bull: 7.6, bear: 5.0 },
  { week: 'W13', base: 6.4, bull: 7.8, bear: 5.2 },
];

const categories = [
  { category: 'Antibiotics', skus: 187, base: '48,200', bull: '58,804', bear: '39,042', accuracy: '93.2%', trend: '↑' },
  { category: 'Analgesics', skus: 143, base: '71,400', bull: '87,108', bear: '57,834', accuracy: '94.7%', trend: '→' },
  { category: 'Antidiabetics', skus: 96, base: '39,600', bull: '48,312', bear: '32,076', accuracy: '89.4%', trend: '↑' },
  { category: 'Cardiovascular', skus: 124, base: '31,200', bull: '38,064', bear: '25,272', accuracy: '91.8%', trend: '→' },
  { category: 'Antihypertensives', skus: 108, base: '27,900', bull: '34,038', bear: '22,599', accuracy: '92.1%', trend: '↑' },
  { category: 'Vitamins & Supplements', skus: 214, base: '52,700', bull: '64,294', bear: '42,687', accuracy: '88.6%', trend: '↓' },
  { category: 'Respiratory', skus: 89, base: '18,400', bull: '22,448', bear: '14,904', accuracy: '90.3%', trend: '↑' },
  { category: 'Gastrointestinal', skus: 76, base: '14,800', bull: '18,056', bear: '11,988', accuracy: '93.8%', trend: '→' },
  { category: 'Dermatology', skus: 112, base: '9,200', bull: '11,224', bear: '7,452', accuracy: '87.9%', trend: '↓' },
  { category: 'Neurology', skus: 67, base: '8,400', bull: '10,248', bear: '6,804', accuracy: '91.2%', trend: '→' },
  { category: 'Others', skus: 68, base: '7,600', bull: '9,272', bear: '6,156', accuracy: '86.4%', trend: '→' },
];

const ForecastOverview = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold">Demand Forecast Overview</h1>
      <div className="flex gap-3 mt-3">
        {['Product Category', 'Manufacturing Location', 'Time Horizon', 'Forecast Model'].map(f => (
          <select key={f} className="text-xs border border-border rounded px-3 py-1.5 bg-card">
            <option>{f}</option>
          </select>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-4 gap-4">
      <KPICard label="SKUs with Active Forecasts" value="1,284" />
      <KPICard label="Avg. Forecast Accuracy (MAPE)" value="91.4%" />
      <KPICard label="High Confidence Forecasts (>90%)" value="847" />
      <KPICard label="SKUs Needing Forecast Review" value="43" />
    </div>

    <div className="bg-card rounded-lg shadow-card p-5">
      <h3 className="text-[15px] font-semibold mb-4">Aggregate Demand Forecast — Next 90 Days</h3>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="week" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} unit="K" />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Legend />
          <Area type="monotone" dataKey="bull" name="Bull Case" fill="#16A34A" fillOpacity={0.15} stroke="#16A34A" strokeDasharray="5 5" />
          <Area type="monotone" dataKey="base" name="Base Case" fill="#0F52A0" fillOpacity={0.25} stroke="#0F52A0" strokeWidth={2} />
          <Area type="monotone" dataKey="bear" name="Bear Case" fill="#DC2626" fillOpacity={0.15} stroke="#DC2626" strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <table className="w-full text-table">
        <thead>
          <tr className="bg-table-header text-left">
            {['Category', 'Active SKUs', 'Base Case (90d)', 'Bull Case', 'Bear Case', 'Avg Accuracy', 'Trend'].map(h => (
              <th key={h} className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={i} className="border-t border-border hover:bg-muted/50 cursor-pointer">
              <td className="px-4 py-2.5 font-medium">{c.category}</td>
              <td className="px-4 py-2.5 font-mono">{c.skus}</td>
              <td className="px-4 py-2.5 font-mono">{c.base}</td>
              <td className="px-4 py-2.5 font-mono">{c.bull}</td>
              <td className="px-4 py-2.5 font-mono">{c.bear}</td>
              <td className="px-4 py-2.5 font-mono">{c.accuracy}</td>
              <td className="px-4 py-2.5">{c.trend}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-foreground/20 font-bold">
            <td className="px-4 py-2.5">TOTAL</td>
            <td className="px-4 py-2.5 font-mono">1,284</td>
            <td className="px-4 py-2.5 font-mono">329,400</td>
            <td className="px-4 py-2.5 font-mono">401,868</td>
            <td className="px-4 py-2.5 font-mono">266,814</td>
            <td className="px-4 py-2.5 font-mono">91.4%</td>
            <td className="px-4 py-2.5"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default ForecastOverview;
