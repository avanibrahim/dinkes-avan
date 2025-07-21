// src/components/Sidebar.tsx
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Stethoscope,
  Droplet,
  Thermometer,
  Ribbon,
  MessageSquareText,
  Info,
  Settings,
  HelpCircle,
  Menu,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const mainSidebarMenu = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Beranda", icon: FileText, href: "/beranda" },
  { label: "Edukasi", icon: MessageSquareText, href: "/edukasi" },
  { label: "Tentang", icon: Info, href: "/tentang" },
  { label: "Contact", icon: User, href: "/contact" },
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const [openDiagnosa, setOpenDiagnosa] = useState(false);
  const location = useLocation();

  const diagnosaItems = [
    { key: "dbd", icon: Droplet, to: "/diagnosis-dbd", label: "DBD", color: "text-red-500" },
    { key: "hiv", icon: Ribbon, to: "/diagnosis-hiv", label: "HIV/AIDS", color: "text-pink-500" },
    { key: "tbc", icon: Thermometer, to: "/diagnosis-tbc", label: "TBC", color: "text-blue-500" },
  ];

  return (
    <>
      {/* Overlay for mobile: click outside to close */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed left-0 transform transition-transform duration-300 ease-in-out w-64",
          "bg-white border-r shadow-lg flex flex-col z-30",
          "md:top-0 md:bottom-0 top-16 bottom-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:h-auto"
        )}
      >
        {/* Header: mobile text or logo */}
        <div className="flex items-center justify-start sm:justify-center px-4 py-4 border-b sm:border-b border-gray-400 bg-gray-50 z-20 sticky top-0 md:static">
          <h1 className="flex items-center sm:hidden text-[1.2rem] font-bold text-teal-600">
            <Menu className="w-5 h-5 mr-2 text-gray-800" />
            Pilih Menu
          </h1>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/de/Logo_of_the_Ministry_of_Health_of_the_Republic_of_Indonesia.png"
            alt="Logo"
            className="hidden sm:block w-40 md:w-48"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {mainSidebarMenu.map((item) => {
            const active = location.pathname === item.href;
            return (
              <div key={item.label}>
                <Link
                  to={item.href}
                  className={clsx(
                    "flex items-center gap-3 p-2 rounded-lg text-base font-medium",
                    active
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => mobileOpen && setMobileOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>

                {item.label === "Beranda" && (
                  <>
                    <button
                      onClick={() => setOpenDiagnosa(!openDiagnosa)}
                      className="flex items-center gap-3 p-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <Stethoscope className="w-5 h-5" />
                      <span>Diagnosa</span>
                      <svg
                        className={clsx("w-4 h-4 ml-auto transition-transform", {
                          "rotate-90": openDiagnosa,
                        })}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {openDiagnosa && (
                      <div className="pl-8 mt-1 space-y-1">
                        {diagnosaItems.map(({ key, icon: Icon, to, label, color }) => (
                          <Link
                            key={key}
                            to={to}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                            onClick={() => mobileOpen && setMobileOpen(false)}
                          >
                            <Icon className={clsx("w-5 h-5", color)} />
                            <span>{label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom help: pinned at very bottom */}
        <div className="px-2 py-4 border-t">
          <button className="flex items-center gap-3 p-2 rounded-lg text-base font-medium hover:text-teal-600 text-gray-700 w-full">
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>
        </div>
      </aside>
    </>
  );
}
