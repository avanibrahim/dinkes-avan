import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner"; // Gunakan Sonner saja
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar"; // Pastikan path sesuai lokasi Navbar

// Lazy load halaman
const Index = lazy(() => import("./pages/Index"));
const Tentang = lazy(() => import("./pages/Diagnosis"));
const Berita = lazy(() => import("./pages/ScanQR"));
const Monitoring = lazy(() => import("./pages/Monitoring"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Navbar /> {/* Navbar selalu tampil */}
        <div className="min-h-screen w-full overflow-x-hidden pt-[var(--navbar-height)]">
          {/* Jika navbar fixed, beri padding top agar konten tidak tertutup */}
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/diagnosis" element={<Tentang />} />
              <Route path="/scanqr" element={<Berita />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
