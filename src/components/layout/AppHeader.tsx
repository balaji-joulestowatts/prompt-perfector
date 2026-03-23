import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, LogOut } from 'lucide-react';

const pathLabels: Record<string, string> = {
  '/dashboard': 'Executive Dashboard',
  '/forecast-overview': 'Forecast Overview',
  '/sku-forecast': 'SKU-Level Forecast',
  '/scenario-planner': 'Scenario Planner',
  '/forecast-accuracy': 'Forecast Accuracy',
  '/inventory-overview': 'Inventory Overview',
  '/stock-health': 'Stock Health Monitor',
  '/batch-expiry': 'Batch & Expiry Tracker',
  '/multi-location': 'Multi-Location View',
  '/purchase-orders': 'Purchase Orders',
  '/supplier-management': 'Supplier Management',
  '/reorder-recommendations': 'Reorder Recommendations',
  '/alert-center': 'Alert Center',
  '/analytics-reports': 'Analytics & Reports',
  '/settings-connectors': 'Connectors & Integrations',
  '/settings-forecast': 'Forecast Model Config',
  '/settings-users': 'User Management',
};

const sectionForPath: Record<string, string> = {
  '/forecast-overview': 'Demand Forecasting',
  '/sku-forecast': 'Demand Forecasting',
  '/scenario-planner': 'Demand Forecasting',
  '/forecast-accuracy': 'Demand Forecasting',
  '/inventory-overview': 'Inventory Management',
  '/stock-health': 'Inventory Management',
  '/batch-expiry': 'Inventory Management',
  '/multi-location': 'Inventory Management',
  '/purchase-orders': 'Procurement',
  '/supplier-management': 'Procurement',
  '/reorder-recommendations': 'Procurement',
  '/alert-center': 'Alerts',
  '/analytics-reports': 'Reports',
  '/settings-connectors': 'Settings',
  '/settings-forecast': 'Settings',
  '/settings-users': 'Settings',
};

export const AppHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const section = sectionForPath[location.pathname];
  const page = pathLabels[location.pathname] || 'Dashboard';

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Home</span>
        {section && (
          <>
            <ChevronRight size={14} />
            <span>{section}</span>
          </>
        )}
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{page}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-medium">{user?.name}</div>
          <div className="text-[11px] text-muted-foreground">{user?.role}</div>
        </div>
        <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">{user?.role}</span>
        <button onClick={() => { logout(); navigate('/'); }} className="p-1.5 hover:bg-muted rounded transition-colors">
          <LogOut size={16} className="text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};
