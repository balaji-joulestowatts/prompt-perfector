export const USERS = [
  { role: 'Supply Chain Manager', email: 'scm@pharmaforecast.in', password: 'demo123', name: 'Priya Mehta' },
  { role: 'Procurement Head', email: 'procurement@pharmaforecast.in', password: 'demo123', name: 'Arjun Sharma' },
  { role: 'Finance Controller', email: 'finance@pharmaforecast.in', password: 'demo123', name: 'Neha Kapoor' },
  { role: 'Admin', email: 'admin@pharmaforecast.in', password: 'demo123', name: 'Rahul Desai' },
];

export const NAV_ITEMS = [
  { section: null, items: [
    { label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  ]},
  { section: 'DEMAND FORECASTING', items: [
    { label: 'Forecast Overview', icon: 'TrendingUp', path: '/forecast-overview' },
    { label: 'SKU-Level Forecast', icon: 'Package', path: '/sku-forecast' },
    { label: 'Scenario Planner', icon: 'GitBranch', path: '/scenario-planner' },
    { label: 'Forecast Accuracy', icon: 'Target', path: '/forecast-accuracy' },
  ]},
  { section: 'INVENTORY MANAGEMENT', items: [
    { label: 'Inventory Overview', icon: 'Warehouse', path: '/inventory-overview' },
    { label: 'Stock Health Monitor', icon: 'Activity', path: '/stock-health' },
    { label: 'Batch & Expiry Tracker', icon: 'Clock', path: '/batch-expiry' },
    { label: 'Multi-Location View', icon: 'MapPin', path: '/multi-location' },
  ]},
  { section: 'PROCUREMENT', items: [
    { label: 'Purchase Orders', icon: 'ShoppingCart', path: '/purchase-orders' },
    { label: 'Supplier Management', icon: 'Users', path: '/supplier-management' },
    { label: 'Reorder Recommendations', icon: 'RefreshCw', path: '/reorder-recommendations' },
  ]},
  { section: 'ALERTS', items: [
    { label: 'Alert Center', icon: 'Bell', path: '/alert-center', badge: 7 },
  ]},
  { section: 'REPORTS', items: [
    { label: 'Analytics & Reports', icon: 'BarChart3', path: '/analytics-reports' },
  ]},
  { section: 'SETTINGS', items: [
    { label: 'Connectors & Integrations', icon: 'Plug', path: '/settings-connectors' },
    { label: 'Forecast Model Config', icon: 'Settings', path: '/settings-forecast' },
    { label: 'User Management', icon: 'UserCog', path: '/settings-users' },
  ]},
];
