import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DashboardAds from "./pages/DashboardAds";
import DashboardBackend from "./pages/DashboardBackend";
import BackendFunil from "./pages/BackendFunil";
import Resumo from "./pages/Resumo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to VSLs */}
          <Route path="/" element={<Navigate to="/audiovisual/vsls" replace />} />

          {/* Audiovisual section */}
          <Route path="/audiovisual/vsls" element={<Index />} />
          <Route path="/audiovisual/ads" element={<DashboardAds />} />

          {/* Backend section */}
          <Route path="/backend" element={<Navigate to="/backend/funil" replace />} />
          <Route path="/backend/funil" element={<BackendFunil />} />

          {/* Resumo section */}
          <Route path="/resumo" element={<Resumo />} />

          {/* Legacy routes redirect */}
          <Route path="/ads" element={<Navigate to="/audiovisual/ads" replace />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
