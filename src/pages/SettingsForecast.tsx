import { useState } from 'react';
import { toast } from 'sonner';

const models = [
  { name: 'Prophet', enabled: true, weight: 35, best: 'Seasonal, holiday-sensitive SKUs' },
  { name: 'ARIMA', enabled: true, weight: 25, best: 'Stable demand, autocorrelated SKUs' },
  { name: 'ETS', enabled: true, weight: 20, best: 'Short-term, high-velocity SKUs' },
  { name: 'XGBoost (MLforecast)', enabled: true, weight: 15, best: 'Complex, multi-variate SKUs' },
  { name: 'Moving Average', enabled: true, weight: 5, best: 'Low-data, new SKUs' },
];

const SettingsForecast = () => {
  const [horizon, setHorizon] = useState('90');
  const [retrain, setRetrain] = useState('Nightly at 2:00 AM IST');
  const [ensemble, setEnsemble] = useState(true);
  const [holidays, setHolidays] = useState(true);
  const [anomalyThreshold, setAnomalyThreshold] = useState('2.5');
  const [weights, setWeights] = useState(models.map(m => m.weight));
  const total = weights.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Forecast Model Configuration</h1>

      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="text-[15px] font-semibold mb-4">Global Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium">Default Forecast Horizon</label>
            <select value={horizon} onChange={e => setHorizon(e.target.value)} className="w-full mt-1 text-sm border border-border rounded px-3 py-2 bg-background">
              {['30', '60', '90', '180', '365'].map(v => <option key={v} value={v}>{v} days</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium">Retraining Frequency</label>
            <select value={retrain} onChange={e => setRetrain(e.target.value)} className="w-full mt-1 text-sm border border-border rounded px-3 py-2 bg-background">
              <option>Nightly at 2:00 AM IST</option><option>Weekly</option><option>Manual</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Ensemble Mode</span>
            <button onClick={() => setEnsemble(!ensemble)} className={`w-10 h-5 rounded-full transition-colors ${ensemble ? 'bg-primary' : 'bg-border'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${ensemble ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Include Holidays in Model</span>
            <button onClick={() => setHolidays(!holidays)} className={`w-10 h-5 rounded-full transition-colors ${holidays ? 'bg-primary' : 'bg-border'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${holidays ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div>
            <label className="text-xs font-medium">Anomaly Detection Threshold (± SD)</label>
            <input type="number" step="0.1" value={anomalyThreshold} onChange={e => setAnomalyThreshold(e.target.value)} className="w-full mt-1 text-sm border border-border rounded px-3 py-2 bg-background" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-[15px] font-semibold">Model Weights {total !== 100 && <span className="text-destructive text-xs ml-2">⚠ Total: {total}% (must be 100%)</span>}</h3>
          <button onClick={() => toast.success('Model configuration saved')} className="text-xs bg-primary text-primary-foreground px-4 py-1.5 rounded hover:opacity-90">Save Config</button>
        </div>
        <table className="w-full text-table">
          <thead><tr className="bg-table-header">{['Model', 'Enabled', 'Weight in Ensemble', 'Best For'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {models.map((m, i) => (
              <tr key={m.name} className="border-t border-border">
                <td className="px-4 py-2 font-medium">{m.name}</td>
                <td className="px-4 py-2">✅</td>
                <td className="px-4 py-2">
                  <input type="number" value={weights[i]} onChange={e => { const w = [...weights]; w[i] = +e.target.value; setWeights(w); }}
                    className="w-16 text-sm border border-border rounded px-2 py-1 font-mono" /> %
                </td>
                <td className="px-4 py-2 text-muted-foreground">{m.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SettingsForecast;
