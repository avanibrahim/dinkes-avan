// components/Layout.tsx
import Sidebar from "./Sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-4 ml-64">
        {children}
      </main>
    </div>
  );
};

export default Layout;
