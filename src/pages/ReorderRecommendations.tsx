import { StatusBadge } from '@/components/shared/StatusBadge';
import { toast } from 'sonner';

const recommendations = [
  { priority: 'Critical', sku: 'Azithromycin 250mg', stock: '620 units', days: '11 days', qty: '4,800 units', supplier: 'Cipla API Ltd', cost: '₹124', total: '₹5.95 L', by: 'Today' },
  { priority: 'Critical', sku: 'Amoxicillin 500mg', stock: '2,760 units', days: '22 days', qty: '6,400 units', supplier: 'Aurobindo Pharma', cost: '₹68', total: '₹4.35 L', by: 'Jun 25' },
  { priority: 'Critical', sku: 'Doxycycline 100mg', stock: '560 units', days: '16 days', qty: '3,200 units', supplier: 'Ipca Laboratories', cost: '₹142', total: '₹4.54 L', by: 'Jun 25' },
  { priority: 'Critical', sku: 'B-Complex Injection', stock: '1,000 units', days: '37 days', qty: '2,400 units', supplier: 'Abbott India', cost: '₹215', total: '₹5.16 L', by: 'Jun 27' },
  { priority: 'Critical', sku: 'Cefixime 200mg Cap', stock: '840 units', days: '14 days', qty: '3,600 units', supplier: 'Lupin Limited', cost: '₹187', total: '₹6.73 L', by: 'Jun 24' },
  { priority: 'Critical', sku: 'Clarithromycin 500mg', stock: '420 units', days: '9 days', qty: '2,800 units', supplier: "Dr. Reddy's", cost: '₹312', total: '₹8.74 L', by: 'Today' },
  { priority: 'Critical', sku: 'Levofloxacin 500mg', stock: '680 units', days: '13 days', qty: '3,000 units', supplier: 'Cipla API Ltd', cost: '₹178', total: '₹5.34 L', by: 'Jun 25' },
  { priority: 'Suggested', sku: 'Cetirizine 10mg', stock: '4,500 units', days: '62 days', qty: '7,200 units', supplier: 'Mankind Pharma', cost: '₹24', total: '₹1.73 L', by: 'Jul 10' },
  { priority: 'Suggested', sku: 'Metformin 1000mg', stock: '3,200 units', days: '43 days', qty: '8,400 units', supplier: 'Zydus Lifesciences', cost: '₹38', total: '₹3.19 L', by: 'Jul 5' },
  { priority: 'Suggested', sku: 'Losartan 50mg', stock: '4,980 units', days: '97 days', qty: '4,800 units', supplier: 'Sun Pharma API', cost: '₹52', total: '₹2.50 L', by: 'Jul 15' },
];

const ReorderRecommendations = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold">AI-Driven Reorder Recommendations</h1>
        <p className="text-sm text-muted-foreground mt-1">Based on demand forecast, current stock, and supplier lead times</p>
        <div className="flex gap-4 mt-3 text-sm">
          <span>Total SKUs needing reorder: <strong>38</strong> (Critical: 7 | Suggested: 31)</span>
          <span>Total procurement value: <strong className="font-mono">₹18.4 Cr</strong></span>
        </div>
      </div>
      <button onClick={() => toast.success('7 Purchase Orders submitted for approval')} className="bg-destructive text-destructive-foreground px-4 py-2 rounded text-sm font-medium hover:opacity-90 active:scale-[0.98]">
        Approve All Critical
      </button>
    </div>

    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-table">
          <thead>
            <tr className="bg-table-header text-left">
              {['Priority', 'SKU', 'Current Stock', 'Days Supply', 'Reorder Qty', 'Suggested Supplier', 'Unit Cost', 'Total Value', 'Reorder By', 'Action'].map(h => (
                <th key={h} className="px-3 py-2 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recommendations.map((r, i) => (
              <tr key={i} className="border-t border-border hover:bg-muted/50">
                <td className="px-3 py-2"><StatusBadge variant={r.priority === 'Critical' ? 'critical' : 'warning'}>{r.priority === 'Critical' ? '🔴 Critical' : '🟡 Suggested'}</StatusBadge></td>
                <td className="px-3 py-2 font-medium whitespace-nowrap">{r.sku}</td>
                <td className="px-3 py-2 font-mono">{r.stock}</td>
                <td className="px-3 py-2 font-mono">{r.days}</td>
                <td className="px-3 py-2 font-mono">{r.qty}</td>
                <td className="px-3 py-2">{r.supplier}</td>
                <td className="px-3 py-2 font-mono">{r.cost}</td>
                <td className="px-3 py-2 font-mono">{r.total}</td>
                <td className="px-3 py-2 font-semibold">{r.by}</td>
                <td className="px-3 py-2">
                  <button onClick={() => toast.success(`PO created for ${r.sku}`)} className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:opacity-90">Create PO</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default ReorderRecommendations;
