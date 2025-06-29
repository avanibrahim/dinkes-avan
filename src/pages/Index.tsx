import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "./Home";
import Stunting from "./diagnosis/Stunting";
import Dbd from "./diagnosis/Dbd";
import Hiv from "./diagnosis/Hiv";
import ScanQR from "./ScanQR";
import "./index.css"; // Global styles (untuk kamera, scene, dll)

const Index = () => {
  const location = useLocation();

  if (location.pathname === "/")
    return (
      <>
        <Navbar />
        <Home />
      </>
    );

  if (location.pathname === "/stunting")
    return (
      <>
        <Navbar />
        <Stunting />
      </>
    );

  if (location.pathname === "/dbd")
    return (
      <>
        <Navbar />
        <Dbd />
      </>
    );

  if (location.pathname === "/hiv")
    return (
      <>
        <Navbar />
        <Hiv />
      </>
    );

  if (location.pathname === "/scanqr")
    return (
      <>
        <Navbar />
        <ScanQR />
      </>
    );

  // fallback jika path tidak dikenal
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export default Index;
