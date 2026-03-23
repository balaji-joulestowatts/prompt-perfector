import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '@/data/constants';
import {
  LayoutDashboard, TrendingUp, Package, GitBranch, Target,
  Warehouse, Activity, Clock, MapPin, ShoppingCart, Users,
  RefreshCw, Bell, BarChart3, Plug, Settings, UserCog,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  LayoutDashboard, TrendingUp, Package, GitBranch, Target,
  Warehouse, Activity, Clock, MapPin, ShoppingCart, Users,
  RefreshCw, Bell, BarChart3, Plug, Settings, UserCog,
};

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 z-40 ${collapsed ? 'w-[60px]' : 'w-[240px]'}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-white/10 shrink-0">
        <img src="/J2W_Logo 1.png" alt="JoulestoWatts Logo" className="w-8 h-8 object-contain shrink-0 bg-white rounded-md p-0.5" />
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white truncate">JoulestoWatts</div>
            <div className="text-[10px] text-sidebar-foreground/60 truncate">Demand Intelligence</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {NAV_ITEMS.map((group, gi) => (
          <div key={gi} className="mb-1">
            {group.section && !collapsed && (
              <div className="px-4 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                {group.section}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors relative group
                    ${active
                      ? 'bg-sidebar-active text-sidebar-active-foreground font-medium'
                      : 'hover:bg-white/5 text-sidebar-foreground'
                    }
                    ${collapsed ? 'justify-center px-0' : ''}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {item.badge && (
                    <span className={`${collapsed ? 'absolute -top-1 -right-1' : 'ml-auto'} bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 flex items-center justify-center border-t border-white/10 hover:bg-white/5 transition-colors shrink-0"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
};
