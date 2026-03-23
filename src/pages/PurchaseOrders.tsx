import { useState } from 'react';
import { KPICard } from '@/components/shared/KPICard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { toast } from 'sonner';

const pos = [
  { po: 'PO-2025-187', supplier: 'Cipla API Ltd', skus: 4, qty: '28,400', value: '₹32.1 L', orderDate: '10 Jun 2025', delivery: '25 Jun 2025', status: 'In Transit', action: 'Track' },
  { po: 'PO-2025-188', supplier: 'Sun Pharma API', skus: 3, qty: '19,200', value: '₹21.4 L', orderDate: '12 Jun 2025', delivery: '26 Jun 2025', status: 'In Transit', action: 'Track' },
  { po: 'PO-2025-189', supplier: "Divi's Laboratories", skus: 2, qty: '8,600', value: '₹14.8 L', orderDate: '14 Jun 2025', delivery: '28 Jun 2025', status: 'In Transit', action: 'Track' },
  { po: 'PO-2025-190', supplier: 'Aurobindo Pharma', skus: 5, qty: '42,000', value: '₹38.6 L', orderDate: '16 Jun 2025', delivery: '30 Jun 2025', status: 'Approved', action: 'Track' },
  { po: 'PO-2025-191', supplier: 'Ipca Laboratories', skus: 3, qty: '15,800', value: '₹18.9 L', orderDate: '17 Jun 2025', delivery: '2 Jul 2025', status: 'Approved', action: 'Track' },
  { po: 'PO-2025-192', supplier: 'Lupin Limited', skus: 4, qty: '24,200', value: '₹29.3 L', orderDate: '18 Jun 2025', delivery: '3 Jul 2025', status: 'Pending Approval', action: 'Approve' },
  { po: 'PO-2025-193', supplier: "Dr. Reddy's Laboratories", skus: 2, qty: '11,400', value: '₹16.7 L', orderDate: '18 Jun 2025', delivery: '4 Jul 2025', status: 'Pending Approval', action: 'Approve' },
  { po: 'PO-2025-194', supplier: 'Cadila Healthcare', skus: 6, qty: '38,400', value: '₹47.2 L', orderDate: '19 Jun 2025', delivery: '5 Jul 2025', status: 'Pending Approval', action: 'Approve' },
  { po: 'PO-2025-181', supplier: 'Alkem Laboratories', skus: 3, qty: '16,800', value: '₹19.4 L', orderDate: '2 Jun 2025', delivery: '17 Jun 2025', status: 'Overdue (+6d)', action: 'Follow Up' },
  { po: 'PO-2025-182', supplier: 'Torrent Pharmaceuticals', skus: 2, qty: '9,200', value: '₹11.8 L', orderDate: '4 Jun 2025', delivery: '18 Jun 2025', status: 'Overdue (+5d)', action: 'Follow Up' },
  { po: 'PO-2025-175', supplier: 'Zydus Lifesciences', skus: 4, qty: '21,600', value: '₹24.8 L', orderDate: '25 May 2025', delivery: '9 Jun 2025', status: 'Received', action: 'GRN View' },
  { po: 'PO-2025-176', supplier: 'Glenmark Pharmaceuticals', skus: 3, qty: '14,400', value: '₹17.1 L', orderDate: '26 May 2025', delivery: '10 Jun 2025', status: 'Received', action: 'GRN View' },
];

const getStatusVariant = (s: string) => {
  if (s.includes('Overdue')) return 'critical' as const;
  if (s === 'In Transit') return 'warning' as const;
  if (s === 'Approved') return 'ok' as const;
  if (s === 'Pending Approval') return 'pending' as const;
  return 'info' as const;
};

const PurchaseOrders = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Purchase Order Management</h1>

      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Active POs" value="34" />
        <KPICard label="POs Awaiting Approval" value="3" />
        <KPICard label="Total Committed Spend" value="₹43.7 Cr" />
        <KPICard label="Overdue POs" value="2" trend="Follow up needed" trendDirection="up" trendColor="destructive" />
      </div>

      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-[15px] font-semibold">Purchase Orders</h3>
          <button onClick={() => setShowModal(true)} className="text-xs bg-primary text-primary-foreground px-4 py-1.5 rounded hover:opacity-90">
            Create New Purchase Order
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-table">
            <thead>
              <tr className="bg-table-header text-left">
                {['PO Number', 'Supplier', 'SKUs', 'Qty (units)', 'Total Value', 'Order Date', 'Expected Delivery', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-3 py-2 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pos.map(p => (
                <tr key={p.po} className="border-t border-border hover:bg-muted/50">
                  <td className="px-3 py-2 font-mono text-xs">{p.po}</td>
                  <td className="px-3 py-2 font-medium whitespace-nowrap">{p.supplier}</td>
                  <td className="px-3 py-2 font-mono">{p.skus}</td>
                  <td className="px-3 py-2 font-mono">{p.qty}</td>
                  <td className="px-3 py-2 font-mono">{p.value}</td>
                  <td className="px-3 py-2">{p.orderDate}</td>
                  <td className="px-3 py-2">{p.delivery}</td>
                  <td className="px-3 py-2"><StatusBadge variant={getStatusVariant(p.status)}>{p.status}</StatusBadge></td>
                  <td className="px-3 py-2"><button className="text-primary text-xs font-medium hover:underline">{p.action}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowModal(false)} />
          <div className="relative bg-card rounded-lg shadow-xl p-6 w-full max-w-lg animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Create New Purchase Order</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium">Supplier</label>
                <select className="w-full mt-1 text-sm border border-border rounded px-3 py-2 bg-background">
                  <option>Select supplier...</option>
                  <option>Cipla API Ltd</option>
                  <option>Sun Pharma API</option>
                  <option>Aurobindo Pharma</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium">SKUs & Quantities</label>
                <textarea className="w-full mt-1 text-sm border border-border rounded px-3 py-2 bg-background h-20" placeholder="Add SKUs with quantities..." />
              </div>
              <div>
                <label className="text-xs font-medium">Expected Delivery Date</label>
                <input type="date" className="w-full mt-1 text-sm border border-border rounded px-3 py-2 bg-background" />
              </div>
              <div>
                <label className="text-xs font-medium">Notes</label>
                <textarea className="w-full mt-1 text-sm border border-border rounded px-3 py-2 bg-background h-16" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setShowModal(false); toast.success('PO saved as draft'); }} className="flex-1 border border-border py-2 rounded text-sm font-medium hover:bg-muted">Save as Draft</button>
              <button onClick={() => { setShowModal(false); toast.success('PO submitted for approval'); }} className="flex-1 bg-primary text-primary-foreground py-2 rounded text-sm font-medium hover:opacity-90">Submit for Approval</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrders;
