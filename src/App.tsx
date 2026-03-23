import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForecastOverview from "./pages/ForecastOverview";
import SKUForecast from "./pages/SKUForecast";
import ScenarioPlanner from "./pages/ScenarioPlanner";
import ForecastAccuracy from "./pages/ForecastAccuracy";
import InventoryOverview from "./pages/InventoryOverview";
import StockHealth from "./pages/StockHealth";
import BatchExpiry from "./pages/BatchExpiry";
import MultiLocation from "./pages/MultiLocation";
import PurchaseOrders from "./pages/PurchaseOrders";
import SupplierManagement from "./pages/SupplierManagement";
import ReorderRecommendations from "./pages/ReorderRecommendations";
import AlertCenter from "./pages/AlertCenter";
import AnalyticsReports from "./pages/AnalyticsReports";
import SettingsConnectors from "./pages/SettingsConnectors";
import SettingsForecast from "./pages/SettingsForecast";
import SettingsUsers from "./pages/SettingsUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <AppLayout>{children}</AppLayout>;
};

const LoginRoute = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Login />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginRoute />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/forecast-overview" element={<ProtectedRoute><ForecastOverview /></ProtectedRoute>} />
            <Route path="/sku-forecast" element={<ProtectedRoute><SKUForecast /></ProtectedRoute>} />
            <Route path="/scenario-planner" element={<ProtectedRoute><ScenarioPlanner /></ProtectedRoute>} />
            <Route path="/forecast-accuracy" element={<ProtectedRoute><ForecastAccuracy /></ProtectedRoute>} />
            <Route path="/inventory-overview" element={<ProtectedRoute><InventoryOverview /></ProtectedRoute>} />
            <Route path="/stock-health" element={<ProtectedRoute><StockHealth /></ProtectedRoute>} />
            <Route path="/batch-expiry" element={<ProtectedRoute><BatchExpiry /></ProtectedRoute>} />
            <Route path="/multi-location" element={<ProtectedRoute><MultiLocation /></ProtectedRoute>} />
            <Route path="/purchase-orders" element={<ProtectedRoute><PurchaseOrders /></ProtectedRoute>} />
            <Route path="/supplier-management" element={<ProtectedRoute><SupplierManagement /></ProtectedRoute>} />
            <Route path="/reorder-recommendations" element={<ProtectedRoute><ReorderRecommendations /></ProtectedRoute>} />
            <Route path="/alert-center" element={<ProtectedRoute><AlertCenter /></ProtectedRoute>} />
            <Route path="/analytics-reports" element={<ProtectedRoute><AnalyticsReports /></ProtectedRoute>} />
            <Route path="/settings-connectors" element={<ProtectedRoute><SettingsConnectors /></ProtectedRoute>} />
            <Route path="/settings-forecast" element={<ProtectedRoute><SettingsForecast /></ProtectedRoute>} />
            <Route path="/settings-users" element={<ProtectedRoute><SettingsUsers /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
