// src/App.tsx
import React, { Suspense, lazy, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import LoadingFallback from "@/components/LoadingFallback";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";


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
          <ScrollToTop />
          <div className="flex min-h-screen">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <div
              className={clsx(
                "flex-1 flex flex-col overflow-auto pt-16 md:pt-0",
                collapsed ? "md:pl-20" : "md:pl-[0rem]"
              )}
            >
              <div
                className="
                  md:hidden fixed top-0 left-0 right-0
                  flex items-center justify-between
                  px-3 py-2 sm:px-4 sm:py-3
                  bg-teal-600 z-50
                "
              >
                <button onClick={() => setMobileOpen(!mobileOpen)}>
                  {mobileOpen ? (
                    <X className="w-9 h-9 text-white" />
                  ) : (
                    <Menu className="w-9 h-9 text-white" />
                  )}
                </button>

                <div className="flex-1 flex justify-center">
                  <button
                    onClick={() => window.location.href = "/"}
                    className="focus:outline-none"
                    aria-label="Ke Beranda"
                    type="button"
                  >
                    <img
                      src="img/mobilel.png"
                      alt="Logo"
                      className="w-24 sm:w-28 h-auto"
                    />
                  </button>
                </div>


                <button onClick={() => setRightOpen(!rightOpen)}>
                  {rightOpen ? (
                    <ChevronRight className="w-8 h-8 text-white" />
                  ) : (
                    <ChevronLeft className="w-8 h-8 text-white" />
                  )}
                </button>
              </div>

              <Suspense fallback={<LoadingFallback />}>
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

              <div className="md:hidden">
                <Footer />
              </div>
            </div>

            <RightPanel isOpen={rightOpen} setIsOpen={setRightOpen} />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
