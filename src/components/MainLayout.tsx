import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import RightPanel from "@/components/RightPanel";
import { ReactNode } from "react";

// components/MainLayout.tsx
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* hanya render sekali! */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <main className="flex flex-1 p-4 gap-4">
          <div className="flex-1">{children}</div> {/* konten utama */}
          <RightPanel />
        </main>
      </div>
    </div>
  );
}

