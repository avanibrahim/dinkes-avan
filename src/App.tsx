// src/App.tsx
import React, { Suspense, lazy, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import clsx from "clsx";
import { Menu, X, ArrowLeft, ArrowRight } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";
import Footer from "@/components/Footer";
import Diagnosis from "./pages/Diagnosis";

const Index = lazy(() => import("./pages/Index"));
const Beranda = lazy(() => import("./pages/Beranda"));
const ScanQR = lazy(() => import("./pages/ScanQR"));
const Edukasi = lazy(() => import("./pages/Edukasi"));
const Contact = lazy(() => import("./pages/Contact"));
const Tentang = lazy(() => import("./pages/Tentang"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DiagnosisTBC = lazy(() => import("./pages/diagnosis/Tbc"));
const DiagnosisDBD = lazy(() => import("./pages/diagnosis/Dbd"));
const DiagnosisHIV = lazy(() => import("./pages/diagnosis/Hiv"));

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="flex min-h-screen">
            {/* Sidebar kiri */}
            <Sidebar
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />

            {/* Konten utama */}
            <div
              className={clsx(
                "flex-1 flex flex-col overflow-auto pt-16 md:pt-0",
                collapsed ? "md:pl-20" : "md:pl-[0rem]"
              )}
            >
              {/* Mobile top bar: fixed, always visible saat scroll */}
              <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-teal-600 z-50">
                {/* Toggle sidebar */}
                <button onClick={() => setMobileOpen(!mobileOpen)}>
                  {mobileOpen ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                    <Menu className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* Logo di tengah */}
                <div className="flex-1 flex justify-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/de/Logo_of_the_Ministry_of_Health_of_the_Republic_of_Indonesia.png"
                    alt="Logo"
                    className="w-22 h-8"
                  />
                </div>

                {/* Toggle right panel */}
                <button onClick={() => setRightOpen(!rightOpen)}>
                  {rightOpen ? (
                    <ArrowRight className="w-6 h-6 text-white" />
                  ) : (
                    <ArrowLeft className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>

              {/* Routing */}
              <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/beranda" element={<Beranda />} />
                  <Route path="/diagnosis" element={<Diagnosis />} />
                  <Route path="/scanqr" element={<ScanQR />} />
                  <Route path="/edukasi" element={<Edukasi />} />
                  <Route path="/tentang" element={<Tentang />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/diagnosis-tbc" element={<DiagnosisTBC />} />
                  <Route path="/diagnosis-dbd" element={<DiagnosisDBD />} />
                  <Route path="/diagnosis-hiv" element={<DiagnosisHIV />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>

              {/* Footer: hanya tampil di mobile */}
              <div className="md:hidden">
                <Footer />
              </div>
            </div>

            {/* Right Panel */}
            <RightPanel isOpen={rightOpen} setIsOpen={setRightOpen} />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
