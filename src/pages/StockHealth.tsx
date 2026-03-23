const heatmapData = [
  { cat: 'Antibiotics', Mumbai: { count: 42, health: 'green' }, Ahmedabad: { count: 28, health: 'amber' }, Hyderabad: { count: 31, health: 'green' }, Pune: { count: 18, health: 'red' }, Baddi: { count: 14, health: 'green' }, Ankleshwar: { count: 12, health: 'green' } },
  { cat: 'Analgesics', Mumbai: { count: 36, health: 'green' }, Ahmedabad: { count: 24, health: 'green' }, Hyderabad: { count: 27, health: 'green' }, Pune: { count: 19, health: 'green' }, Baddi: { count: 8, health: 'amber' }, Ankleshwar: { count: 9, health: 'green' } },
  { cat: 'Antidiabetics', Mumbai: { count: 29, health: 'green' }, Ahmedabad: { count: 18, health: 'amber' }, Hyderabad: { count: 22, health: 'green' }, Pune: { count: 14, health: 'green' }, Baddi: { count: 6, health: 'green' }, Ankleshwar: { count: 7, health: 'green' } },
  { cat: 'Cardiovascular', Mumbai: { count: 31, health: 'green' }, Ahmedabad: { count: 21, health: 'green' }, Hyderabad: { count: 19, health: 'amber' }, Pune: { count: 16, health: 'green' }, Baddi: { count: 8, health: 'green' }, Ankleshwar: { count: 6, health: 'green' } },
  { cat: 'Vitamins', Mumbai: { count: 48, health: 'amber' }, Ahmedabad: { count: 32, health: 'green' }, Hyderabad: { count: 29, health: 'amber' }, Pune: { count: 22, health: 'green' }, Baddi: { count: 11, health: 'green' }, Ankleshwar: { count: 10, health: 'green' } },
  { cat: 'Respiratory', Mumbai: { count: 22, health: 'green' }, Ahmedabad: { count: 14, health: 'amber' }, Hyderabad: { count: 13, health: 'red' }, Pune: { count: 11, health: 'green' }, Baddi: { count: 7, health: 'green' }, Ankleshwar: { count: 4, health: 'green' } },
  { cat: 'Antihypertensives', Mumbai: { count: 27, health: 'green' }, Ahmedabad: { count: 18, health: 'green' }, Hyderabad: { count: 20, health: 'green' }, Pune: { count: 14, health: 'amber' }, Baddi: { count: 6, health: 'green' }, Ankleshwar: { count: 5, health: 'green' } },
  { cat: 'GI', Mumbai: { count: 19, health: 'green' }, Ahmedabad: { count: 12, health: 'green' }, Hyderabad: { count: 14, health: 'green' }, Pune: { count: 9, health: 'green' }, Baddi: { count: 4, health: 'green' }, Ankleshwar: { count: 4, health: 'green' } },
  { cat: 'Dermatology', Mumbai: { count: 24, health: 'amber' }, Ahmedabad: { count: 16, health: 'green' }, Hyderabad: { count: 18, health: 'green' }, Pune: { count: 12, health: 'green' }, Baddi: { count: 5, health: 'green' }, Ankleshwar: { count: 5, health: 'green' } },
  { cat: 'Neurology', Mumbai: { count: 16, health: 'green' }, Ahmedabad: { count: 10, health: 'green' }, Hyderabad: { count: 12, health: 'green' }, Pune: { count: 8, health: 'green' }, Baddi: { count: 4, health: 'green' }, Ankleshwar: { count: 4, health: 'green' } },
  { cat: 'Others', Mumbai: { count: 18, health: 'green' }, Ahmedabad: { count: 11, health: 'green' }, Hyderabad: { count: 13, health: 'green' }, Pune: { count: 9, health: 'green' }, Baddi: { count: 4, health: 'green' }, Ankleshwar: { count: 4, health: 'green' } },
];

const locations = ['Mumbai', 'Ahmedabad', 'Hyderabad', 'Pune', 'Baddi', 'Ankleshwar'] as const;

const healthColor = (h: string) => {
  if (h === 'red') return 'bg-destructive/20 text-destructive';
  if (h === 'amber') return 'bg-warning/20 text-warning';
  return 'bg-success/10 text-success';
};

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const agingData = [
  { cat: 'Antibiotics', d30: 45, d60: 38, d90: 28, d90plus: 14 },
  { cat: 'Analgesics', d30: 52, d60: 41, d90: 22, d90plus: 8 },
  { cat: 'Antidiabetics', d30: 34, d60: 28, d90: 18, d90plus: 6 },
  { cat: 'Cardiovascular', d30: 38, d60: 32, d90: 20, d90plus: 10 },
  { cat: 'Vitamins', d30: 48, d60: 44, d90: 32, d90plus: 18 },
];

const StockHealth = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold">Stock Health Monitor</h1>
      <p className="text-sm text-muted-foreground mt-1">Heatmap and aging analysis across all SKUs</p>
    </div>

    <div className="flex gap-3">
      {['Product Category', 'Warehouse Location', 'Health Status', 'Days Supply Range'].map(f => (
        <select key={f} className="text-xs border border-border rounded px-3 py-1.5 bg-card">
          <option>{f}</option>
        </select>
      ))}
    </div>

    <div className="bg-card rounded-lg shadow-card p-5">
      <h3 className="text-[15px] font-semibold mb-4">Inventory Health Heatmap</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-table">
          <thead>
            <tr className="bg-table-header">
              <th className="px-3 py-2 text-left text-xs font-semibold">Category</th>
              {locations.map(l => <th key={l} className="px-3 py-2 text-center text-xs font-semibold">{l}</th>)}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row) => (
              <tr key={row.cat} className="border-t border-border">
                <td className="px-3 py-2 font-medium">{row.cat}</td>
                {locations.map(loc => {
                  const cell = row[loc];
                  return (
                    <td key={loc} className="px-3 py-2 text-center">
                      <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${healthColor(cell.health)}`}>
                        {cell.count}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-card rounded-lg shadow-card p-5">
      <h3 className="text-[15px] font-semibold mb-4">Stock Aging Analysis</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={agingData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="cat" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Legend />
          <Bar dataKey="d30" name="0–30 days" stackId="a" fill="#0F52A0" />
          <Bar dataKey="d60" name="31–60 days" stackId="a" fill="#00A896" />
          <Bar dataKey="d90" name="61–90 days" stackId="a" fill="#F59E0B" />
          <Bar dataKey="d90plus" name=">90 days" stackId="a" fill="#DC2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default StockHealth;
