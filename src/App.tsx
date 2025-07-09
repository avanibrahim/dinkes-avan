import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


// Lazy load halaman utama
const Index = lazy(() => import("./pages/Index"));
const Tentang = lazy(() => import("./pages/Diagnosis"));
const Berita = lazy(() => import("./pages/ScanQR"));
const Monitoring = lazy(() => import("./pages/Monitoring"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ✅ Tambahkan lazy load halaman diagnosis per penyakit
const DiagnosisStunting = lazy(() => import("./pages/diagnosis/Tbc"));
const DiagnosisDBD = lazy(() => import("./pages/diagnosis/Dbd"));
const DiagnosisHIV = lazy(() => import("./pages/diagnosis/Hiv"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen w-full overflow-x-hidden pt-[var(--navbar-height)]">
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/diagnosis" element={<Tentang />} />
              <Route path="/diagnosis-stunting" element={<DiagnosisStunting />} />
              <Route path="/diagnosis-dbd" element={<DiagnosisDBD />} />
              <Route path="/diagnosis-hiv" element={<DiagnosisHIV />} />
              <Route path="/scanqr" element={<Berita />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
