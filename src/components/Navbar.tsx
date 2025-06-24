import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { label: "Beranda", href: "/" },
  { label: "Diagnosis", href: "/diagnosis" },
  { label: "Scan QR", href: "/scanqr" },
  { label: "Monitoring", href: "/monitoring" },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cek posisi scroll saat mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "w-full fixed top-0 left-0 z-20 transition-colors duration-300",
        scrolled ? "bg-white shadow" : "bg-transparent shadow-none"
      )}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Logo */}
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Logo_of_the_Ministry_of_Health_of_the_Republic_of_Indonesia.png"
                alt="Logo Dinkes"
                className="object-contain max-h-12 w-auto scale-125 origin-left transition-transform duration-300"
                draggable={false}
              />
          </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-3 md:space-x-6 font-medium text-sm md:text-base">
          {menu.map((item) => (
            <li key={item.label}>
              {item.href.startsWith("/") ? (
                <Link
                  to={item.href}
                  className={cn(
                    "text-gray-800 px-2 py-1 rounded transition-all hover:bg-tealCustomLight hover:text-tealCustom",
                    (item.href === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(item.href))
                      ? "font-bold text-tealCustom"
                      : ""
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="text-gray-800 px-2 py-1 rounded transition-all hover:bg-tealCustomLight hover:text-tealCustom"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile: Dropdown hamburger */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-md border border-gray-200 bg-white hover:bg-tealCustomLight transition-all flex items-center"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6 text-tealCustom" />
                <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="mt-2 w-48 rounded-md shadow-lg bg-white z-50"
            >
              {menu.map((item, idx) => (
                <React.Fragment key={item.label}>
                  <DropdownMenuItem asChild>
                    {item.href.startsWith("/") ? (
                      <Link
                        to={item.href}
                        className={cn(
                          "block px-2 py-2 rounded text-gray-800 hover:bg-tealCustomLighter hover:text-tealCustom w-full text-left",
                          (item.href === "/"
                            ? location.pathname === "/"
                            : location.pathname.startsWith(item.href))
                            ? "font-bold text-tealCustom"
                            : ""
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="block px-2 py-2 rounded text-gray-800 hover:bg-tealCustomLighter hover:text-tealCustom w-full text-left"
                      >
                        {item.label}
                      </a>
                    )}
                  </DropdownMenuItem>
                  {idx === 0 ? <DropdownMenuSeparator /> : null}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
