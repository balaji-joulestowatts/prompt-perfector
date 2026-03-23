import { KPICard } from '@/components/shared/KPICard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const histData = [
  { bucket: '0–5%', count: 287, color: '#16A34A' },
  { bucket: '5–10%', count: 655, color: '#16A34A' },
  { bucket: '10–15%', count: 194, color: '#F59E0B' },
  { bucket: '15–20%', count: 98, color: '#DC2626' },
  { bucket: '>20%', count: 50, color: '#DC2626' },
];

const modelPerf = [
  { model: 'Ensemble', mape: 6.8 },
  { model: 'Prophet', mape: 8.2 },
  { model: 'ARIMA', mape: 9.4 },
  { model: 'ETS', mape: 10.1 },
  { model: 'Moving Avg', mape: 15.3 },
];

const monthlyData = [
  { month: 'Jan 2025', forecast: '2,14,800', actual: '2,08,400', error: '6,400', mape: '3.1%' },
  { month: 'Feb 2025', forecast: '1,98,200', actual: '2,04,700', error: '6,500', mape: '3.2%' },
  { month: 'Mar 2025', forecast: '2,31,400', actual: '2,26,900', error: '4,500', mape: '2.0%' },
  { month: 'Apr 2025', forecast: '2,44,600', actual: '2,51,300', error: '6,700', mape: '2.7%' },
  { month: 'May 2025', forecast: '2,58,900', actual: '2,47,200', error: '11,700', mape: '4.7%' },
  { month: 'Jun 2025', forecast: '1,31,200', actual: '1,26,800', error: '4,400', mape: '3.4%' },
];

const anomalies = [
  { date: '18 Jun 2025', sku: 'Cetirizine 10mg', desc: '+67% spike above forecast (early monsoon season)', status: 'ACCEPTED' },
  { date: '14 Jun 2025', sku: 'Vitamin D3 60K', desc: '-29% drop (summer slowdown detected)', status: 'ACCEPTED' },
  { date: '9 Jun 2025', sku: 'Amoxicillin 500mg', desc: '+42% surge (institutional tender fulfilled)', status: 'EXCLUDED FROM MODEL' },
  { date: '2 Jun 2025', sku: 'Metformin 1000mg', desc: '+18% sustained lift (new district hospital tie-up)', status: 'MODEL UPDATED' },
];

const ForecastAccuracy = () => (
  <div className="space-y-6 animate-fade-in">
    <h1 className="text-2xl font-bold">Forecast Model Accuracy & Performance</h1>

    <div className="grid grid-cols-5 gap-4">
      <KPICard label="Overall MAPE" value="8.6%" trend="91.4% accuracy" trendDirection="up" trendColor="success" />
      <KPICard label="MAE" value="342 units" />
      <KPICard label="RMSE" value="487 units" />
      <KPICard label="SKUs with MAPE < 10%" value="73.4%" trend="942 / 1,284" />
      <KPICard label="Last Model Retrain" value="21 Jun" trend="02:30 AM" />
    </div>

    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3 bg-card rounded-lg shadow-card p-5">
        <h3 className="text-[15px] font-semibold mb-4">Accuracy Distribution</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={histData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="count" name="SKUs">
              {histData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="col-span-2 bg-card rounded-lg shadow-card p-5">
        <h3 className="text-[15px] font-semibold mb-4">Model Performance (MAPE %)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={modelPerf} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
            <YAxis dataKey="model" type="category" tick={{ fontSize: 11 }} width={90} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="mape" fill="#0F52A0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <div className="p-4 border-b border-border"><h3 className="text-[15px] font-semibold">Forecast vs Actual — Rolling 6 Months</h3></div>
      <table className="w-full text-table">
        <thead><tr className="bg-table-header">
          {['Month', 'Forecast (units)', 'Actual (units)', 'Error (units)', 'MAPE', 'Result'].map(h => (
            <th key={h} className="px-4 py-2 text-left text-xs font-semibold">{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {monthlyData.map((r, i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-4 py-2">{r.month}</td>
              <td className="px-4 py-2 font-mono">{r.forecast}</td>
              <td className="px-4 py-2 font-mono">{r.actual}</td>
              <td className="px-4 py-2 font-mono">{r.error}</td>
              <td className="px-4 py-2 font-mono">{r.mape}</td>
              <td className="px-4 py-2 text-success">✅ Green</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="bg-card rounded-lg shadow-card p-5 border-l-4 border-warning">
      <h3 className="text-[15px] font-semibold mb-3">Recently Detected Demand Anomalies</h3>
      <div className="space-y-3">
        {anomalies.map((a, i) => (
          <div key={i} className="flex items-start gap-3 text-table">
            <span className="text-muted-foreground text-xs whitespace-nowrap">{a.date}</span>
            <div className="flex-1">
              <span className="font-medium">{a.sku}</span>: {a.desc}
            </div>
            <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded whitespace-nowrap">{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ForecastAccuracy;
